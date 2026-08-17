/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode } from 'react';

import { emptyDocument, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';
import { RichTextRenderer } from '#/renderer';

import { FloatingLayer } from './FloatingLayer';
import { FloatingToolbar } from './FloatingToolbar';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useFloating } from './hooks/useFloating';
import { useFocusWithin } from './hooks/useFocusWithin';
import { useSelectionRect } from './hooks/useSelectionRect';
import styles from './richTextEditor.module.scss';
import { Toolbar, type ToolbarPlacement } from './Toolbar';

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
    /**
     * The plugins to mount, in toolbar order (e.g. `defaultPlugins`, extended
     * or reduced as needed). Defaults to `defaultPlugins` at the package root.
     *
     * Mount-time configuration: the editor is built once per plugin set and
     * reads the schema, the hotkeys and the typing rules off it then. Changing
     * which plugins are in the list builds a new editor; changing an option
     * *inside* one (a different `items` for the mention picker) does not reach
     * the editor that is already running, so drive that from a `key` on the
     * editor instead — memoize the list, or remount.
     */
    plugins?: RtePlugin[];
    /**
     * Where the toolbar goes.
     *
     * `'floating'` hangs it over the selected text and shows it only while
     * there is a selection to act on, so the frame holds nothing but the
     * content and the controls are wherever the reader is working — including
     * in an editor taller than the window, where a bar fixed to the top would
     * have scrolled away.
     *
     * `'top'` puts it inside the frame as a strip above the content, part of
     * the editor's own box and always there.
     *
     * @default 'floating'
     */
    toolbarPlacement?: ToolbarPlacement;
    /** Show the content without allowing edits. The toolbar goes away with it. */
    readonly?: boolean;
    /**
     * Draw the editor's chrome — the border, the background and the toolbar.
     * Turn it off and only the content is rendered, without the inset the
     * editable surface otherwise carries. The pairing for `readonly`, where the
     * document is being displayed rather than worked on.
     *
     * @default true
     */
    showEditor?: boolean;
    /** Shown while the document is empty. */
    placeholder?: string;
    /**
     * The editor lost focus, handed the document as it now stands — the hook to
     * commit on, when saving on every keystroke would be too much. Fires
     * whenever focus leaves the editable element, including focus moving into
     * plugin UI that takes it (the link flyout's fields).
     */
    onBlur?: (value: RteDocumentOf<TBlock>) => void;
};

export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    onChange,
    plugins = [],
    toolbarPlacement = 'floating',
    readonly: readOnly = false,
    showEditor = true,
    placeholder = '',
    onBlur,
}: RichTextEditorProps<TBlock>): ReactNode => {
    const contentClassName = [styles.content, ...plugins.map((plugin) => plugin.contentClassName)]
        .filter(Boolean)
        .join(' ');
    const { containerRef, handle } = useEditorHandle({
        plugins,
        value,
        placeholder,
        contentClassName,
        placeholderClassName: styles.placeholder ?? '',
        onDocChange: (doc) => onChange?.(doc as RteDocumentOf<TBlock>),
        onBlur: (doc) => onBlur?.(doc as RteDocumentOf<TBlock>),
        enabled: !readOnly,
    });
    const floating = useFloating({ handle, plugins, enabled: !readOnly });
    const { focusWithin, focusProps } = useFocusWithin();

    const api = handle?.api;
    const toolbarFloats = toolbarPlacement === 'floating';
    const toolbar =
        api && !readOnly && showEditor ? <Toolbar plugins={plugins} api={api} placement={toolbarPlacement} /> : null;
    const selectionRect = useSelectionRect({ handle, enabled: toolbarFloats && toolbar !== null && focusWithin });

    const contentProperties = Object.fromEntries(
        plugins.flatMap((plugin) => Object.entries(plugin.contentProperties ?? {})),
    );

    const document = value ?? emptyDocument();

    return (
        <>
            <div
                onKeyDownCapture={floating.onKeyDownCapture}
                {...focusProps}
                className={styles.root}
                style={contentProperties as CSSProperties}
            >
                {toolbarFloats && selectionRect !== null ? (
                    <FloatingToolbar rect={selectionRect}>{toolbar}</FloatingToolbar>
                ) : null}
                <div className={styles.frame} data-chrome={String(showEditor)}>
                    {toolbarFloats ? null : toolbar}
                    {readOnly ? (
                        <RichTextRenderer value={document} plugins={plugins} className={contentClassName} />
                    ) : (
                        <div ref={containerRef} />
                    )}
                </div>
            </div>
            <FloatingLayer surfaces={floating.surfaces} />
        </>
    );
};
