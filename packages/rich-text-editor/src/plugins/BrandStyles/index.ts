/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { brandEditor } from './editor';
import { brandStyles } from './feature';

/** Brand styles on paragraphs, headings and quotes, chosen from the text style picker. */
export const brandStylesPlugin = definePlugin({ feature: brandStyles, editor: brandEditor });
