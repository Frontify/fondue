/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dropCursor } from 'prosemirror-dropcursor';
import { EditorState, Selection, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type ElementAttributes, type MountedDocument, type MountDocument, type MountOptions } from '#/editor/port';

import {
    clipboardParser,
    clipboardSerializer,
    handlePasteByFeatures,
    handlePasteIntoEmptyBlock,
    keepOfficeListStyles,
    pastedWithoutExtras,
} from './clipboard';
import { createControlApi, type OpenEditors } from './controlApi';
import { toEngineDocument } from './documentConversion';
import { copiedExtrasPlugin } from './extraAttributes';
import { createHostSync, type FrameScheduler } from './hostSync';
import { keystrokePipeline } from './keystrokes';
import { createMarkViews, createNodeViews, LiveViews } from './nodeViews';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createSelectionRectReader } from './selectionRect';
import { HOST_DOC } from './transactionMeta';
import { userEditsPlugin } from './userEdits';
import './engine.scss';

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

/**
 * Set on the editable element, so engine.scss can scope the engine's own
 * classes to THIS editor's content and leave other editors on the page alone.
 */
const EDITABLE_ATTRIBUTE = 'data-rte-editable';

/** ProseMirror writes an `undefined` value as the text "undefined", so unset attributes stay out. */
const editableAttributes = (attributes: ElementAttributes): Record<string, string> => {
    const present: Record<string, string> = {};
    for (const [name, value] of Object.entries(attributes)) {
        if (value !== undefined) {
            present[name] = value;
        }
    }

    present[EDITABLE_ATTRIBUTE] = '';
    return present;
};

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
        onDocApplied,
        onStateChange,
        viewPortals,
    }: MountOptions,
    frames: FrameScheduler,
): { mounted: MountedDocument; view: EditorView } => {
    const schema = buildSchema(registry);
    let currentPlaceholder = placeholder;

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
    const hostSync = createHostSync({
        getView,
        schema,
        initialDoc,
        frames,
        onDocChange,
        onDocApplied,
        onStateChange,
    });

    // 3. The view: node/mark views, clipboard, the initial state, and the
    //    transaction loop that feeds the host.
    const editorView: EditorView = new EditorView(container, {
        attributes: editableAttributes(attributes),
        nodeViews: createNodeViews(registry, api, liveViews, openEditors),
        markViews: createMarkViews(registry, api, liveViews, openEditors),
        clipboardSerializer: clipboardSerializer(schema),
        clipboardParser: clipboardParser(schema),
        transformPastedHTML: keepOfficeListStyles,
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
                // Drawn in the view's offset parent, outside the text, so `currentColor` would be the host's colour.
                dropCursor({ color: 'var(--color-primary-default)', width: 2 }),
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
                hostSync.report();
            }

            onStateChange();
        },
    });
    view = editorView;
    onDocApplied(initialDoc);

    // 4. What the host gets back.
    const mounted: MountedDocument = {
        handle: {
            api,
            setEditableAttributes(next) {
                for (const [name, value] of Object.entries(next)) {
                    if (value === null) {
                        editorView.dom.removeAttribute(name);
                    } else if (value !== undefined) {
                        editorView.dom.setAttribute(name, value);
                    }
                }
            },
            selectionRect: createSelectionRectReader(editorView),
            document: hostSync.document,
            focusAtEnd: () => {
                editorView.dispatch(editorView.state.tr.setSelection(Selection.atEnd(editorView.state.doc)));
                editorView.focus();
            },
        },
        setDoc: hostSync.setDoc,
        setPlaceholder(next) {
            currentPlaceholder = next;
            // An empty props update makes the placeholder decoration be read again.
            editorView.setProps({});
        },
        setAttributes(next) {
            editorView.setProps({ attributes: editableAttributes(next) });
        },
        destroy() {
            hostSync.destroy();
            editorView.destroy();
        },
    };
    return { mounted, view: editorView };
};
