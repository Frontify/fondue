/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode } from 'react';

import { FloatingLayer } from './components/FloatingLayer';
import { Toolbar } from './components/Toolbar';
import { useEditorHandle } from './hooks/useEditorHandle';
import { useFloating } from './hooks/useFloating';
import styles from './richTextEditor.module.scss';
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

/**
 * The editor: a frame holding the plugins' toolbar and the editable element, plus
 * the floating layer for plugin UI that hangs over the content.
 *
 * Everything stateful sits in the two hooks: `useEditorHandle` owns the live
 * editor, `useFloating` owns the floating UI and its keyboard.
 */
export const RichTextEditor = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    onChange,
    plugins = [],
    readonly: readOnly = false,
    placeholder = '',
    onBlur,
}: RichTextEditorProps<TBlock>): ReactNode => {
    const { containerRef, handle } = useEditorHandle({
        plugins,
        value,
        readOnly,
        placeholder,
        // The engine emits the structural form; it is only as narrow as the
        // mounted plugin set, which the caller declared via TBlock.
        onDocChange: (doc) => onChange?.(doc as RteDocumentOf<TBlock>),
        onBlur: (doc) => onBlur?.(doc as RteDocumentOf<TBlock>),
    });
    const floating = useFloating({ handle, plugins, enabled: !readOnly });

    const api = handle?.api;

    // Custom properties a plugin sets for the whole content (a column count).
    // They sit on the wrapper, which re-renders — so a changed value applies
    // without the editor being rebuilt — and inherit into the editable element.
    const contentProperties = Object.fromEntries(
        plugins.flatMap((plugin) => Object.entries(plugin.contentProperties ?? {})),
    );

    return (
        <>
            <div
                onKeyDownCapture={floating.onKeyDownCapture}
                className={styles.frame}
                // Custom properties are not part of React's CSSProperties.
                style={contentProperties as CSSProperties}
            >
                {api && !readOnly ? <Toolbar plugins={plugins} api={api} /> : null}
                <div ref={containerRef} />
            </div>
            <FloatingLayer surfaces={floating.surfaces} />
        </>
    );
};
