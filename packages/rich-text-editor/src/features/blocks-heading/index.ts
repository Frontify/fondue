/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { headingEditor } from './editor';
import { heading } from './feature';

/** Headings 1 to 6, from Mod+Alt+1 to 6, `#` at a line start, or the toolbar. */
export const headingPlugin = definePlugin({ feature: heading, editor: headingEditor });
