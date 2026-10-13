/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect, useRef, useState } from 'react';

import { type RteDocumentOf, type RtePlugin } from '#/core';
import { mountDocument } from '#/editor/engines/prosemirror';
import { type EditorHandle, type MountedDocument } from '#/editor/port';

/**
 * Owns the live editor: mounts it once per plugin set, carries later prop
 * changes into it, and tells whoever subscribed whenever the editor state
 * moves. The only file outside `engines/prosemirror/` that imports that
 * adapter.
 *
 * The editor state is NOT React state. Every transaction — every keystroke,
 * every caret move — goes to the subscribers of `editorState`, and only they
 * re-render: the toolbar reads the selection off it, the floating bar the box
 * around it. The component holding the editor does not, so typing does not
 * re-render everything beneath it.
 *
 * Readonly display does not go through here — `RichTextEditor` renders
 * `RichTextRenderer` instead, so ProseMirror is never imported on that path
 * beyond this module's static import. (A second engine is a new folder plus
 * changing the import below.)
 */

/**
 * The editor state as an external store, in the shape `useSyncExternalStore`
 * takes. The snapshot is a counter bumped on every state change: something
 * cheap and stable to compare, from which a subscriber reads what it actually
 * needs off the handle.
 */
export type EditorStateStore = {
    subscribe: (onChange: () => void) => () => void;
    /** Bumped on every editor state change. */
    getVersion: () => number;
};

const createEditorStateStore = (): EditorStateStore & { notify: () => void } => {
    const listeners = new Set<() => void>();
    let version = 0;
    return {
        subscribe: (onChange) => {
            listeners.add(onChange);
            return () => {
                listeners.delete(onChange);
            };
        },
        getVersion: () => version,
        notify: () => {
            version++;
            for (const listener of listeners) {
                listener();
            }
        },
    };
};

/**
 * Two plugins under one id share a toolbar key and a remount key, so one of
 * them silently stands in for the other. Worth a word in development; in
 * production the check is not even compiled in.
 */
const warnOnDuplicateIds = (plugins: RtePlugin[]): void => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    const seen = new Set<string>();
    for (const { id } of plugins) {
        if (seen.has(id)) {
            console.warn(
                `[RichTextEditor] Two plugins share the id "${id}". Plugin ids must be unique: the editor keys its ` +
                    'toolbar and decides when to rebuild itself by them.',
            );
        }
        seen.add(id);
    }
};

type UseEditorHandleOptions = {
    plugins: RtePlugin[];
    /** The document as it currently stands — what a (re)mount starts from. */
    document: RteDocumentOf;
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
    document,
    placeholder,
    contentClassName,
    placeholderClassName,
    onDocChange,
    onBlur,
    enabled,
}: UseEditorHandleOptions): {
    containerRef: MutableRefObject<HTMLDivElement | null>;
    /** The live editor, or null until it has mounted (and while readonly). */
    handle: EditorHandle | null;
    /** Subscribe here to re-render with the editor state. */
    editorState: EditorStateStore;
} => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mountedRef = useRef<MountedDocument | null>(null);
    // State rather than a ref: a new handle is a new editor, which everything
    // holding the old one has to hear about.
    const [handle, setHandle] = useState<EditorHandle | null>(null);
    const [store] = useState(createEditorStateStore);
    const onDocChangeRef = useRef(onDocChange);
    onDocChangeRef.current = onDocChange;
    const onBlurRef = useRef(onBlur);
    onBlurRef.current = onBlur;
    // Read at mount, which also happens after readonly is turned off or the
    // plugins change — so it has to be the latest, not the first.
    const latestRef = useRef({ document, placeholder });
    latestRef.current = { document, placeholder };

    const pluginsKey = plugins.map((plugin) => plugin.id).join('|');

    useEffect(() => {
        warnOnDuplicateIds(plugins);
        // Intentional: the ids are what is checked, and they are the key.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey]);

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
            initialDoc: latestRef.current.document,
            plugins,
            readOnly: false,
            placeholder: latestRef.current.placeholder,
            contentClassName,
            placeholderClassName,
            onDocChange: (doc) => onDocChangeRef.current(doc),
            onStateChange: store.notify,
            onBlur: (doc) => onBlurRef.current(doc),
        });
        mountedRef.current = mounted;
        setHandle(mounted.handle);

        return () => {
            mounted.destroy();
            mountedRef.current = null;
            setHandle(null);
        };
        // Intentional: re-mount only when the plugin set changes or editing is
        // turned on.
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [pluginsKey, enabled]);

    useEffect(() => {
        mountedRef.current?.setDoc(document);
    }, [document]);

    useEffect(() => {
        mountedRef.current?.setPlaceholder(placeholder);
    }, [placeholder]);

    return { containerRef, handle, editorState: store };
};
