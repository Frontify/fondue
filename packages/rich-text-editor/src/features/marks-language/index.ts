/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { languageEditor } from './editor';
import { language } from './feature';

/** A passage's language and direction, set from a toolbar dialog. */
export const languagePlugin = definePlugin({ feature: language, editor: languageEditor });
