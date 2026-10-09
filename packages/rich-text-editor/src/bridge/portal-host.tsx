/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Component, memo, type ReactNode, useLayoutEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { type JsonObject } from '#/model';

import { NodeViewStateContext } from './define';
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
    state: BoundaryState = { failed: false, attrs: this.props.attrs };

    static getDerivedStateFromError() {
        return { failed: true };
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
const Chrome = memo(({ entry }: { readonly entry: PortalEntry }) => {
    const { component: View, slot, state } = entry;
    return createPortal(
        <NodeViewStateContext.Provider value={state}>
            <ChromeBoundary message={state.context.t('RichTextEditor_nodeViewError')} attrs={state.attrs}>
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
 */
export const PortalHost = ({ store, onFlush }: { readonly store: PortalStore; readonly onFlush: () => void }) => {
    const entries = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
    useLayoutEffect(onFlush, [entries, onFlush]);
    return (
        <>
            {entries.map((entry) => (
                <Chrome key={entry.key} entry={entry} />
            ))}
        </>
    );
};
PortalHost.displayName = 'RichTextEditor.PortalHost';
