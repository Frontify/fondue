/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Owns the live editor: mounts it once per plugin set, carries later prop
 * changes into it, and notifies subscribers whenever the editor state moves.
 * The only file outside `engines/prosemirror/` that imports that adapter (a
 * second engine is a new folder plus changing that import).
 *
 * The editor state is NOT React state: every transaction goes to the
 * subscribers of `editorState` and only they re-render (the toolbar reads the
 * selection off it, the floating bar the box around it), so typing does not
 * re-render the component holding the editor.
 *
 * The React a plugin's `render.edit` draws is handed over by the engine as
 * portals and rendered by `viewPortals` from inside the shell's tree.
 */

import {
    createElement,
    type MutableRefObject,
    type ReactNode,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';

import { type PluginRegistry, type RteDocumentOf } from '#/core';
import { mountDocument } from '#/editor/engines/prosemirror';
import { type EditorHandle, type MountedDocument, type ViewPortals } from '#/editor/port';

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
 * The portals the editor's views draw into, as an external store: the engine
 * sets and drops them as views come and go, and one component renders them
 * all. The snapshot is rebuilt only when something changed, so an unchanged
 * portal is the same element and React skips it.
 */
export const createViewPortals = (): ViewPortals & {
    subscribe: (onChange: () => void) => () => void;
    getSnapshot: () => readonly ReactNode[];
} => {
    const portals = new Map<object, ReactNode>();
    const listeners = new Set<() => void>();
    let snapshot: readonly ReactNode[] = [];
    const changed = (): void => {
        snapshot = [...portals.values()];
        for (const listener of listeners) {
            listener();
        }
    };
    return {
        set: (owner, portal) => {
            portals.set(owner, portal);
            changed();
        },
        delete: (owner) => {
            if (portals.delete(owner)) {
                changed();
            }
        },
        subscribe: (onChange) => {
            listeners.add(onChange);
            return () => {
                listeners.delete(onChange);
            };
        },
        getSnapshot: () => snapshot,
    };
};

const NO_PORTALS: readonly ReactNode[] = [];
const noPortals = (): readonly ReactNode[] => NO_PORTALS;

/** Renders every view's portal; one React commit covers all of them. */
export const ViewPortalHost = ({ store }: { store: ReturnType<typeof createViewPortals> }): ReactNode =>
    // No views on the server: the editor only mounts in the browser.
    useSyncExternalStore(store.subscribe, store.getSnapshot, noPortals);

/**
 * Two plugins under one id share a toolbar key and a remount key, so one of
 * them silently stands in for the other. Worth a word in development; in
 * production the check is not even compiled in.
 */
const warnOnDuplicateIds = (duplicateIds: readonly string[]): void => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    for (const id of duplicateIds) {
        console.warn(
            `[RichTextEditor] Two plugins share the id "${id}". Plugin ids must be unique: the editor keys its ` +
                'toolbar and decides when to rebuild itself by them.',
        );
    }
};

type UseEditorHandleOptions = {
    registry: PluginRegistry;
    /** The document as it currently stands — what a (re)mount starts from. */
    document: RteDocumentOf;
    placeholder: string;
    /** Further attributes for the editable element. Memoize them: a new object is applied to the editor. */
    attributes: Readonly<Record<string, string>>;
    placeholderClassName: string;
    onDocChange: (doc: RteDocumentOf) => void;
    onBlur: (doc: RteDocumentOf) => void;
    /** When false, nothing is mounted — the shell is showing the renderer. */
    enabled: boolean;
};

export const useEditorHandle = ({
    registry,
    document,
    placeholder,
    attributes,
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
    /**
     * The React the editor's views draw (a plugin's `render.edit`), as portals
     * into the content. Render it anywhere inside the editor's tree: the views
     * then share its context providers.
     */
    viewPortals: ReactNode;
} => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mountedRef = useRef<MountedDocument | null>(null);
    // State rather than a ref: a new handle is a new editor, which everything
    // holding the old one has to hear about.
    const [handle, setHandle] = useState<EditorHandle | null>(null);
    const [store] = useState(createEditorStateStore);
    const [portals] = useState(createViewPortals);
    const [viewPortals] = useState(() => createElement(ViewPortalHost, { store: portals }));
    // The latest props, read by the mount (which runs only when the plugins
    // change or editing is turned on) and by the callbacks it hands the editor.
    const latestRef = useRef({ document, placeholder, registry, attributes, onDocChange, onBlur });
    latestRef.current = { document, placeholder, registry, attributes, onDocChange, onBlur };

    const pluginsKey = registry.ids.join('|');

    useEffect(() => {
        warnOnDuplicateIds(registry.duplicateIds);
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

        const latest = latestRef.current;
        const mounted = mountDocument({
            container,
            initialDoc: latest.document,
            registry: latest.registry,
            placeholder: latest.placeholder,
            attributes: latest.attributes,
            placeholderClassName,
            onDocChange: (doc) => latestRef.current.onDocChange(doc),
            onStateChange: store.notify,
            onBlur: (doc) => latestRef.current.onBlur(doc),
            viewPortals: portals,
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

    useEffect(() => {
        mountedRef.current?.setAttributes(attributes);
    }, [attributes]);

    return {
        containerRef,
        handle,
        editorState: store,
        viewPortals,
    };
};
