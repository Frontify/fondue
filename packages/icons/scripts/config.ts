/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

export const ICONS_DIRECTORY = resolve('./icons');
export const DATA_DIRECTORY = resolve('./data');
export const SNAPSHOT_FILE_PATH = resolve(ICONS_DIRECTORY, 'snapshot.json');

export const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
export const FIGMA_ICON_FILE_ID = '65fA3Pxqc0USAY9YRoSXDL';
export const FIGMA_ICON_FRAME_ID = '1913:44777';
export const FIGMA_ICON_LAYER_NAME = 'icon';
export const FIGMA_SIZE_PROPERTY_NAME = 'size';
export const FIGMA_FILLED_PROPERTY_NAME = 'filled';
