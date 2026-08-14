/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect, useReducer, useRef } from 'react';

import { createEditor } from '#/adapters/prosemirror';
import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { emptyDocument, type RteDocumentOf, type RtePlugin } from '#/domain';
import { type EditorHandle } from '#/ports';

/**
 * Owns the live editor and nothing else: creates it once per plugin set,
 * carries later prop changes into it, and re-renders the component whenever the
 * editor state moves — the toolbar and the panels read their state straight off
 * the handle.
 *
 * The only place that chooses the implementations behind the ports — the engine
 * and the render probe. Everything else in the shell goes through the
 * `EditorHandle` this returns.
 *
 * Class names arrive ready-made: which classes the editable element carries is
 * a styling decision, and styling belongs to the component owning the
 * stylesheet.
 */

type UseEditorHandleOptions = {
    plugins: RtePlugin[];
    value: RteDocumentOf | undefined;
    readOnly: boolean;
    placeholder: string;
    /** Classes for the editable element: the editor's own plus the plugins'. */
    contentClassName: string;
    /** Class the placeholder decoration carries. */
    placeholderClassName: string;
    onDocChange: (doc: RteDocumentOf) => void;
    onBlur: (doc: RteDocumentOf) => void;
};

export const useEditorHandle = ({
    plugins,
    value,
    readOnly,
    placeholder,
    contentClassName,
    placeholderClassName,
    onDocChange,
    onBlur,
}: UseEditorHandleOptions): {
    /** Where the editable element is mounted. */
    containerRef: MutableRefObject<HTMLDivElement | null>;
    /** Null until the editor exists, i.e. for the first render only. */
    handle: EditorHandle | null;
} => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    // Read through refs so a changed callback never re-creates the editor.
    const onDocChangeRef = useRef(onDocChange);
    onDocChangeRef.current = onDocChange;
    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;
    // The editor is created once per plugin set, so these are only its starting
    // values; the effects below carry every later change.
    const initialRef = useRef({ readOnly, placeholder });

    // The toolbar reads its state off the editor, so a state change has to
    // re-render the component.
    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const handle = createEditor({
            container,
            initialDoc: value ?? emptyDocument(),
            plugins,
            readOnly: initialRef.current.readOnly,
            placeholder: initialRef.current.placeholder,
            contentClassName,
            placeholderClassName,
            probe: reactRenderProbe,
            onDocChange: (doc) => onDocChangeRef.current(doc),
            onStateChange: force,
            onBlur: (doc) => onBlurRef.current(doc),
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

    // Externally-driven doc updates.
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

    return { containerRef, handle: handleRef.current };
};
