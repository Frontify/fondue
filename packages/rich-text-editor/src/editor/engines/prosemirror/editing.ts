/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { buildPluginRegistry, type EditorControlApi } from '#/core';
import { type EditorHandle, type MountDocument } from '#/editor/port';

import { createControlApi, type OpenEditors } from './controlApi';
import { toEngineDocument, toRteDocument } from './documentConversion';
import { keystrokePipeline } from './keystrokes';
import { createMarkViews, createNodeViews, type Repaintable } from './nodeViews';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createSelectionRectReader } from './selectionRect';
import { wholeIslandsPlugin } from './wholeIslands';
import './engine.scss';

/**
 * The live editor. Readonly display is `RichTextRenderer` — this module is only
 * imported when something is going to be edited.
 */

const HOST_DOC = 'rte-host-doc';

export const mountDocument: MountDocument = ({
    container,
    plugins: features,
    initialDoc,
    readOnly,
    placeholder,
    contentClassName,
    placeholderClassName,
    onDocChange,
    onStateChange,
    onBlur,
}) => {
    const registry = buildPluginRegistry(features);
    const bundle = buildSchema(registry);
    const { schema } = bundle;
    const current = { readOnly, placeholder };

    let api!: EditorControlApi;
    const getApi = (): EditorControlApi => api;
    let agreedDoc = initialDoc;
    // Inline node views repaint on every state change, since `isFocused` follows the selection.
    const liveInlines = new Set<Repaintable>();
    const repaintViews = (): void => {
        let openStillFocused = false;
        for (const live of liveInlines) {
            const { type, focused } = live.paint();
            openStillFocused ||= focused && type === openEditors.type;
        }
        // The caret left the node whose editing UI was open: it closes, and
        // stays closed when the caret comes back.
        if (openEditors.type !== null && !openStillFocused) {
            openEditors.type = null;
            for (const live of liveInlines) {
                live.paint();
            }
        }
    };
    const openEditors: OpenEditors = { type: null, repaint: repaintViews };

    const view: EditorView = new EditorView(container, {
        attributes: { class: contentClassName },
        editable: () => !current.readOnly,
        nodeViews: createNodeViews(registry, getApi, liveInlines, openEditors),
        markViews: createMarkViews(registry, getApi, liveInlines, openEditors),
        state: EditorState.create({
            doc: toEngineDocument(initialDoc, schema),
            plugins: [
                ...keystrokePipeline(features, bundle, getApi),
                placeholderPlugin(() => current.placeholder, placeholderClassName),
                wholeIslandsPlugin(),
            ],
        }),
        handleDOMEvents: {
            blur: () => {
                onBlur(toRteDocument(view.state.doc));
                return false;
            },
        },
        handleClickOn(_view, _pos, node, nodePos) {
            if (node.isInline && node.isAtom) {
                view.dispatch(
                    view.state.tr.setSelection(TextSelection.create(view.state.doc, nodePos + node.nodeSize)),
                );
                return true;
            }
            return false;
        },
        dispatchTransaction(transaction) {
            view.updateState(view.state.apply(transaction));
            repaintViews();
            if (transaction.docChanged && transaction.getMeta(HOST_DOC) !== true) {
                agreedDoc = toRteDocument(view.state.doc);
                onDocChange(agreedDoc);
            }
            onStateChange();
        },
    });

    api = createControlApi(view, bundle, openEditors);
    const refresh = (): void => view.setProps({});

    const handle: EditorHandle = {
        api,
        selectionRect: createSelectionRectReader(view),
    };

    return {
        handle,
        setDoc(doc) {
            if (doc === agreedDoc) {
                return;
            }
            const next = toEngineDocument(doc, schema);
            if (next.eq(view.state.doc)) {
                agreedDoc = doc;
                return;
            }

            const { from, to } = view.state.selection;
            const transaction = view.state.tr.replaceWith(0, view.state.doc.content.size, next.content);
            const end = transaction.doc.content.size;
            transaction.setSelection(
                TextSelection.between(
                    transaction.doc.resolve(Math.min(from, end)),
                    transaction.doc.resolve(Math.min(to, end)),
                ),
            );
            transaction.setMeta(HOST_DOC, true);
            transaction.setMeta('addToHistory', false);
            view.dispatch(transaction);
            agreedDoc = doc;
        },
        setReadOnly(next) {
            current.readOnly = next;
            refresh();
        },
        setPlaceholder(next) {
            current.placeholder = next;
            refresh();
        },
        destroy() {
            view.destroy();
        },
    };
};
