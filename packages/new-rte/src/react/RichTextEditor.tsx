/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useEffect, useMemo, useReducer, useRef } from 'react';

import { buildSchema, createEditor, type EditorHandle } from '#/adapter/prosemirror';
import { type FrontifyDocument } from '#/core/document';
import { type EditorControlApi } from '#/core/editor-api';
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

const EDITOR_CSS = `
.fondue-rte {
    outline: none;
    padding: 10px 12px;
    min-height: 80px;
    font-size: 14px;
    line-height: 1.6;
    color: #111;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    cursor: text;
}
`;

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
    const handleRef = useRef<EditorHandle | null>(null);
    const apiRef = useRef<EditorControlApi | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((p) => p.id).join('|');
    // eslint-disable-next-line @eslint-react/exhaustive-deps
    const schema = useMemo(() => buildSchema(plugins), [pluginsKey]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handle = createEditor({
            container,
            initialDoc: value ?? EMPTY_DOC,
            plugins,
            schema,
            readonly,
            autoFocus,
            editorClass: 'fondue-rte',
            onDocChange: (doc) => {
                onChangeRef.current?.(doc);
            },
            onStateChange: () => {
                force();
            },
        });
        handleRef.current = handle;
        apiRef.current = handle.getApi();
        force();

        return () => {
            handle.destroy();
            handleRef.current = null;
            apiRef.current = null;
        };
        // Intentional: re-create editor only when schema/plugins/readonly change.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [schema, pluginsKey, readonly]);

    // Push externally-driven doc updates into the editor.
    useEffect(() => {
        if (!value) {
            return;
        }
        handleRef.current?.updateExternalDoc(value);
    }, [value]);

    const api = apiRef.current;

    return (
        <>
            <style>{EDITOR_CSS}</style>
            <div
                id={id}
                data-editor-id={id}
                style={{
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    background: '#fff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                }}
            >
                {!readonly && api ? <Toolbar api={api} plugins={plugins} position="top" /> : null}
                <div ref={containerRef} data-placeholder={placeholder} />
            </div>
        </>
    );
};
