/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LinkPlugin, createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';

export const createLinkPlugin = createPluginFactory<LinkPlugin>({
    ...createPlateLinkPlugin(),
    renderAfterEditable: CustomFloatingLink,
    options: {
        isUrl: () => true,
    },
});
