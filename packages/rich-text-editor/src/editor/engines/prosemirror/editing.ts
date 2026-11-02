/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
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
    // Reported documents are numbered, and `hostSeq` is the newest the host has handed back: a
    // higher one is the host catching up (an echo, however late), a lower or equal one is a reset.
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
        const next = toEngineDocument(doc, schema);
        // Drafts (an inline still being made) are in no document the host holds,
        // though a block reused from one handed out may bring one along; an
        // echo of what is there must leave them, and the caret, alone.
        if (withoutDrafts(next).eq(withoutDrafts(editorView.state.doc))) {
            agreedDoc = doc;
            return;
        }
        // Replace only what differs, so the caret maps through the step and stays put.
        const current = editorView.state.doc;
        const start = current.content.findDiffStart(next.content);
        const end = current.content.findDiffEnd(next.content);
        if (start === null || end === null) {
            agreedDoc = doc;
            return;
        }
        let { a: endA, b: endB } = end;
        // The ends can cross when the change is a repeat of its neighbours.
        const overlap = start - Math.min(endA, endB);
        if (overlap > 0) {
            endA += overlap;
            endB += overlap;
        }
        const transaction = editorView.state.tr.replace(start, endA, next.slice(start, endB));
        transaction.setMeta(HOST_DOC, true);
        transaction.setMeta('addToHistory', false);
        editorView.dispatch(transaction);
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
