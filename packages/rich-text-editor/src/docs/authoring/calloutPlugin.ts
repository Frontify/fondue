/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/entries/authoring';

import { calloutEditor } from './calloutEditor';
import { callout } from './calloutFeature';

/** The plugin of the host block, as the `index.ts` of its folder builds it. */
export const calloutPlugin = definePlugin({ feature: callout, editor: calloutEditor });
