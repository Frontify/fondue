/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect, useReducer, useRef } from 'react';

import { emptyDocument, type RteDocumentOf, type RtePlugin } from '#/core';
import { mountDocument } from '#/editor/engines/prosemirror';
import { type EditorHandle, type MountedDocument } from '#/editor/port';

/**
 * Owns the live editor: mounts it once per plugin set, carries later prop
 * changes into it, and re-renders the component whenever the editor state
 * moves. The only file outside `engines/prosemirror/` that imports that adapter.
 *
 * Readonly display does not go through here — `RichTextEditor` renders
 * `RichTextRenderer` instead, so ProseMirror is never imported on that path
 * beyond this module's static import. (A second engine is a new folder plus
 * changing the import below.)
 */

type UseEditorHandleOptions = {
    plugins: RtePlugin[];
    value: RteDocumentOf | undefined;
    placeholder: string;
    contentClassName: string;
    placeholderClassName: string;
    onDocChange: (doc: RteDocumentOf) => void;
    onBlur: (doc: RteDocumentOf) => void;
    /** When false, nothing is mounted — the shell is showing the renderer. */
    enabled: boolean;
};

export const useEditorHandle = ({
    plugins,
    value,
    placeholder,
    contentClassName,
    placeholderClassName,
    onDocChange,
    onBlur,
    enabled,
}: UseEditorHandleOptions): {
    containerRef: MutableRefObject<HTMLDivElement | null>;
    handle: EditorHandle | null;
} => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mountedRef = useRef<MountedDocument | null>(null);
    const handleRef = useRef<EditorHandle | null>(null);
    const onDocChangeRef = useRef(onDocChange);
    onDocChangeRef.current = onDocChange;
    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;
    const initialRef = useRef({ placeholder, value });

    const [, force] = useReducer((count: number) => count + 1, 0);

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    useEffect(() => {
        if (!enabled) {
            return;
        }
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const mounted = mountDocument({
            container,
            initialDoc: initialRef.current.value ?? emptyDocument(),
            plugins,
            readOnly: false,
            placeholder: initialRef.current.placeholder,
            contentClassName,
            placeholderClassName,
            onDocChange: (doc) => onDocChangeRef.current(doc),
            onStateChange: force,
            onBlur: (doc) => onBlurRef.current(doc),
        });
        mountedRef.current = mounted;
        handleRef.current = mounted.handle;
        force();

        return () => {
            mounted.destroy();
            mountedRef.current = null;
            handleRef.current = null;
        };
        // Intentional: re-mount only when the plugin set changes or editing is
        // turned on.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey, enabled]);

    useEffect(() => {
        if (value) {
            mountedRef.current?.setDoc(value);
        }
    }, [value]);

    useEffect(() => {
        mountedRef.current?.setPlaceholder(placeholder);
    }, [placeholder]);

    return { containerRef, handle: handleRef.current };
};
