/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { mediaUploadEditor } from './editor';
import { mediaUpload } from './feature';

/** Cancel and Retry of an image upload, and the upload slot behind images. */
export const mediaUploadPlugin = definePlugin({ feature: mediaUpload, editor: mediaUploadEditor });
