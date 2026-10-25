/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { Component, memo, type ReactNode, Suspense, useMemo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { type JsonObject } from '#/model';
import { type EditorPort } from '#/runtime/port';

import { useClientLayoutEffect } from './client-layout-effect';
import { type NodePending, type NodeViewContext, NodeViewStateContext } from './define';
import { type ReactWork, ReactWorkContext } from './dev-checks';
import { NodeViewContentContext } from './node-view-content';
import { type PortalEntry, type PortalStore } from './portals';
import { useSessionValue } from './session';

interface BoundaryProps {
    readonly message: string;
    /** The node's attributes; new ones try the chrome again. */
    readonly attrs: JsonObject;
    readonly children: ReactNode;
}
interface BoundaryState {
    readonly failed: boolean;
    readonly attrs: JsonObject;
}

/** The attributes of a boundary around a toolbar item, which has none to change. */
export const NO_ATTRS = {};

/** Replaces only the chrome that threw with a localized message, while `contentDOM` and editing go on. */
export class ChromeBoundary extends Component<BoundaryProps, BoundaryState> {
    static contextType = ReactWorkContext;
    declare context: ReactWork | undefined;
    state: BoundaryState = { failed: false, attrs: this.props.attrs };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    // The chrome that threw never committed, so its render mark closes here, in the commit that shows the fallback.
    componentDidCatch() {
        if (this.context !== undefined) {
            this.context.rendering = false;
        }
    }

    // Chrome that threw for one attribute value renders again once an update changes the attributes.
    static getDerivedStateFromProps(props: BoundaryProps, state: BoundaryState) {
        if (props.attrs !== state.attrs) {
            return { failed: false, attrs: props.attrs };
        }
        return null;
    }

    render() {
        if (this.state.failed) {
            return <span>{this.props.message}</span>;
        }
        return this.props.children;
    }
}

/** The upload of node `nodeId`, as its chrome reads it. */
const pendingOf = (runtime: EditorPort | undefined, nodeId: string | null): NodePending | null => {
    const status = nodeId === null ? undefined : runtime?.uploads.statusOf(nodeId);
    if (status === undefined) {
        return null;
    }
    const running = status.state === 'queued' || status.state === 'running';
    return { kind: 'upload', state: running ? 'running' : 'failed', progress: status.progress };
};

const samePending = (a: NodePending | null, b: NodePending | null) =>
    a === b || (a !== null && b !== null && a.state === b.state && a.progress === b.progress);

// An entry keeps its object until its node view publishes, so the other chrome skips each rerender.
const Chrome = memo(
    ({
        entry,
        context,
        lang,
    }: {
        readonly entry: PortalEntry;
        readonly context: NodeViewContext;
        readonly lang: string;
    }) => {
        const { component: View, slot, place } = entry;
        const { nodeId } = entry.state;
        const pending = useSessionValue((runtime) => pendingOf(runtime, nodeId), samePending);
        const state = useMemo(() => ({ ...entry.state, context, pending }), [entry.state, context, pending]);
        const { dir } = useFondueTheme();
        // The slot sits in the surface, which takes the document's lang and dir; chrome keeps its strings' and the theme's.
        useClientLayoutEffect(() => {
            slot.dir = dir;
            slot.lang = lang;
        }, [slot, dir, lang]);
        return createPortal(
            <NodeViewStateContext.Provider value={state}>
                <NodeViewContentContext.Provider value={place}>
                    <ChromeBoundary message={context.t('RichTextEditor_nodeViewError')} attrs={state.attrs}>
                        {/* Chrome that loads a dialog lazily suspends here, not as an error, and the surface stays. */}
                        <Suspense fallback={null}>
                            <View />
                        </Suspense>
                    </ChromeBoundary>
                </NodeViewContentContext.Provider>
            </NodeViewStateContext.Provider>,
            slot,
        );
    },
);
Chrome.displayName = 'RichTextEditor.NodeViewChrome';

/**
 * Renders the chrome of every node view of one editor from its portal store. `useSyncExternalStore` renders a store
 * change in a microtask with no `flushSync`, so chrome exists before the next paint.
 * A new `context` from the host's presentation or locale reaches every chrome with no view rebuild.
 */
export const PortalHost = ({
    store,
    context,
    lang,
    onFlush,
}: {
    readonly store: PortalStore;
    readonly context: NodeViewContext;
    /** The language of the chrome's strings, which each slot takes over the surface's. */
    readonly lang: string;
    readonly onFlush: () => void;
}) => {
    const entries = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    useClientLayoutEffect(onFlush, [entries, onFlush]);
    return (
        <>
            {entries.map((entry) => (
                <Chrome key={entry.key} entry={entry} context={context} lang={lang} />
            ))}
        </>
    );
};
PortalHost.displayName = 'RichTextEditor.PortalHost';
