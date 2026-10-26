/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { mediaUploadEditor } from './editor';
import { upload } from './feature';

/** Cancel and Retry of an image upload, and the upload slot behind images. */
export const uploadPlugin = definePlugin({ feature: upload, editor: mediaUploadEditor });
