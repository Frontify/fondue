/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Mark, type Node as PmNode } from 'prosemirror-model';
import { EditorState, TextSelection, type Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type RteDocumentOf } from '#/core';
import { type MountedDocument, type MountDocument, type MountOptions } from '#/editor/port';

import {
    clipboardParser,
    clipboardSerializer,
    handlePasteByFeatures,
    handlePasteIntoEmptyBlock,
    pastedWithoutExtras,
} from './clipboard';
import { createControlApi, type OpenEditors } from './controlApi';
import { rootExtrasOf, toEngineDocument, toRteDocument, withoutDrafts } from './documentConversion';
import { copiedExtrasPlugin } from './extraAttributes';
import { keystrokePipeline } from './keystrokes';
import { createMarkViews, createNodeViews, LiveViews } from './nodeViews';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createSelectionRectReader } from './selectionRect';
import './engine.scss';

/** Schedules the next try of a host document held while text is composed. */
export type FrameScheduler = {
    request: (callback: () => void) => number;
    cancel: (frame: number) => void;
};

const browserFrames: FrameScheduler = {
    request: (callback) => requestAnimationFrame(callback),
    cancel: (frame) => {
        cancelAnimationFrame(frame);
    },
};

/**
 * The live editor: `mountDocument` assembles everything in this folder over
 * one ProseMirror view. Readonly display does not come through here; that is
 * `RichTextRenderer`.
 */
export const mountDocument: MountDocument = (options) => mount(options, browserFrames).mounted;

/**
 * Test-only: `mountDocument`'s editor plus its view, so specs can place the
 * selection and type the way the engine's input handling does. The view never
 * leaves this folder otherwise.
 */
export const mountEditorForTests = (
    options: MountOptions,
    frames: FrameScheduler = browserFrames,
): { mounted: MountedDocument; view: EditorView } => mount(options, frames);

/** Transaction meta marking a change that came from the host, not the user. */
const HOST_DOC = 'rte-host-doc';

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

/** How far `offset` sits from the end of the character it splits in `textblock` (an emoji sequence, a letter and its accent), 0 when it splits none. */
const graphemeRemainder = (textblock: PmNode, offset: number): number => {
    // One stand-in character per inline atom keeps text offsets equal to positions.
    const text = textblock.textBetween(0, textblock.content.size, undefined, '￼');
    const containing = graphemes.segment(text).containing(offset);
    if (containing === undefined || containing.index === offset) {
        return 0;
    }
    return containing.index + containing.segment.length - offset;
};

/** Past this many inserted and removed children, a changed stretch is replaced whole rather than matched up: matching costs the square of it. */
const MATCH_LIMIT = 100;

/** Past this many children, a changed stretch is replaced whole but for the child holding the caret: each child synced is a step over the whole document. */
const PAIR_LIMIT = 100;

/** `items[index]`, which the caller has already bounded: a miss is a bug in the diff, not a case to handle. */
const at = <T>(items: readonly T[], index: number): T => {
    const item = items[index];
    if (item === undefined) {
        throw new Error(`No item at index ${index} of ${items.length}.`);
    }
    return item;
};

/** The furthest index into `before` reached on `diagonal`, in a frontier row centred on its middle. */
const reach = (row: readonly number[], diagonal: number): number => at(row, (row.length - 1) / 2 + diagonal);

/** Whether the edit path reaching `diagonal` with `count` changes comes from `diagonal + 1` rather than `diagonal - 1`. */
const fromHigherDiagonal = (row: readonly number[], count: number, diagonal: number): boolean =>
    diagonal === -count || (diagonal !== count && reach(row, diagonal - 1) < reach(row, diagonal + 1));

/**
 * Myers' forward pass over `lengthA` and `lengthB` children: the frontier before each number of changes, the last
 * one reaching both ends, or none when that takes more than `MATCH_LIMIT` changes.
 */
const frontierRows = (lengthA: number, lengthB: number, same: (x: number, y: number) => boolean): number[][] => {
    const limit = Math.min(lengthA + lengthB, MATCH_LIMIT);
    const centre = limit + 1;
    const frontier = Array.from({ length: 2 * centre + 1 }, () => 0);
    const rows: number[][] = [];
    for (let count = 0; count <= limit; count++) {
        rows.push([...frontier]);
        for (let diagonal = -count; diagonal <= count; diagonal += 2) {
            let x = reach(frontier, diagonal - 1) + 1;
            if (fromHigherDiagonal(frontier, count, diagonal)) {
                x = reach(frontier, diagonal + 1);
            }
            let y = x - diagonal;
            while (x < lengthA && y < lengthB && same(x, y)) {
                x += 1;
                y += 1;
            }
            frontier[centre + diagonal] = x;
            if (x >= lengthA && y >= lengthB) {
                return rows;
            }
        }
    }
    return [];
};

/** Myers' backward pass: the equal pairs on the edit path the rows describe, from the ends back to the start. */
const pathPairs = (rows: readonly number[][], lengthA: number, lengthB: number): [number, number][] => {
    const matched: [number, number][] = [];
    let x = lengthA;
    let y = lengthB;
    for (let count = rows.length - 1; count > 0; count--) {
        const row = at(rows, count);
        const diagonal = x - y;
        let previous = diagonal - 1;
        if (fromHigherDiagonal(row, count, diagonal)) {
            previous = diagonal + 1;
        }
        const previousX = reach(row, previous);
        const previousY = previousX - previous;
        while (x > previousX && y > previousY) {
            matched.push([x - 1, y - 1]);
            x -= 1;
            y -= 1;
        }
        x = previousX;
        y = previousY;
    }
    while (x > 0 && y > 0) {
        matched.push([x - 1, y - 1]);
        x -= 1;
        y -= 1;
    }
    return matched;
};

/**
 * The equal children of two stretches, as index pairs in order, by Myers' diff: its cost grows with the number of
 * changes rather than the length, so a few changes in a long document stay cheap.
 */
const matchStretch = (
    lengthA: number,
    lengthB: number,
    same: (x: number, y: number) => boolean,
): [number, number][] => {
    if (lengthA === 0 || lengthB === 0) {
        return [];
    }
    const rows = frontierRows(lengthA, lengthB, same);
    if (rows.length === 0) {
        return [];
    }
    const matched = pathPairs(rows, lengthA, lengthB);
    matched.reverse();
    return matched;
};

/** Index pairs of equal children, in order. A draft (an inline still being made) does not make a child differ. */
const equalChildren = (before: readonly PmNode[], after: readonly PmNode[]): [number, number][] => {
    const comparable = before.map(withoutDrafts);
    const same = (i: number, j: number): boolean => at(comparable, i).eq(at(after, j));
    // The shared start and end are matched directly (cheap, as reused nodes compare by identity), so only the
    // changed stretch between them goes through the diff.
    let head = 0;
    while (head < before.length && head < after.length && same(head, head)) {
        head += 1;
    }
    let tail = 0;
    while (
        tail < before.length - head &&
        tail < after.length - head &&
        same(before.length - 1 - tail, after.length - 1 - tail)
    ) {
        tail += 1;
    }
    const pairs: [number, number][] = [];
    for (let index = 0; index < head; index++) {
        pairs.push([index, index]);
    }
    const stretch = matchStretch(before.length - tail - head, after.length - tail - head, (x, y) =>
        same(head + x, head + y),
    );
    for (const [x, y] of stretch) {
        pairs.push([head + x, head + y]);
    }
    for (let offset = tail; offset > 0; offset--) {
        pairs.push([before.length - offset, after.length - offset]);
    }
    return pairs;
};

/** Whether two nodes are of one type with the same marks, so only their attributes and content can differ. */
const sameKind = (a: PmNode, b: PmNode): boolean => a.type === b.type && Mark.sameSet(a.marks, b.marks);

/** Whether both are the same inline element with the same marks, so only its value changed. */
const sameInlineElement = (node: PmNode | null, replacement: PmNode | null): replacement is PmNode =>
    node !== null && replacement !== null && !node.isText && sameKind(node, replacement);

/** Whether `current` can become `target` in place: the same kind, or a retype whose type still holds its content. */
const canRestyle = (current: PmNode, target: PmNode): boolean => {
    if (sameKind(current, target)) {
        return true;
    }
    return !current.isText && !target.isText && target.type.validContent(current.content);
};

/**
 * Which children of a changed stretch are synced one by one, as offsets into it: all of them, or past `PAIR_LIMIT`
 * only the one holding `head`. `starts` holds each child's start, then the stretch's end.
 */
const syncedRange = (starts: readonly number[], head: number): { from: number; to: number } => {
    const count = starts.length - 1;
    if (count <= PAIR_LIMIT) {
        return { from: 0, to: count };
    }
    for (let index = 0; index < count; index++) {
        if (at(starts, index) < head && head < at(starts, index + 1)) {
            return { from: index, to: index + 1 };
        }
    }
    return { from: count, to: count };
};

/**
 * Turns the content of `transaction`'s document into `next`'s, touching only the children that differ, so the caret
 * and the user's undo history map through and stay put.
 */
const syncDocument = (transaction: Transaction, next: PmNode): void => {
    /** Text block content: one replace over what differs, so a caret outside it, or before it in the block, stays put. */
    const syncInline = (from: number, current: PmNode, target: PmNode): void => {
        const start = current.content.findDiffStart(target.content, from);
        const end = current.content.findDiffEnd(
            target.content,
            from + current.content.size,
            from + target.content.size,
        );
        if (start === null || end === null) {
            return;
        }
        let { a: endA, b: endB } = end;
        const replacement = target.nodeAt(start - from);
        if (endA - start === 1 && endB - start === 1 && sameInlineElement(transaction.doc.nodeAt(start), replacement)) {
            // An inline element whose value alone changed keeps its view and any selection on it.
            for (const [name, value] of Object.entries(replacement.attrs)) {
                transaction.setNodeAttribute(start, name, value);
            }
            return;
        }
        // The ends can cross when the change is a repeat of its neighbours.
        const overlap = start - Math.min(endA, endB);
        if (overlap > 0) {
            endA += overlap;
            endB += overlap;
        }
        // A caret inside the change maps to its end, so the end must not split a character the user sees.
        const remainder = graphemeRemainder(target, endB - from);
        endA += remainder;
        endB += remainder;
        transaction.replace(start, endA, target.slice(start - from, endB - from));
    };

    /** One child into another: restyled in place when its content still fits, so a caret inside stays, then its content synced. */
    const syncChild = (pos: number, current: PmNode, target: PmNode): void => {
        // A draft (an inline still being made) is in no document the host holds, so it alone is no change.
        if (current.eq(target) || withoutDrafts(current).eq(target)) {
            return;
        }
        if (!canRestyle(current, target)) {
            transaction.replaceWith(pos, pos + current.nodeSize, target);
            return;
        }
        if (sameKind(current, target)) {
            // One step per attribute, so a user's undo of another attribute leaves the host's alone.
            for (const [name, value] of Object.entries(target.attrs)) {
                if (current.attrs[name] !== value) {
                    transaction.setNodeAttribute(pos, name, value);
                }
            }
        } else {
            transaction.setNodeMarkup(pos, target.type, target.attrs, target.marks);
        }
        if (!current.content.eq(target.content)) {
            syncContent(pos + 1, current, target);
        }
    };

    /** The content of `current`, starting at `from`, into that of `target`. */
    const syncContent = (from: number, current: PmNode, target: PmNode): void => {
        if (current.inlineContent) {
            syncInline(from, current, target);
            return;
        }
        const before = current.children;
        const after = target.children;
        const starts = [from];
        for (const child of before) {
            starts.push(at(starts, starts.length - 1) + child.nodeSize);
        }
        // Unchanged children anchor the change, so a block between two changes is left alone; last to first keeps
        // earlier positions valid.
        const bounds = equalChildren(before, after);
        bounds.reverse();
        bounds.push([-1, -1]);
        let endA = before.length;
        let endB = after.length;
        for (const [anchorA, anchorB] of bounds) {
            const startA = anchorA + 1;
            const startB = anchorB + 1;
            if (endA - startA === endB - startB) {
                const synced = syncedRange(starts.slice(startA, endA + 1), transaction.selection.head);
                transaction.replaceWith(
                    at(starts, startA + synced.to),
                    at(starts, endA),
                    after.slice(startB + synced.to, endB),
                );
                for (let offset = synced.to - 1; offset >= synced.from; offset--) {
                    syncChild(at(starts, startA + offset), at(before, startA + offset), at(after, startB + offset));
                }
                transaction.replaceWith(
                    at(starts, startA),
                    at(starts, startA + synced.from),
                    after.slice(startB, startB + synced.from),
                );
            } else {
                transaction.replaceWith(at(starts, startA), at(starts, endA), after.slice(startB, endB));
            }
            endA = anchorA;
            endB = anchorB;
        }
    };

    syncContent(0, transaction.doc, next);
};

/** What the editor reported to the host and what the host last handed over, to tell echoes from resets. */
type HostRecord = {
    /** The last document the host handed over that the editor still holds unedited. */
    agreed: RteDocumentOf | null;
    /** The order each reported document was reported in. */
    reported: WeakMap<RteDocumentOf, number>;
    reportCount: number;
    /** Reports at or below this are older than what the host holds; one above it handed back is an echo. */
    hostSeq: number;
};

/** What `setDoc` does with a document the host hands over. */
type HostDocAction = { kind: 'ignore' } | { kind: 'echo'; seq: number } | { kind: 'wait' } | { kind: 'apply' };

const hostDocAction = (record: Readonly<HostRecord>, doc: RteDocumentOf, composing: boolean): HostDocAction => {
    if (doc === record.agreed) {
        return { kind: 'ignore' };
    }
    const seq = record.reported.get(doc);
    if (seq !== undefined && seq > record.hostSeq) {
        return { kind: 'echo', seq };
    }
    // Replacing text mid-composition breaks the word being composed, so the change waits for it to end, as in Slate.
    if (composing) {
        return { kind: 'wait' };
    }
    return { kind: 'apply' };
};

/** A host document held while text is composed, with the frame that tries it again. */
type Held = { kind: 'none' } | { kind: 'waiting'; doc: RteDocumentOf; frame: number };

/**
 * Set on the editable element, so engine.scss can scope the engine's own
 * classes to THIS editor's content and leave other editors on the page alone.
 */
const EDITABLE_ATTRIBUTE = 'data-rte-editable';

/** The editable element's attributes: the host's, then the marker. */
const editableAttributes = (attributes: Readonly<Record<string, string>>): Record<string, string> => ({
    ...attributes,
    [EDITABLE_ATTRIBUTE]: '',
});

/**
 * Assembly order matters because of one cycle: the view's constructor paints
 * the initial node views, which need the control api, which needs the view.
 * So: live views and open-editor state, then api (view behind a getter), then
 * the view, then the handle the host talks to.
 */
const mount = (
    {
        container,
        registry,
        initialDoc,
        placeholder,
        attributes,
        placeholderClassName,
        onDocChange,
        onStateChange,
        viewPortals,
    }: MountOptions,
    frames: FrameScheduler,
): { mounted: MountedDocument; view: EditorView } => {
    const schema = buildSchema(registry);
    let currentPlaceholder = placeholder;
    const record: HostRecord = { agreed: initialDoc, reported: new WeakMap(), reportCount: 0, hostSeq: 0 };
    // The document's own undeclared keys: only the host changes them, so they live here, not in the engine document.
    let rootExtras = rootExtrasOf(initialDoc);

    // 1. Views with editing UI (blocks, inline elements, link-like marks) follow
    //    the selection, since `isFocused` does. Each state change is offered to
    //    all of them, and each re-renders only when its props changed.
    const liveViews = new LiveViews(viewPortals);
    const repaintViews = (): void => {
        // The caret left the node whose editing UI was open: it closes and stays
        // closed when the caret returns, so a second pass redraws it closed.
        if (!liveViews.repaint(openEditors.type) && openEditors.type !== null) {
            openEditors.type = null;
            liveViews.repaint(null);
        }
    };
    const openEditors: OpenEditors = { type: null, repaint: repaintViews };

    // 2. The api exists before the view and reaches it through a getter that is
    //    only called once there is one.
    let view: EditorView | null = null;
    const getView = (): EditorView => {
        if (view === null) {
            throw new Error('The editor is not mounted yet.');
        }
        return view;
    };
    const api = createControlApi(getView, schema, registry, openEditors);

    // 3. The view: node/mark views, clipboard, the initial state, and the
    //    transaction loop that feeds the host.
    const editorView: EditorView = new EditorView(container, {
        attributes: editableAttributes(attributes),
        nodeViews: createNodeViews(registry, api, liveViews, openEditors),
        markViews: createMarkViews(registry, api, liveViews, openEditors),
        clipboardSerializer: clipboardSerializer(schema),
        clipboardParser: clipboardParser(schema),
        transformPasted: pastedWithoutExtras,
        handlePaste: (pasteView, event, slice) =>
            handlePasteByFeatures(registry.pasteHandlers, api)(pasteView, event) ||
            handlePasteIntoEmptyBlock(pasteView, event, slice),
        state: EditorState.create({
            doc: toEngineDocument(initialDoc, schema),
            plugins: [
                ...keystrokePipeline(registry, schema, api),
                copiedExtrasPlugin(),
                placeholderPlugin(() => currentPlaceholder, placeholderClassName),
            ],
        }),
        // Clicking an inline atom (mention, ...) puts the caret after it rather than selecting it.
        handleClickOn(_view, _pos, node, nodePos) {
            if (node.isInline && node.isAtom) {
                editorView.dispatch(
                    editorView.state.tr.setSelection(
                        TextSelection.create(editorView.state.doc, nodePos + node.nodeSize),
                    ),
                );
                return true;
            }
            return false;
        },
        dispatchTransaction(transaction) {
            editorView.updateState(editorView.state.apply(transaction));
            repaintViews();
            // Host-originated changes are not reported back to the host.
            if (transaction.docChanged && transaction.getMeta(HOST_DOC) !== true) {
                const emitted = toRteDocument(editorView.state.doc, rootExtras);
                record.reportCount += 1;
                record.reported.set(emitted, record.reportCount);
                record.agreed = null;
                onDocChange(emitted);
            }
            onStateChange();
        },
    });
    view = editorView;

    // 4. What the host gets back.
    let held: Held = { kind: 'none' };

    const applyDoc = (doc: RteDocumentOf): void => {
        // The host now holds a document of its own, newer than everything reported so far.
        record.hostSeq = record.reportCount;
        rootExtras = rootExtrasOf(doc);
        const next = toEngineDocument(doc, schema);
        // Drafts (an inline still being made) are in no document the host holds,
        // though a block reused from one handed out may bring one along; an
        // echo of what is there must leave them, and the caret, alone.
        if (!withoutDrafts(next).eq(withoutDrafts(editorView.state.doc))) {
            const transaction = editorView.state.tr;
            syncDocument(transaction, next);
            if (transaction.docChanged) {
                transaction.setMeta(HOST_DOC, true);
                transaction.setMeta('addToHistory', false);
                editorView.dispatch(transaction);
            }
        }
        record.agreed = doc;
    };

    const retryHeld = (): void => {
        if (held.kind === 'none') {
            return;
        }
        if (editorView.composing) {
            held = { ...held, frame: frames.request(retryHeld) };
            return;
        }
        const { doc } = held;
        held = { kind: 'none' };
        applyDoc(doc);
    };

    const hold = (doc: RteDocumentOf): void => {
        if (held.kind === 'waiting') {
            held = { ...held, doc };
            return;
        }
        held = { kind: 'waiting', doc, frame: frames.request(retryHeld) };
    };

    // The newest document the host hands over wins, so one still held is dropped whatever this one is.
    const release = (): void => {
        if (held.kind === 'waiting') {
            frames.cancel(held.frame);
            held = { kind: 'none' };
        }
    };

    const setDoc = (doc: RteDocumentOf): void => {
        const action = hostDocAction(record, doc, editorView.composing);
        switch (action.kind) {
            case 'ignore':
                release();
                return;
            case 'echo':
                release();
                record.hostSeq = action.seq;
                return;
            case 'wait':
                // Held or not, the host now holds a document of its own, so what it hands back after this is a reset.
                record.hostSeq = record.reportCount;
                hold(doc);
                return;
            case 'apply':
                release();
                applyDoc(doc);
                return;
        }
    };

    const mounted: MountedDocument = {
        handle: {
            api,
            selectionRect: createSelectionRectReader(editorView),
            document: () => toRteDocument(editorView.state.doc, rootExtras),
        },
        setDoc,
        setPlaceholder(next) {
            currentPlaceholder = next;
            // An empty props update makes the placeholder decoration be read again.
            editorView.setProps({});
        },
        setAttributes(next) {
            editorView.setProps({ attributes: editableAttributes(next) });
        },
        destroy() {
            release();
            editorView.destroy();
        },
    };
    return { mounted, view: editorView };
};
