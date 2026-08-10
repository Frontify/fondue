/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useEffect, useReducer, useRef } from 'react';

import { type FrontifyDocument } from '../core/document';
import { type EditorControlApi } from '../core/editor-api';
import { type FondueRtePlugin } from '../core/plugin';
import { createEditor, type EditorHandle } from '../prosemirror';

import { Toolbar } from './Toolbar';

export type RichTextEditorProps = {
    value?: FrontifyDocument;
    onChange?: (value: FrontifyDocument) => void;
    /** The plugins to mount, in toolbar order (e.g. `defaultPlugins`, extended or reduced as needed). */
    plugins?: FondueRtePlugin[];
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

/** Plugin styles are plain CSS; scope them to the editor via native CSS nesting. */
const scopedPluginStyles = (plugins: FondueRtePlugin[]): string =>
    plugins
        .filter((plugin) => plugin.styles)
        .map((plugin) => `.fondue-rte {\n${plugin.styles ?? ''}\n}`)
        .join('\n');

export const RichTextEditor = ({ value, onChange, plugins }: RichTextEditorProps): ReactNode => {
    const allPlugins = plugins ?? [];
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    const apiRef = useRef<EditorControlApi | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = allPlugins.map((p) => p.id).join('|');

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handle = createEditor({
            container,
            initialDoc: value ?? EMPTY_DOC,
            plugins: allPlugins,
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
        // Intentional: re-create the editor only when the plugin set changes.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey]);

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
            <style>{EDITOR_CSS + scopedPluginStyles(allPlugins)}</style>
            <div
                style={{
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    background: '#fff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                }}
            >
                {api && allPlugins.some((plugin) => plugin.toolbar) ? <Toolbar api={api} plugins={allPlugins} /> : null}
                <div ref={containerRef} />
            </div>
        </>
    );
};
