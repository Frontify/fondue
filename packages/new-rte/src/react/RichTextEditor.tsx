/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { type ReactNode, useEffect, useMemo, useReducer, useRef } from 'react';

import { buildPlugins, buildSchema, createEditorControlApi, documentToPm, pmToDocument } from '#/adapter/prosemirror';
import { type FrontifyDocument } from '#/core/document';
import { type EditorControlApi, createPluginEventBus } from '#/core/editor-api';
import { type FondueRtePlugin } from '#/core/plugin';

import { Toolbar } from './Toolbar';

export type RichTextEditorProps = {
    id?: string;
    value?: FrontifyDocument;
    onChange?: (value: FrontifyDocument) => void;
    plugins: FondueRtePlugin[];
    placeholder?: string;
    readonly?: boolean;
    autoFocus?: boolean;
};

const EMPTY_DOC: FrontifyDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
};

export const RichTextEditor = ({
    id,
    value,
    onChange,
    plugins,
    placeholder,
    readonly = false,
    autoFocus = false,
}: RichTextEditorProps): ReactNode => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);
    const apiRef = useRef<EditorControlApi | null>(null);
    const lastEmittedRef = useRef<FrontifyDocument | undefined>(value);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((p) => p.id).join('|');
    const schema = useMemo(() => buildSchema(plugins), [pluginsKey]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const initialDoc = value ?? EMPTY_DOC;
        const pmDoc = documentToPm(initialDoc, schema);

        const view: EditorView = new EditorView(container, {
            state: EditorState.create({
                doc: pmDoc,
                plugins: buildPlugins({
                    plugins,
                    getApi: () => {
                        if (!apiRef.current) {
                            throw new Error('Editor API accessed before it was initialised.');
                        }
                        return apiRef.current;
                    },
                }),
            }),
            editable: () => !readonly,
            dispatchTransaction(transaction) {
                const newState = view.state.apply(transaction);
                view.updateState(newState);
                if (transaction.docChanged) {
                    const nextDoc = pmToDocument(newState.doc);
                    lastEmittedRef.current = nextDoc;
                    onChangeRef.current?.(nextDoc);
                }
                force();
            },
        });
        viewRef.current = view;
        apiRef.current = createEditorControlApi({
            getView: () => viewRef.current,
            schema,
            events: createPluginEventBus(),
        });

        if (autoFocus) {
            view.focus();
        }
        force();

        return () => {
            view.destroy();
            viewRef.current = null;
            apiRef.current = null;
        };
    }, [schema, pluginsKey, readonly]);

    useEffect(() => {
        const view = viewRef.current;
        if (!view || !value) {
            return;
        }
        if (value === lastEmittedRef.current) {
            return;
        }
        const pmDoc = documentToPm(value, schema);
        const tr = view.state.tr.replaceWith(0, view.state.doc.content.size, pmDoc.content);
        view.dispatch(tr);
    }, [value, schema]);

    const api = apiRef.current;

    return (
        <div id={id} data-editor-id={id} style={{ border: '1px solid #ccc', borderRadius: 4, background: '#fff' }}>
            {!readonly && api ? <Toolbar api={api} plugins={plugins} position="top" /> : null}
            <div
                ref={containerRef}
                data-placeholder={placeholder}
                style={{
                    padding: 12,
                    minHeight: 160,
                    outline: 'none',
                }}
            />
        </div>
    );
};
