/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToggleMarkPlugin, createBoldPlugin as createPlateBoldPlugin, createPluginFactory } from '@udecode/plate';
import { BOLD_CLASSES } from './BoldMarkupElement';

export const createBoldPlugin = createPluginFactory<ToggleMarkPlugin>({
    ...createPlateBoldPlugin(),
    deserializeHtml: {
        ...createPlateBoldPlugin().deserializeHtml,
        rules: [
            ...(createPlateBoldPlugin().deserializeHtml?.rules ?? []),
            { validNodeName: ['SPAN'], validClassName: BOLD_CLASSES },
        ],
    },
});
