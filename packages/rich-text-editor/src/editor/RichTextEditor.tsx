/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode, useMemo, useState } from 'react';

import { buildPluginRegistry, emptyDocument, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';
import { RichTextRenderer } from '#/renderer';
import documentStyles from '#/renderer/document.module.scss';

import { FloatingToolbar } from './FloatingToolbar';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useFocusWithin } from './hooks/useFocusWithin';
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
     * Every plugin needs an `id` of its own: the ids are the toolbar's keys
     * and the editor's identity. Two plugins sharing one is a mistake, warned
     * about in development.
     *
     * Read once per set of ids. The editor is built when the ids change and
     * reads the schema, the hotkeys and the typing rules off the plugins then;
     * a new list with the same ids — the same plugins rebuilt inline on every
     * render, or one with a changed option (a different `items` for the
     * mention picker) — does not reach the editor already running. To apply a
     * changed option, remount the editor with a new `key`.
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
    // What the editor last reported, so an uncontrolled editor keeps its
    // content across readonly toggles and remounts. A `value` always wins.
    const [ownDocument, setOwnDocument] = useState<RteDocumentOf>(() => value ?? emptyDocument());
    const document = value ?? ownDocument;

    // Everything below reads the plugins through this, never the list itself.
    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);
    const contentClassName = [documentStyles.document, styles.content, ...registry.contentClassNames].join(' ');
    const { containerRef, handle, editorState } = useEditorHandle({
        registry,
        document,
        placeholder,
        contentClassName,
        placeholderClassName: styles.placeholder ?? '',
        onDocChange: (doc) => {
            setOwnDocument(doc);
            onChange?.(doc as RteDocumentOf<TBlock>);
        },
        onBlur: (doc) => onBlur?.(doc as RteDocumentOf<TBlock>),
        enabled: !readOnly,
    });
    const { focusWithin, focusProps } = useFocusWithin();

    // Nothing here reads the editor state: the toolbar and the floating bar
    // subscribe to it themselves, so a keystroke re-renders them, not this.
    const toolbarFloats = toolbarPlacement === 'floating';
    const toolbar =
        handle && !readOnly && showEditor ? (
            <Toolbar
                items={registry.toolbarItems}
                api={handle.api}
                editorState={editorState}
                placement={toolbarPlacement}
            />
        ) : null;

    return (
        <div {...focusProps} className={styles.root} style={registry.contentProperties as CSSProperties}>
            {toolbarFloats && handle && toolbar !== null && focusWithin ? (
                <FloatingToolbar handle={handle} editorState={editorState}>
                    {toolbar}
                </FloatingToolbar>
            ) : null}
            <div className={styles.frame} data-chrome={String(showEditor)}>
                {toolbarFloats ? null : toolbar}
                {readOnly ? (
                    // The renderer adds the document and plugin classes itself.
                    <RichTextRenderer value={document} plugins={plugins} className={styles.content} />
                ) : (
                    <div ref={containerRef} />
                )}
            </div>
        </div>
    );
};
