/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { linksEditor } from './editor';
import { links } from './feature';
import { linkReader } from './reader';

/** Links: a popover and a bubble to set, edit, copy and remove them, and autolinks of typed URLs. */
export const linksPlugin = definePlugin({ feature: links, editor: linksEditor, reader: linkReader });
