/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect, useLayoutEffect, useReducer, useRef } from 'react';

import { mountDocument } from '#/adapters/prosemirror';
import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { emptyDocument, type RteDocumentOf, type RtePlugin } from '#/domain';
import { type EditorHandle, type MountedDocument } from '#/ports';

/**
 * Owns the document on screen and nothing else: mounts it once per plugin set,
 * carries later prop changes into it, and re-renders the component whenever the
 * editor state moves — the toolbar and the panels read their state straight off
 * the handle.
 *
 * The only place that chooses the implementations behind the ports — the engine
 * and the render probe. Everything else in the shell goes through the
 * `MountedDocument` and the `EditorHandle` this returns.
 *
 * Loading is deliberately NOT here. A mounted document shows itself at once and
 * sends for the editing half of the engine when something is going to be edited,
 * which is the engine's own business: it is the thing that knows which of its
 * parts are expensive. All that reaches this file is the consequence — a handle
 * that is null for a while, and stays null for a readonly editor.
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
    /** Where the document is mounted. */
    containerRef: MutableRefObject<HTMLDivElement | null>;
    /** Null while the document is only being shown: before the editing half arrives, and always when readonly. */
    handle: EditorHandle | null;
} => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mountedRef = useRef<MountedDocument | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    // Read through refs so a changed callback never re-mounts the document.
    const onDocChangeRef = useRef(onDocChange);
    onDocChangeRef.current = onDocChange;
    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;
    // The document is mounted once per plugin set, so these are only its
    // starting values; the effects below carry every later change.
    const initialRef = useRef({ readOnly, placeholder, value });

    // The toolbar reads its state off the editor, so a state change has to
    // re-render the component.
    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    /**
     * A layout effect, and deliberately: the handle arriving re-renders the
     * component, and doing that before the browser paints is what keeps the
     * editable element from appearing a frame after the drawn document went.
     */
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const mounted = mountDocument({
            container,
            initialDoc: initialRef.current.value ?? emptyDocument(),
            plugins,
            readOnly: initialRef.current.readOnly,
            placeholder: initialRef.current.placeholder,
            contentClassName,
            placeholderClassName,
            probe: reactRenderProbe,
            onDocChange: (doc) => onDocChangeRef.current(doc),
            onStateChange: force,
            onBlur: (doc) => onBlurRef.current(doc),
            onEditable: (handle) => {
                handleRef.current = handle;
                force();
            },
        });
        mountedRef.current = mounted;
        force();

        return () => {
            mounted.destroy();
            mountedRef.current = null;
            handleRef.current = null;
        };
        // Intentional: re-mount only when the plugin set changes.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey]);

    // Externally-driven updates. Each is one call whether the document is being
    // shown or edited — which of those it is belongs to the engine.
    useEffect(() => {
        if (value) {
            mountedRef.current?.setDoc(value);
        }
    }, [value]);

    useEffect(() => {
        mountedRef.current?.setReadOnly(readOnly);
    }, [readOnly]);

    useEffect(() => {
        mountedRef.current?.setPlaceholder(placeholder);
    }, [placeholder]);

    return { containerRef, handle: handleRef.current };
};
