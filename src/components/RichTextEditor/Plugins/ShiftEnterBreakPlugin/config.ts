/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ExitBreakPlugin, PlatePlugin } from '@udecode/plate';

export const exitBreakPluginConfig: Partial<PlatePlugin<ExitBreakPlugin>> = {
    options: {
        rules: [
            {
                hotkey: 'shift+enter',
            },
            {
                hotkey: 'mod+enter',
                level: 1,
                before: false,
            },
        ],
    },
};
