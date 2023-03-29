/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UniqueIdentifier } from '@dnd-kit/core';
import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { isFragment } from 'react-is';

type EnrichedProps = {
    parentId: UniqueIdentifier;
    level: number;
};

/**
 * Recursively removes React Fragments and enriches the remaining child elements passed in with additional properties.
 *
 * @param children The child elements to remove React Fragments from and enrich.
 * @param enrichedProps Additional properties to add to each child element.
 * @returns An array of ReactElements with enriched props.
 *
 * @example
 *
 * const children = (
 *   <>
 *     <Child1 />
 *     <Child2 />
 *     <Child3 />
 *   </>
 * );
 *
 * const enrichedProps = {
 *   parentId: '12345',
 *   level: 2,
 * };
 *
 * const flattenedAndEnriched = flattenAndEnrichChildren(children, enrichedProps);
 *
 * // Output: An array of ReactElements with the three child elements from the example, each with the `parentId` and `level` props added.
 */
export const removeFragmentsAndEnrichChildren = (children?: ReactNode, enrichedProps?: EnrichedProps) => {
    const result: ReactElement[] = [];

    Children.forEach(children, (child) => {
        if (isFragment(child)) {
            result.push(...removeFragmentsAndEnrichChildren(child.props.children, enrichedProps));
        } else {
            isValidElement(child) && result.push(cloneElement(child, { ...(child.props ?? {}), ...enrichedProps }));
        }
    });

    return result.filter(Boolean);
};
