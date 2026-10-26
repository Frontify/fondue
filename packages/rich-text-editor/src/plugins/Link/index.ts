/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { linksEditor } from './editor';
import { link } from './feature';
import { linkReader } from './reader';

/** Links: a popover and a bubble to set, edit, copy and remove them, and autolinks of typed URLs. */
export const linkPlugin = definePlugin({ feature: link, editor: linksEditor, reader: linkReader });
