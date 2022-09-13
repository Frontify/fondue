/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LinkPlugin, createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';

const isUrlOrPath = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
};

export const createLinkPlugin = createPluginFactory<LinkPlugin>({
    ...createPlateLinkPlugin(),
    renderAfterEditable: CustomFloatingLink,
    options: {
        isUrl: isUrlOrPath,
    },
});
