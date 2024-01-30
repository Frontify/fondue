/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { isFragment } from 'react-is';

type EnrichedProps = {
    parentId: string;
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
 * @returns {ReactElement[]} Array with the three child elements from the example, each with the `parentId` and `level` props added.
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

export const recursivelyRemoveFragmentsAndEnrichChildren = (
    children?: ReactNode,
    enrichedProps?: EnrichedProps,
): ReactElement[] => {
    if (!children) {
        return [];
    }

    const enriched = removeFragmentsAndEnrichChildren(children, enrichedProps);

    return enriched.map((child: ReactElement) => {
        const newEnriched = {
            ...child,
            props: {
                ...child.props,
                children: recursivelyRemoveFragmentsAndEnrichChildren(child.props.children, {
                    parentId: child.props.id,
                    level: child.props.level + 1,
                }),
            },
        };

        return newEnriched;
    });
};
