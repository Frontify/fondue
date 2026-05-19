/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type FrontifyDocument } from '#/core/document';
import { type EditorControlApi, type PluginEventBus, createPluginEventBus } from '#/core/editor-api';
import { type FondueRtePlugin } from '#/core/plugin';

import { documentToPm, pmToDocument } from './document';
import { createEditorControlApi } from './editor-api';
import { buildPlugins } from './toPlugins';

export type EditorHandle = {
    destroy(): void;
    getApi(): EditorControlApi;
    updateExternalDoc(doc: FrontifyDocument): void;
};

export type CreateEditorArgs = {
    container: HTMLElement;
    initialDoc: FrontifyDocument;
    plugins: FondueRtePlugin[];
    schema: Schema;
    onDocChange(doc: FrontifyDocument): void;
    onStateChange(): void;
    readonly?: boolean;
    autoFocus?: boolean;
    events?: PluginEventBus;
    editorClass?: string;
};

export const createEditor = ({
    container,
    initialDoc,
    plugins,
    schema,
    onDocChange,
    onStateChange,
    readonly = false,
    autoFocus = false,
    events,
    editorClass,
}: CreateEditorArgs): EditorHandle => {
    const pluginEvents = events ?? createPluginEventBus();
    let api: EditorControlApi | null = null;

    const pmDoc = documentToPm(initialDoc, schema);
    let lastEmitted: FrontifyDocument = initialDoc;

    const viewAttrs: Record<string, string> = {};
    if (editorClass) {
        viewAttrs.class = editorClass;
    }

    const view: EditorView = new EditorView(container, {
        attributes: viewAttrs,
        state: EditorState.create({
            doc: pmDoc,
            plugins: buildPlugins({
                plugins,
                getApi: () => {
                    if (!api) {
                        throw new Error('Editor API accessed before it was initialised.');
                    }
                    return api;
                },
            }),
        }),
        editable: () => !readonly,
        dispatchTransaction(transaction) {
            const newState = view.state.apply(transaction);
            view.updateState(newState);
            if (transaction.docChanged) {
                const nextDoc = pmToDocument(newState.doc);
                lastEmitted = nextDoc;
                onDocChange(nextDoc);
            }
            onStateChange();
        },
    });

    api = createEditorControlApi({
        getView: () => view,
        schema,
        events: pluginEvents,
    });

    if (autoFocus) {
        view.focus();
    }

    return {
        destroy() {
            view.destroy();
        },
        getApi() {
            if (!api) {
                throw new Error('Editor API accessed after destroy.');
            }
            return api;
        },
        updateExternalDoc(doc) {
            if (doc === lastEmitted) {
                return;
            }
            const node = documentToPm(doc, schema);
            const tr = view.state.tr.replaceWith(0, view.state.doc.content.size, node.content);
            view.dispatch(tr);
        },
    };
};
