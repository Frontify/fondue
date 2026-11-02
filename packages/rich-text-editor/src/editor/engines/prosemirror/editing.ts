/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Mark, type Node as PmNode } from 'prosemirror-model';
import { EditorState, TextSelection, type Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type MountedDocument, type MountDocument, type MountOptions } from '#/editor/port';

import { clipboardParser, clipboardSerializer, handlePasteByFeatures, handlePasteIntoEmptyBlock } from './clipboard';
import { createControlApi, type OpenEditors } from './controlApi';
import { toEngineDocument, toRteDocument, withoutDrafts } from './documentConversion';
import { keystrokePipeline } from './keystrokes';
import { createMarkViews, createNodeViews, LiveViews } from './nodeViews';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createSelectionRectReader } from './selectionRect';
import './engine.scss';

/**
 * The live editor: `mountDocument` assembles everything in this folder over
 * one ProseMirror view. Readonly display does not come through here; that is
 * `RichTextRenderer`.
 */
export const mountDocument: MountDocument = (options) => mount(options).mounted;

/**
 * Test-only: `mountDocument`'s editor plus its view, so specs can place the
 * selection and type the way the engine's input handling does. The view never
 * leaves this folder otherwise.
 */
export const mountEditorForTests = (options: MountOptions): { mounted: MountedDocument; view: EditorView } =>
    mount(options);

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

const childrenOf = (node: PmNode): PmNode[] => {
    const children: PmNode[] = [];
    for (let index = 0; index < node.childCount; index++) {
        children.push(node.child(index));
    }
    return children;
};

/** Past this many comparisons, a changed stretch of children is replaced whole rather than matched up. */
const MATCH_LIMIT = 250_000;

/** Index pairs of equal children, in order: a longest common subsequence. */
const equalChildren = (before: readonly PmNode[], after: readonly PmNode[]): [number, number][] => {
    const same = (i: number, j: number): boolean => {
        const a = before[i];
        const b = after[j];
        return a !== undefined && b !== undefined && a.eq(b);
    };
    // The shared start and end are matched directly (cheap, as reused nodes compare by identity), so only the
    // changed stretch between them pays for, and counts against, the full comparison.
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
    const endA = before.length - tail;
    const endB = after.length - tail;
    if ((endA - head) * (endB - head) <= MATCH_LIMIT) {
        const width = endB - head + 1;
        const lengths = Array.from({ length: (endA - head + 1) * width }, () => 0);
        const lengthAt = (i: number, j: number): number => lengths[(i - head) * width + (j - head)] ?? 0;
        for (let i = endA - 1; i >= head; i--) {
            for (let j = endB - 1; j >= head; j--) {
                if (same(i, j)) {
                    lengths[(i - head) * width + (j - head)] = lengthAt(i + 1, j + 1) + 1;
                } else {
                    lengths[(i - head) * width + (j - head)] = Math.max(lengthAt(i + 1, j), lengthAt(i, j + 1));
                }
            }
        }
        let i = head;
        let j = head;
        while (i < endA && j < endB) {
            if (same(i, j)) {
                pairs.push([i, j]);
                i += 1;
                j += 1;
            } else if (lengthAt(i + 1, j) >= lengthAt(i, j + 1)) {
                i += 1;
            } else {
                j += 1;
            }
        }
    }
    for (let offset = tail; offset > 0; offset--) {
        pairs.push([before.length - offset, after.length - offset]);
    }
    return pairs;
};

/** Text block content: one replace over what differs, so a caret outside it, or before it in the block, stays put. */
const syncInline = (transaction: Transaction, from: number, current: PmNode, target: PmNode): void => {
    const start = current.content.findDiffStart(target.content, from);
    const end = current.content.findDiffEnd(target.content, from + current.content.size, from + target.content.size);
    if (start === null || end === null) {
        return;
    }
    let { a: endA, b: endB } = end;
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
const syncChild = (transaction: Transaction, pos: number, current: PmNode, target: PmNode): void => {
    if (current.eq(target)) {
        return;
    }
    if (current.type !== target.type || !Mark.sameSet(current.marks, target.marks)) {
        if (current.isText || target.isText || !target.type.validContent(current.content)) {
            transaction.replaceWith(pos, pos + current.nodeSize, target);
            return;
        }
        transaction.setNodeMarkup(pos, target.type, target.attrs, target.marks);
    } else {
        // One step per attribute, so a user's undo of another attribute leaves the host's alone.
        for (const [name, value] of Object.entries(target.attrs)) {
            if (current.attrs[name] !== value) {
                transaction.setNodeAttribute(pos, name, value);
            }
        }
    }
    if (!current.content.eq(target.content)) {
        syncContent(transaction, pos + 1, current, target);
    }
};

/** The content of `current`, starting at `from`, into that of `target`, touching only the children that differ. */
const syncContent = (transaction: Transaction, from: number, current: PmNode, target: PmNode): void => {
    if (current.inlineContent) {
        syncInline(transaction, from, current, target);
        return;
    }
    const before = childrenOf(current);
    const after = childrenOf(target);
    const starts = [from];
    for (const child of before) {
        starts.push((starts[starts.length - 1] ?? from) + child.nodeSize);
    }
    const startOf = (index: number): number => starts[index] ?? from;
    // Unchanged children anchor the change, so a block between two changes is left alone; last to first keeps
    // earlier positions valid.
    const bounds: [number, number][] = [...equalChildren(before, after).reverse(), [-1, -1]];
    let endA = before.length;
    let endB = after.length;
    for (const [anchorA, anchorB] of bounds) {
        const startA = anchorA + 1;
        const startB = anchorB + 1;
        if (endA - startA === endB - startB) {
            for (let offset = endA - startA - 1; offset >= 0; offset--) {
                const child = before[startA + offset];
                const replacement = after[startB + offset];
                if (child !== undefined && replacement !== undefined) {
                    syncChild(transaction, startOf(startA + offset), child, replacement);
                }
            }
        } else {
            transaction.replaceWith(startOf(startA), startOf(endA), after.slice(startB, endB));
        }
        endA = anchorA;
        endB = anchorB;
    }
};

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
const mount = ({
    container,
    registry,
    initialDoc,
    placeholder,
    attributes,
    placeholderClassName,
    onDocChange,
    onStateChange,
    viewPortals,
}: MountOptions): { mounted: MountedDocument; view: EditorView } => {
    const schema = buildSchema(registry);
    let currentPlaceholder = placeholder;
    // The last document the host handed over that the editor still holds unedited; lets `setDoc` ignore it again.
    let agreedDoc: typeof initialDoc | null = initialDoc;
    // `hostSeq` is the newest reported document the host handed back: a higher one is an echo, a lower or equal one a reset.
    const emittedSeq = new WeakMap<typeof initialDoc, number>();
    let emitCount = 0;
    let hostSeq = 0;

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
        handlePaste: (pasteView, event, slice) =>
            handlePasteByFeatures(registry.pasteHandlers, api)(pasteView, event) ||
            handlePasteIntoEmptyBlock(pasteView, event, slice),
        state: EditorState.create({
            doc: toEngineDocument(initialDoc, schema),
            plugins: [
                ...keystrokePipeline(registry, schema, api),
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
                const emitted = toRteDocument(editorView.state.doc);
                emitCount += 1;
                emittedSeq.set(emitted, emitCount);
                agreedDoc = null;
                onDocChange(emitted);
            }
            onStateChange();
        },
    });
    view = editorView;

    // 4. What the host gets back.
    // A host document that came while text was being composed, and the frame that tries it again.
    let waitingDoc: typeof initialDoc | null = null;
    let retryFrame = 0;

    const setDoc = (doc: typeof initialDoc): void => {
        // The newest document the host hands over wins, so one still waiting is dropped whatever this one is.
        waitingDoc = null;
        if (doc === agreedDoc) {
            return;
        }
        const seq = emittedSeq.get(doc);
        if (seq !== undefined && seq > hostSeq) {
            hostSeq = seq;
            return;
        }
        // Replacing text mid-composition breaks the word being composed, so the change waits for it to end, as in Slate.
        if (editorView.composing) {
            // Held or not, the host now holds a document of its own, so what it hands back after this is a reset.
            hostSeq = emitCount;
            waitingDoc = doc;
            if (retryFrame === 0) {
                retryFrame = requestAnimationFrame(applyWaitingDoc);
            }
            return;
        }
        applyDoc(doc);
    };

    const applyWaitingDoc = (): void => {
        retryFrame = 0;
        if (waitingDoc === null) {
            return;
        }
        if (editorView.composing) {
            retryFrame = requestAnimationFrame(applyWaitingDoc);
            return;
        }
        const doc = waitingDoc;
        waitingDoc = null;
        applyDoc(doc);
    };

    const applyDoc = (doc: typeof initialDoc): void => {
        // The host now holds a document of its own, newer than everything reported so far.
        hostSeq = emitCount;
        const next = toEngineDocument(doc, schema);
        // Drafts (an inline still being made) are in no document the host holds,
        // though a block reused from one handed out may bring one along; an
        // echo of what is there must leave them, and the caret, alone.
        if (withoutDrafts(next).eq(withoutDrafts(editorView.state.doc))) {
            agreedDoc = doc;
            return;
        }
        // Change only what differs, so the caret and the user's undo history map through and stay put.
        const transaction = editorView.state.tr;
        syncContent(transaction, 0, editorView.state.doc, next);
        if (transaction.docChanged) {
            transaction.setMeta(HOST_DOC, true);
            transaction.setMeta('addToHistory', false);
            editorView.dispatch(transaction);
        }
        agreedDoc = doc;
    };

    const mounted: MountedDocument = {
        handle: {
            api,
            selectionRect: createSelectionRectReader(editorView),
            document: () => toRteDocument(editorView.state.doc),
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
            cancelAnimationFrame(retryFrame);
            waitingDoc = null;
            editorView.destroy();
        },
    };
    return { mounted, view: editorView };
};
