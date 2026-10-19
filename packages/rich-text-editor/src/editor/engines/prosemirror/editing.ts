/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, Selection, TextSelection } from 'prosemirror-state';
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
    // The last document the host handed over that the editor holds; lets `setDoc` ignore it again.
    let agreedDoc = initialDoc;
    // Every document reported to the host: one arriving back, even late and
    // behind newer edits, is the editor's own and never replaces what it holds.
    const emittedDocs = new WeakSet<typeof initialDoc>();

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
                emittedDocs.add(emitted);
                onDocChange(emitted);
            }
            onStateChange();
        },
    });
    view = editorView;

    // 4. What the host gets back.
    const setDoc = (doc: typeof initialDoc): void => {
        if (doc === agreedDoc || emittedDocs.has(doc)) {
            return;
        }
        const next = toEngineDocument(doc, schema);
        // Drafts (an inline still being made) are in no document the host holds,
        // though a block reused from one handed out may bring one along; an
        // echo of what is there must leave them, and the caret, alone.
        if (withoutDrafts(next).eq(withoutDrafts(editorView.state.doc))) {
            agreedDoc = doc;
            return;
        }
        // Different content: the old caret position means nothing in it, so the
        // caret goes to the end rather than mid-word somewhere.
        const transaction = editorView.state.tr.replaceWith(0, editorView.state.doc.content.size, next.content);
        transaction.setSelection(Selection.atEnd(transaction.doc));
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
            editorView.destroy();
        },
    };
    return { mounted, view: editorView };
};
