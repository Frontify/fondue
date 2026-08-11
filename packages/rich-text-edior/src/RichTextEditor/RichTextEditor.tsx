/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CSSProperties,
    Fragment,
    type KeyboardEvent,
    type ReactNode,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';

import { createEditor, type EditorHandle } from './prosemirror';
import styles from './richTextEditor.module.scss';
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
    /**
     * Show the content without allowing edits. The toolbar goes away with it —
     * there is nothing it could do.
     */
    readonly?: boolean;
    /** Shown while the document is empty. */
    placeholder?: string;
    /**
     * The editor lost focus, handed the document as it now stands — the hook to
     * commit on, when saving on every keystroke would be too much.
     *
     * Fires whenever focus leaves the editable element, which includes focus
     * moving into plugin UI that takes it (the link flyout's fields).
     */
    onBlur?: (value: RteDocumentOf<TBlock>) => void;
};

const EMPTY_DOC: RteDocumentOf = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
};

/** How many combobox choices are offered at once. */
const COMBOBOX_LIMIT = 8;

/**
 * Joins the class names that are actually set. Also the one place that turns a
 * CSS-module lookup into a plain string — every one of them is typed as possibly
 * missing.
 */
const classNames = (...names: (string | false | undefined)[]): string => names.filter(Boolean).join(' ');

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    onChange,
    plugins = [],
    readonly: readOnly = false,
    placeholder = '',
    onBlur,
}: RichTextEditorProps<TBlock>): ReactNode => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;
    // The editor is created once per plugin set, so these reach it as starting
    // values; the effects below carry every later change.
    const initialRef = useRef({ readOnly, placeholder });

    // The toolbar reads its state straight off the editor, so it has to
    // re-render whenever the editor state changes.
    const [, force] = useReducer((count: number) => count + 1, 0);
    // Which combobox entry is highlighted, tagged with the query it belongs to:
    // a new query means a new list, so the highlight falls back to the top
    // without an effect having to reset it.
    const [highlight, setHighlight] = useState<{ pluginId: string; query: string; index: number } | null>(null);

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    // A plugin that lays out the whole content (columns) styles the editable
    // element rather than anything it renders itself.
    const contentClassName = classNames(styles.content, ...plugins.map((plugin) => plugin.contentClassName));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handle = createEditor({
            container,
            initialDoc: value ?? EMPTY_DOC,
            plugins,
            readOnly: initialRef.current.readOnly,
            placeholder: initialRef.current.placeholder,
            contentClassName,
            placeholderClassName: classNames(styles.placeholder),
            onDocChange: (doc) => {
                // The engine emits the structural form; it is only as narrow
                // as the mounted plugin set, which the caller declared via TBlock.
                onChangeRef.current?.(doc as RteDocumentOf<TBlock>);
            },
            onStateChange: force,
            onBlur: (doc) => {
                onBlurRef.current?.(doc as RteDocumentOf<TBlock>);
            },
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

    useEffect(() => {
        handleRef.current?.setReadOnly(readOnly);
    }, [readOnly]);

    useEffect(() => {
        handleRef.current?.setPlaceholder(placeholder);
    }, [placeholder]);

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

    // Custom properties a plugin sets for the whole content (a column count).
    // They sit on the wrapper, which re-renders — so a changed value applies
    // without the editor being rebuilt — and inherit into the editable element.
    const contentProperties = Object.fromEntries(
        plugins.flatMap((plugin) => Object.entries(plugin.contentProperties ?? {})),
    );

    return (
        <>
            <div
                onKeyDownCapture={handleKeyDownCapture}
                className={styles.frame}
                // Custom properties are not part of React's CSSProperties.
                style={contentProperties as CSSProperties}
            >
                {api && !readOnly && plugins.some((plugin) => plugin.toolbar) ? (
                    <div role="toolbar" className={styles.toolbar}>
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
                    className={styles.combobox}
                    // The one thing that cannot live in the stylesheet: the list
                    // is anchored to the caret.
                    style={{ left: combobox.coords.left, top: combobox.coords.bottom + 4 }}
                >
                    {items.map((item, index) => (
                        <li key={item.id} role="option" aria-selected={index === activeIndex}>
                            <button
                                type="button"
                                // Never take the selection away from the editor.
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => choose(item)}
                                onMouseEnter={() => moveHighlight(index)}
                                className={classNames(styles.option, index === activeIndex && styles.optionActive)}
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
