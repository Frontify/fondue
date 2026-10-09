/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { ISLAND_BLOCK, ISLAND_INLINE } from '#/model/content';
import { islandText } from '#/model/html-spec';
import { islandLabel } from '#/model/output';

import { useRichTextNodeView } from './define';

/** An opaque island as the reader shows it: a group named by its feature, or generically, with its text (DR-041). */
const IslandFallback = () => {
    const { attrs, context } = useRichTextNodeView();
    let feature: string | null = null;
    if (typeof attrs.feature === 'string') {
        feature = attrs.feature;
    }
    return (
        <span role="group" aria-label={islandLabel(context, feature)} data-rte-island="">
            {islandText(attrs.original)}
        </span>
    );
};

/** The fallback of each island node, which every editor shows without a view of its own (SPEC-rich-text-editing/AC-098). */
export const ISLAND_VIEWS: ReadonlyMap<string, ComponentType<object>> = new Map([
    [ISLAND_BLOCK, IslandFallback],
    [ISLAND_INLINE, IslandFallback],
]);
