/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
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
import { createHostRecord, hostDocAction, recordAgreed, recordEcho, recordHandOver, recordReport } from './hostRecord';
import { keystrokePipeline } from './keystrokes';
import { createMarkViews, createNodeViews, LiveViews } from './nodeViews';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createSelectionRectReader } from './selectionRect';
import { syncDocument } from './syncDocument';
import { dispatchOutsideHistory, userEditsPlugin } from './userEdits';
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
    let record = createHostRecord(initialDoc);
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
                userEditsPlugin(),
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
                record = recordReport(record, emitted);
                onDocChange(emitted);
            }
            onStateChange();
        },
    });
    view = editorView;

    // 4. What the host gets back.
    let held: Held = { kind: 'none' };

    const applyDoc = (doc: RteDocumentOf): void => {
        record = recordHandOver(record);
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
                if (dispatchOutsideHistory(editorView, transaction)) {
                    onStateChange();
                }
            }
        }
        record = recordAgreed(record, doc);
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
                record = recordEcho(record, action.seq);
                return;
            case 'wait':
                // Held or not, the host now holds a document of its own, so what it hands back after this is a reset.
                record = recordHandOver(record);
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
