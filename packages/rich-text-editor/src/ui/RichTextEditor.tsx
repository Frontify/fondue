/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode } from 'react';

import { type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/domain';

import { FloatingLayer } from './components/FloatingLayer';
import { FloatingToolbar } from './components/FloatingToolbar';
import { Toolbar, type ToolbarPlacement } from './components/Toolbar';
import { classNames } from './helpers/classNames';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useFloating } from './hooks/useFloating';
import { useFocusWithin } from './hooks/useFocusWithin';
import { useSelectionRect } from './hooks/useSelectionRect';
import styles from './richTextEditor.module.scss';

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
     * Where the toolbar goes.
     *
     * `'floating'` hangs it over the selected text and shows it only while there
     * is a selection to act on, so the frame holds nothing but the content and
     * the controls are wherever the reader is working — including in an editor
     * far taller than the window, where a bar fixed to the top would have
     * scrolled out of sight.
     *
     * `'top'` puts it inside the frame as a strip above the content, where it is
     * part of the editor's own box and always there.
     *
     * @default 'floating'
     */
    toolbarPlacement?: ToolbarPlacement;
    /**
     * Show the content without allowing edits. The toolbar goes away with it —
     * there is nothing it could do.
     */
    readonly?: boolean;
    /**
     * Draw the editor's chrome — the border, the background and the toolbar.
     * Turn it off and only the content is rendered, with none of the inset the
     * editable surface otherwise carries: the pairing for `readonly`, where the
     * document is being displayed rather than worked on and a box around it
     * would be a promise the editor cannot keep.
     *
     * @default true
     */
    showEditor?: boolean;
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

/**
 * The editor: a frame around the editable element, the plugins' toolbar either
 * inside it or hanging over the selection, and the floating layer for plugin UI
 * that hangs over the content.
 *
 * Everything stateful sits in the hooks: `useEditorHandle` owns the live editor,
 * `useFloating` owns plugin floating UI and its keyboard, and the two small ones
 * answer where the selection is and whether the editor is being worked in.
 */
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
    const { containerRef, handle } = useEditorHandle({
        plugins,
        value,
        readOnly,
        placeholder,
        // A plugin that lays out the whole content (columns) styles the editable
        // element rather than anything it renders itself.
        contentClassName: classNames(styles.content, ...plugins.map((plugin) => plugin.contentClassName)),
        placeholderClassName: classNames(styles.placeholder),
        // The engine emits the structural form; it is only as narrow as the
        // mounted plugin set, which the caller declared via TBlock.
        onDocChange: (doc) => onChange?.(doc as RteDocumentOf<TBlock>),
        onBlur: (doc) => onBlur?.(doc as RteDocumentOf<TBlock>),
    });
    const floating = useFloating({ handle, plugins, enabled: !readOnly });
    // A floating toolbar is shown for as long as the editor is being worked in,
    // which is not the same as the editable element having focus: reaching into a
    // dropdown in the toolbar takes focus out of the text, and the bar holding it
    // cannot go away underneath it.
    const { focusWithin, focusProps } = useFocusWithin();

    const api = handle?.api;
    const toolbarFloats = toolbarPlacement === 'floating';
    const toolbar =
        api && !readOnly && showEditor ? <Toolbar plugins={plugins} api={api} placement={toolbarPlacement} /> : null;
    // The box the floating bar hangs over, and null whenever it is not the one
    // showing: nothing is selected, the toolbar is a strip in the frame instead,
    // or the editor is not being worked in at all.
    const selectionRect = useSelectionRect({ handle, enabled: toolbarFloats && toolbar !== null && focusWithin });

    // Custom properties a plugin sets for the whole content (a column count).
    // They sit on the wrapper, which re-renders — so a changed value applies
    // without the editor being rebuilt — and inherit into the editable element.
    const contentProperties = Object.fromEntries(
        plugins.flatMap((plugin) => Object.entries(plugin.contentProperties ?? {})),
    );

    return (
        <>
            {/*
             * The wrapper is where focus and keys are watched for the whole editor,
             * toolbar included. It lays out as nothing at all (`display: contents`),
             * so the frame is still the box a page positions and sizes.
             */}
            <div
                onKeyDownCapture={floating.onKeyDownCapture}
                {...focusProps}
                className={styles.root}
                // Custom properties are not part of React's CSSProperties. They
                // sit here rather than on the frame so they reach the toolbar too.
                style={contentProperties as CSSProperties}
            >
                {toolbarFloats && selectionRect !== null ? (
                    <FloatingToolbar rect={selectionRect}>{toolbar}</FloatingToolbar>
                ) : null}
                <div className={classNames(styles.frame, !showEditor && styles.contentOnly)}>
                    {toolbarFloats ? null : toolbar}
                    <div ref={containerRef} />
                </div>
            </div>
            <FloatingLayer surfaces={floating.surfaces} />
        </>
    );
};
