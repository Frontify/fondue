/* (c) Copyright Frontify Ltd., all rights reserved. */

import type * as Figma from 'figma-api';

/**
 * Takes any array of Figma SceneNodes and returns a flat array of all
 * the ComponentSetNodes containted within.
 *
 * Note that it is returning the full document node, which
 * contains all children, styles etc.
 */
export const getComponentSetNodes = (
    sceneNodes: Figma.Node<keyof Figma.NodeTypes>[],
): Figma.Node<keyof Figma.NodeTypes>[] => {
    const matches: Figma.Node<keyof Figma.NodeTypes>[] = [];

    if (!Array.isArray(sceneNodes)) {
        return matches;
    }

    for (const node of sceneNodes) {
        if (node.type === 'COMPONENT_SET') {
            matches.push(node);
        } else if ('children' in node && node.children) {
            const results = getComponentSetNodes(node.children);
            if (results.length > 0) {
                matches.push(...results);
            }
        }
    }

    return matches;
};

/**
 * Takes a component, and returns an array of key-value pairs
 * extracted from its name
 */
export const getComponentProperties = (component: Figma.Node<keyof Figma.NodeTypes>) => {
    const pairs = component.name.split(',');
    const properties: { key: string; value: string }[] = [];

    for (const pair of pairs) {
        const key = pair.split('=')[0]?.trim();
        const value = pair.split('=')[1]?.trim();

        if (key && value) {
            properties.push({ key, value });
        }
    }

    return properties;
};
