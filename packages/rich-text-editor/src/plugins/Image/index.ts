/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { mediaImageEditor } from './editor';
import { image } from './feature';
import { imageReader } from './reader';

/** Images from the host asset picker or a file, with alternative text, size and side, and paste and drop uploads. */
export const imagePlugin = definePlugin({ feature: image, editor: mediaImageEditor, reader: imageReader });
