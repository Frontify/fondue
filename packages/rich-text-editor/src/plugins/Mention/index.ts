/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { mentionsEditor } from './editor';
import { mention } from './feature';
import { mentionReader } from './reader';

/** Mentions of host resources from a trigger suggestion list or the toolbar search dialog. */
export const mentionPlugin = definePlugin({ feature: mention, editor: mentionsEditor, reader: mentionReader });
