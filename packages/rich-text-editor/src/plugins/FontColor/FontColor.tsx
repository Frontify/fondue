/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/core';

import { ColorFlyout } from './components/ColorFlyout';
import { fontColorContent } from './content';

/** Text colour as a mark, picked from a flyout in the toolbar. */
export const fontColorPlugin = definePlugin({
    id: 'font-color',
    content: fontColorContent,
    toolbar: [{ render: ColorFlyout }],
});
