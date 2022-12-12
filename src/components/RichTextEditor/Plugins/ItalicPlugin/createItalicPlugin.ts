/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToggleMarkPlugin, createItalicPlugin as createPlateItalicPlugin, createPluginFactory } from '@udecode/plate';
import { ITALIC_CLASSES } from './ItalicMarkupElement';

const plateItalicPlugin = createPlateItalicPlugin();

export const createItalicPlugin = createPluginFactory<ToggleMarkPlugin>({
    ...plateItalicPlugin,
    deserializeHtml: {
        ...plateItalicPlugin.deserializeHtml,
        rules: [
            ...(plateItalicPlugin.deserializeHtml?.rules ?? []),
            { validNodeName: ['SPAN'], validClassName: ITALIC_CLASSES },
        ],
    },
});
