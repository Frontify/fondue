/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { contentChecksEditor } from './editor';
import { contentChecks } from './feature';

/** Accessibility checks of the content: an issues panel the toolbar opens, which marks what it finds while open. */
export const contentChecksPlugin = definePlugin({ feature: contentChecks, editor: contentChecksEditor });
