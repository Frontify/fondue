/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ToggleMarkPlugin,
    createUnderlinePlugin as createPlateUnderlinePlugin,
    createPluginFactory,
} from '@udecode/plate';
import { UNDERLINE_CLASSES } from './UnderlineMarkupElement';

const plateUnderlinePlugin = createPlateUnderlinePlugin();

export const createUnderlinePlugin = createPluginFactory<ToggleMarkPlugin>({
    ...plateUnderlinePlugin,
    deserializeHtml: {
        ...plateUnderlinePlugin.deserializeHtml,
        rules: [
            ...(plateUnderlinePlugin.deserializeHtml?.rules ?? []),
            { validNodeName: ['SPAN'], validClassName: UNDERLINE_CLASSES },
        ],
    },
});
