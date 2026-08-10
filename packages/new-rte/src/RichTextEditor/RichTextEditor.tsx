/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type ReactNode, useEffect, useReducer, useRef } from 'react';

import { createEditor, EDITOR_CLASS, type EditorHandle } from './prosemirror';
import { type RteBlockNode, type RteDocumentOf, type RtePlugin } from './types';

/**
 * `TBlock` is the document's block union. The editor itself is agnostic, so it
 * defaults to the structural skeleton here; the package root re-exports this
 * component with the official `RteBlock` union as the default, so consumers of
 * the shipped plugins get a typed `value`/`onChange` without passing anything.
 * Consumer plugins widen it: `RichTextEditor<RteBlock | CalloutBlock>`.
 */
export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlockNode> = {
    value?: RteDocumentOf<TBlock>;
    onChange?: (value: RteDocumentOf<TBlock>) => void;
    /** The plugins to mount, in toolbar order (e.g. `defaultPlugins`, extended or reduced as needed). */
    plugins?: RtePlugin[];
};

const EMPTY_DOC: RteDocumentOf = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
};

const EDITOR_CSS = `
.${EDITOR_CLASS} {
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

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    onChange,
    plugins = [],
}: RichTextEditorProps<TBlock>): ReactNode => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    // The toolbar reads its state straight off the editor, so it has to
    // re-render whenever the editor state changes.
    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handle = createEditor({
            container,
            initialDoc: value ?? EMPTY_DOC,
            plugins,
            onDocChange: (doc) => {
                // The engine emits the structural form; it is only as narrow
                // as the mounted plugin set, which the caller declared via TBlock.
                onChangeRef.current?.(doc as RteDocumentOf<TBlock>);
            },
            onStateChange: force,
        });
        handleRef.current = handle;
        force();

        return () => {
            handle.destroy();
            handleRef.current = null;
        };
        // Intentional: re-create the editor only when the plugin set changes.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey]);

    // Push externally-driven doc updates into the editor.
    useEffect(() => {
        if (value) {
            handleRef.current?.setDoc(value);
        }
    }, [value]);

    const api = handleRef.current?.api;
    // Plugin styles are plain CSS; scoping them here keeps them off the toolbar.
    const pluginStyles = plugins.flatMap((plugin) =>
        plugin.styles ? [`.${EDITOR_CLASS} {\n${plugin.styles}\n}`] : [],
    );

    return (
        <>
            <style>{[EDITOR_CSS, ...pluginStyles].join('\n')}</style>
            <div
                style={{
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    background: '#fff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                }}
            >
                {api && plugins.some((plugin) => plugin.toolbar) ? (
                    <div
                        role="toolbar"
                        style={{
                            display: 'flex',
                            gap: 4,
                            padding: '6px 8px',
                            borderBottom: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            alignItems: 'center',
                        }}
                    >
                        {plugins.map((plugin) =>
                            plugin.toolbar ? <Fragment key={plugin.id}>{plugin.toolbar(api)}</Fragment> : null,
                        )}
                    </div>
                ) : null}
                <div ref={containerRef} />
            </div>
        </>
    );
};
