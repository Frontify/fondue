/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Component, memo, type ReactNode, useMemo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { type JsonObject } from '#/model';

import { useClientLayoutEffect } from './client-layout-effect';
import { type NodeViewContext, NodeViewStateContext } from './define';
import { type ReactWork, ReactWorkContext } from './dev-checks';
import { type PortalEntry, type PortalStore } from './portals';

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

/** Replaces only the chrome that threw with a localized message, while `contentDOM` and editing go on (SPEC-rich-text-react/AC-021). */
class ChromeBoundary extends Component<BoundaryProps, BoundaryState> {
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

// An entry keeps its object until its node view publishes, so the other chrome skips each rerender.
const Chrome = memo(({ entry, context }: { readonly entry: PortalEntry; readonly context: NodeViewContext }) => {
    const { component: View, slot } = entry;
    const state = useMemo(() => ({ ...entry.state, context }), [entry.state, context]);
    return createPortal(
        <NodeViewStateContext.Provider value={state}>
            <ChromeBoundary message={context.t('RichTextEditor_nodeViewError')} attrs={state.attrs}>
                <View />
            </ChromeBoundary>
        </NodeViewStateContext.Provider>,
        slot,
    );
});
Chrome.displayName = 'RichTextEditor.NodeViewChrome';

/**
 * Renders the chrome of every node view of one editor from its portal store. `useSyncExternalStore` renders a store
 * change in a microtask with no `flushSync`, so chrome exists before the next paint (SPEC-rich-text-react/AC-007, AC-013).
 * A new `context` from the host's presentation or locale reaches every chrome with no view rebuild (SPEC-rich-text-react/AC-065).
 */
export const PortalHost = ({
    store,
    context,
    onFlush,
}: {
    readonly store: PortalStore;
    readonly context: NodeViewContext;
    readonly onFlush: () => void;
}) => {
    const entries = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    useClientLayoutEffect(onFlush, [entries, onFlush]);
    return (
        <>
            {entries.map((entry) => (
                <Chrome key={entry.key} entry={entry} context={context} />
            ))}
        </>
    );
};
PortalHost.displayName = 'RichTextEditor.PortalHost';
