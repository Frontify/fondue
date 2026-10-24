/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { mentionsEditor } from './editor';
import { mentions } from './feature';
import { mentionReader } from './reader';

/** Mentions of host resources from a trigger suggestion list or the toolbar search dialog. */
export const mentionsPlugin = definePlugin({ feature: mentions, editor: mentionsEditor, reader: mentionReader });
