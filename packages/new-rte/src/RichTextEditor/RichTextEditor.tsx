/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type KeyboardEvent, type ReactNode, useEffect, useReducer, useRef, useState } from 'react';

import { createEditor, EDITOR_CLASS, type EditorHandle } from './prosemirror';
import { type ComboboxItem, type RteBlockNode, type RteDocumentOf, type RtePlugin } from './types';

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

/** How many combobox choices are offered at once. */
const COMBOBOX_LIMIT = 8;

/**
 * The editable element's own CSS. The whitespace rules are not cosmetic: without
 * `pre-wrap` the browser turns a typed trailing space into a non-breaking one,
 * which stops it from being read back as a space — and every typing rule that
 * ends in a space (`## `, `- `) silently never fires.
 */
const EDITOR_CSS = `
.${EDITOR_CLASS} {
    position: relative;
    outline: none;
    padding: 10px 12px;
    min-height: 80px;
    font-size: 14px;
    line-height: 1.6;
    color: #111;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    cursor: text;
    white-space: pre-wrap;
    white-space: break-spaces;
    word-wrap: break-word;
    font-variant-ligatures: none;
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
    // Which combobox entry is highlighted, tagged with the query it belongs to:
    // a new query means a new list, so the highlight falls back to the top
    // without an effect having to reset it.
    const [highlight, setHighlight] = useState<{ pluginId: string; query: string; index: number } | null>(null);

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

    const handle = handleRef.current;
    const api = handle?.api;

    // A trigger character opened a plugin's picker: the editor owns the list and
    // the keyboard, the plugin owns the items and what selecting one does.
    const combobox = handle?.combobox.active() ?? null;
    const comboboxPlugin = combobox ? plugins.find((plugin) => plugin.id === combobox.pluginId) : undefined;
    const items: readonly ComboboxItem[] =
        combobox && comboboxPlugin?.combobox
            ? comboboxPlugin.combobox.items(combobox.query).slice(0, COMBOBOX_LIMIT)
            : [];
    const stillCurrent =
        highlight !== null && highlight.pluginId === combobox?.pluginId && highlight.query === combobox.query;
    const activeIndex = stillCurrent ? Math.min(highlight.index, Math.max(items.length - 1, 0)) : 0;

    const moveHighlight = (index: number): void => {
        if (combobox) {
            setHighlight({ pluginId: combobox.pluginId, query: combobox.query, index });
        }
    };

    const choose = (item: ComboboxItem | undefined): void => {
        if (!item || !api || !handle || !comboboxPlugin?.combobox) {
            return;
        }
        handle.combobox.clear();
        comboboxPlugin.combobox.onSelect(item, api);
    };

    // Captured on the wrapper so the picker's keys never reach the editor.
    const handleKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>): void => {
        if (!combobox || items.length === 0) {
            return;
        }
        if (event.key === 'ArrowDown') {
            moveHighlight((activeIndex + 1) % items.length);
        } else if (event.key === 'ArrowUp') {
            moveHighlight((activeIndex - 1 + items.length) % items.length);
        } else if (event.key === 'Enter' || event.key === 'Tab') {
            choose(items[activeIndex]);
        } else if (event.key === 'Escape') {
            handle?.combobox.dismiss();
        } else {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    };

    // Plugin styles are plain CSS; scoping them here keeps them off the toolbar.
    const pluginStyles = plugins.flatMap((plugin) =>
        plugin.styles ? [`.${EDITOR_CLASS} {\n${plugin.styles}\n}`] : [],
    );

    return (
        <>
            <style>{[EDITOR_CSS, ...pluginStyles].join('\n')}</style>
            <div
                onKeyDownCapture={handleKeyDownCapture}
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
                            flexWrap: 'wrap',
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
            {combobox && items.length > 0 ? (
                <ul
                    role="listbox"
                    aria-label={`${combobox.trigger} suggestions`}
                    style={{
                        position: 'fixed',
                        left: combobox.coords.left,
                        top: combobox.coords.bottom + 4,
                        zIndex: 20,
                        margin: 0,
                        padding: 4,
                        listStyle: 'none',
                        minWidth: 180,
                        maxHeight: 240,
                        overflowY: 'auto',
                        background: '#fff',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                        fontSize: 13,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    }}
                >
                    {items.map((item, index) => (
                        <li key={item.id} role="option" aria-selected={index === activeIndex}>
                            <button
                                type="button"
                                // Never take the selection away from the editor.
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => choose(item)}
                                onMouseEnter={() => moveHighlight(index)}
                                style={{
                                    display: 'flex',
                                    gap: 8,
                                    width: '100%',
                                    alignItems: 'center',
                                    padding: '4px 8px',
                                    border: 'none',
                                    borderRadius: 4,
                                    textAlign: 'left',
                                    font: 'inherit',
                                    color: '#111',
                                    cursor: 'pointer',
                                    background: index === activeIndex ? '#e5e7eb' : 'transparent',
                                }}
                            >
                                {item.hint ? <span aria-hidden>{item.hint}</span> : null}
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    );
};
