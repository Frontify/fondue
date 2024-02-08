/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync } from 'node:fs';

import * as Figma from 'figma-api';
import kebabCase from 'lodash/fp/kebabCase';

import {
    FIGMA_SIZE_PROPERTY_NAME,
    FIGMA_FILLED_PROPERTY_NAME,
    FIGMA_ICON_FRAME_ID,
    ICONS_DIRECTORY,
    FIGMA_ICON_LAYER_NAME,
} from '../config';
import { didComponentChange, saveSnapshot } from '../utilities/snapshot';

import { getComponentProperties, getComponentSetNodes } from './document';

const getVariantName = (componentNode: Figma.Node<keyof Figma.NodeTypes>) => {
    const properties = getComponentProperties(componentNode);

    let size = '';
    let filled = '';

    for (const property of properties) {
        if (property.key.toUpperCase() === FIGMA_SIZE_PROPERTY_NAME.toUpperCase()) {
            size = property.value;
        }
        if (
            property.key.toUpperCase() === FIGMA_FILLED_PROPERTY_NAME.toUpperCase() &&
            property.value.toUpperCase() === 'TRUE'
        ) {
            filled = '-filled';
        }
    }
    return `${size}${filled}`;
};

export const getNewIconsFromFigma = async ({
    api,
    fileId,
    frameId,
}: {
    api: Figma.Api;
    fileId: string;
    frameId: string;
}) => {
    const icons: Record<string, { name: string; fileName: string; imageUrl: null }> = {};

    const file = await api.getFileNodes(fileId, [frameId]);

    const nodes = file.nodes;

    const frame = nodes[FIGMA_ICON_FRAME_ID as unknown as keyof typeof nodes]?.document;

    if (!frame || !Figma.isNodeType(frame, 'FRAME')) {
        throw new Error('The frame was not found in the Figma file or the node type is not a frame.');
    }

    const componentSets = getComponentSetNodes(frame.children);

    for (const componentSet of componentSets) {
        const iconShapeName = kebabCase(componentSet.name.trim());
        const iconDirectory = `${ICONS_DIRECTORY}/${iconShapeName}`;
        const iconShapeHasChanged = didComponentChange(componentSet);

        if ('children' in componentSet) {
            for (const componentNode of componentSet.children) {
                const iconVariantName = getVariantName(componentNode);
                const iconFileName = `${iconShapeName}-${iconVariantName}.svg`;
                const iconFileExists = existsSync(`${iconDirectory}/${iconFileName}`);

                if ('children' in componentNode) {
                    const iconNodeId = componentNode.children.find(
                        (child) => child.name.toUpperCase() === FIGMA_ICON_LAYER_NAME.toUpperCase(),
                    )?.id;

                    if (iconNodeId && (!iconFileExists || iconShapeHasChanged)) {
                        icons[iconNodeId] = {
                            name: iconShapeName,
                            fileName: iconFileName,
                            imageUrl: null,
                        };
                    }
                }
            }
        }
    }

    saveSnapshot(componentSets);

    return icons;
};
