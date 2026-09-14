/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * A lazy-loaded multi-select tree: the top level loads on mount, folders load their children
 * when first expanded, a folder checked while collapsed carries that decision over to its
 * children once they arrive, and folders the server reports as partially selected load
 * eagerly so their mixed state is backed by real rows. Consumers supply the data
 * (`loadChildren`) and the row parts (`renderIcon`, `renderDecorator`, `renderAction`).
 *
 * `Tree.Root` collects its rows by parsing the JSX *before* rendering, so a row cannot be a
 * React component with its own hooks — it would never render. Every row is instead a node
 * closure that owns its state (children, load status, expansion, selection), loads itself
 * when needed, cascades to its own children and renders its own `<Tree.Folder>` /
 * `<Tree.Item>`. Nothing is computed at the root: it only subscribes to a change tick.
 *
 * - `types.ts` — the public props and the node interfaces
 * - `createFolderNode.tsx` / `createItemNode.tsx` — the node closures
 * - `useLazyTree.ts` — top-level ownership and the re-render subscription
 */

import { Tree } from '../Tree';

import { type LazyLoadedMultiSelectProps } from './types';
import { useLazyTree } from './useLazyTree';

export type { LazyLoadedMultiSelectProps, LazyTreeNode } from './types';

export const LazyLoadedMultiSelect = ({
    loadChildren,
    onSelectChange,
    onLoadError,
    renderIcon,
    renderDecorator,
    renderAction,
    ...rootProps
}: LazyLoadedMultiSelectProps) => {
    const root = useLazyTree({ loadChildren, onSelectChange, onLoadError });
    return (
        <Tree.Root {...rootProps} multiSelect>
            {root.render({ renderIcon, renderDecorator, renderAction })}
        </Tree.Root>
    );
};
LazyLoadedMultiSelect.displayName = 'LazyLoadedMultiSelect';
