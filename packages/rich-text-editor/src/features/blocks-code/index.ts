/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/definePlugin';

import { codeBlockEditor } from './editor';
import { codeBlock } from './feature';

/** Code blocks with a language and syntax highlighting. */
export const codeBlockPlugin = definePlugin({ feature: codeBlock, editor: codeBlockEditor });
