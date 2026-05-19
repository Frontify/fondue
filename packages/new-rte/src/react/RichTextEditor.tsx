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
