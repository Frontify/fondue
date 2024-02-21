/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, mkdirSync } from 'node:fs';

import chunk from 'lodash/fp/chunk';

import { FIGMA_ICON_FILE_ID, ICONS_DIRECTORY } from '../config';
import { downloadFile } from '../utilities/downloadFile';
import { optimizeSvg } from '../utilities/svg';

import type * as Figma from 'figma-api';

export const downloadIcons = async (
    api: Figma.Api,
    icons: Record<string, { name: string; fileName: string; imageUrl: null }>,
) => {
    const ids = Object.keys(icons);
    const chunks = chunk(500, ids);
    const images: Record<string, string> = {};

    for (const chunk of chunks) {
        const imagesResponse = await api.getImage(FIGMA_ICON_FILE_ID, {
            ids: chunk.join(','),
            format: 'svg',
            scale: 1,
        });

        for (const key in imagesResponse.images) {
            // @ts-expect-error untyped
            images[key] = imagesResponse.images[key];
        }
    }

    for (const key in icons) {
        const directory = `${ICONS_DIRECTORY}/${icons[key]?.name}`;
        const iconPath = `${directory}/${icons[key]?.fileName}`;

        if (!existsSync(directory)) {
            mkdirSync(directory);
        }

        console.log(`Downloading "${icons[key]?.fileName}" from "${images[key]}"...`);

        const imageUrl = images[key];
        if (typeof imageUrl !== 'string') {
            console.error(`No image URL found for ${icons[key]?.fileName}`);
            return;
        }

        await downloadFile(imageUrl, iconPath);

        optimizeSvg(iconPath);
    }
};
