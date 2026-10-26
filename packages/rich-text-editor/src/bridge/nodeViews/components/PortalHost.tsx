/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { memo, Suspense, useMemo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { type EditorPort, mediaOf } from '#/runtime/port';

import { type NodePending, type NodeViewContext } from '../../pluginApi/define';
import { useClientLayoutEffect } from '../../session/hooks/useClientLayoutEffect';
import { useSessionValue } from '../../session/hooks/useSessionValue';
import { NodeViewContentContext } from '../helpers/nodeViewContentContext';
import { NodeViewStateContext } from '../helpers/nodeViewStateContext';
import { type PortalEntry, type PortalStore } from '../helpers/portals';

import { ChromeBoundary } from './ChromeBoundary';

/** The upload of node `nodeId`, as its chrome reads it. */
const pendingOf = (runtime: EditorPort | undefined, nodeId: string | null): NodePending | null => {
    if (runtime === undefined || nodeId === null) {
        return null;
    }

    const status = mediaOf(runtime)?.uploads.statusOf(nodeId);
    if (status === undefined) {
        return null;
    }

    const running = status.state === 'queued' || status.state === 'running';

    return { kind: 'upload', state: running ? 'running' : 'failed', progress: status.progress };
};

const samePending = (a: NodePending | null, b: NodePending | null) =>
    a === b || (a !== null && b !== null && a.state === b.state && a.progress === b.progress);

// An entry keeps its object until its node view publishes, so the other chrome skips each rerender.
const Chrome = memo(({ entry, context, lang }: { entry: PortalEntry; context: NodeViewContext; lang: string }) => {
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
});
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
    store: PortalStore;
    context: NodeViewContext;
    /** The language of the chrome's strings, which each slot takes over the surface's. */
    lang: string;
    onFlush: () => void;
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

PortalHost.displayName = 'PortalHost';
