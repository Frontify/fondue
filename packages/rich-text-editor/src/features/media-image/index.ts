/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { mediaImageEditor } from './editor';
import { mediaImage } from './feature';
import { imageReader } from './reader';

/** Images from the host asset picker or a file, with alternative text, size and side, and paste and drop uploads. */
export const mediaImagePlugin = definePlugin({ feature: mediaImage, editor: mediaImageEditor, reader: imageReader });
