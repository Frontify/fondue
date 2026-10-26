/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { coreEditor } from './editor';
import { core } from './feature';

/** The document, paragraphs, text and hard breaks, with undo, redo and block moves. */
export const corePlugin = definePlugin({ feature: core, editor: coreEditor });
