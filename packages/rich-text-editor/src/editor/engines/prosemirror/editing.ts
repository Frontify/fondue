/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dropCursor } from 'prosemirror-dropcursor';
import { EditorState, type Plugin, Selection, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type RteDocumentOf } from '#/core';
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
import { rootExtrasOf, toEngineDocument, toRteDocument, withoutDrafts } from './documentConversion';
import { copiedExtrasPlugin } from './extraAttributes';
import { createHostRecord, hostDocAction, recordAgreed, recordEcho, recordHandOver, recordReport } from './hostRecord';
import { keystrokePipeline } from './keystrokes';
import { createMarkViews, createNodeViews, LiveViews } from './nodeViews';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createSelectionRectReader } from './selectionRect';
import { separatorPlacementPlugin } from './separatorPlacement';
import { HOST_DOC } from './transactionMeta';
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
const mount = ({
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
}: MountOptions): { mounted: MountedDocument; view: EditorView } => {
    const schema = buildSchema(registry);
    let currentPlaceholder = placeholder;
    let record = createHostRecord(initialDoc);
    // The order each document was reported in, which tells an echo from a reset.
    const reportOrders = new WeakMap<RteDocumentOf, number>();
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

    // 3. The plugins; the placement rule is only there when a block asks for it.
    const plugins: Plugin[] = keystrokePipeline(registry, schema, api);
    const hasSeparatorBlock = [...registry.blocks.values()].some((definition) => definition.separator === true);
    if (hasSeparatorBlock) {
        plugins.push(separatorPlacementPlugin(registry));
    }
    plugins.push(
        copiedExtrasPlugin(),
        placeholderPlugin(() => currentPlaceholder, placeholderClassName),
        // Drawn in the view's offset parent, outside the text, so `currentColor` would be the host's colour.
        dropCursor({ color: 'var(--color-primary-default)', width: 2 }),
    );

    // 4. The view: node/mark views, clipboard, the initial state, and the
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
            plugins,
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
            const previousDoc = editorView.state.doc;
            editorView.updateState(editorView.state.apply(transaction));
            repaintViews();
            // A refused transaction leaves the document as it was, so there is nothing to report.
            const isApplied = transaction.docChanged && editorView.state.doc !== previousDoc;
            // Host-originated changes are not reported back to the host.
            if (isApplied && transaction.getMeta(HOST_DOC) !== true) {
                const emitted = toRteDocument(editorView.state.doc, rootExtras);
                record = recordReport(record);
                reportOrders.set(emitted, record.reportCount);
                onDocChange(emitted);
            }
            onStateChange();
        },
    });
    view = editorView;
    onDocApplied(initialDoc);

    // 5. What the host gets back.
    const applyDoc = (doc: RteDocumentOf): void => {
        const next = toEngineDocument(doc, schema);
        // Drafts (an inline still being made) are in no document the host holds,
        // though a block reused from one handed out may bring one along; an
        // echo of what is there must leave them, and the caret, alone.
        rootExtras = rootExtrasOf(doc);
        if (withoutDrafts(next).eq(withoutDrafts(editorView.state.doc))) {
            record = recordAgreed(record, doc);
            onDocApplied(doc);
            return;
        }
        // Different content: the old caret position means nothing in it, so the
        // caret goes to the end rather than mid-word somewhere.
        const transaction = editorView.state.tr.replaceWith(0, editorView.state.doc.content.size, next.content);
        transaction.setSelection(Selection.atEnd(transaction.doc));
        transaction.setMeta(HOST_DOC, true);
        transaction.setMeta('addToHistory', false);
        editorView.dispatch(transaction);
        record = recordAgreed(record, doc);
        onDocApplied(doc);
    };

    const setDoc = (doc: RteDocumentOf): void => {
        const action = hostDocAction({ record, doc, reportOrder: reportOrders.get(doc) });

        switch (action.kind) {
            case 'unchanged':
                return;
            case 'echo':
                record = recordEcho(record, action.order);
                return;
            case 'apply':
                record = recordHandOver(record);
                applyDoc(doc);
                return;
        }
    };

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
            document: () => toRteDocument(editorView.state.doc, rootExtras),
            focusAtEnd: () => {
                editorView.dispatch(editorView.state.tr.setSelection(Selection.atEnd(editorView.state.doc)));
                editorView.focus();
            },
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
