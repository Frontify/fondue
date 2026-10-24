/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { codeBlockEditor } from './editor';
import { codeBlock } from './feature';

/** Code blocks with a language and syntax highlighting. */
export const codeBlockPlugin = definePlugin({ feature: codeBlock, editor: codeBlockEditor });
