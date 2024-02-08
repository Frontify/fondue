/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as Figma from 'figma-api';

import { FIGMA_ICON_FILE_ID, FIGMA_ICON_FRAME_ID, FIGMA_ACCESS_TOKEN } from './config';
import { downloadIcons } from './figma/downloadIcons';
import { getNewIconsFromFigma } from './figma/getNewIconsFromFigma';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    if (!FIGMA_ACCESS_TOKEN) {
        console.error('No Figma access token provided, exit the build now.');
        return;
    }

    const api = new Figma.Api({
        personalAccessToken: FIGMA_ACCESS_TOKEN,
    });

    const icons = await getNewIconsFromFigma({
        api,
        fileId: FIGMA_ICON_FILE_ID,
        frameId: FIGMA_ICON_FRAME_ID,
    });

    if (Object.keys(icons).length === 0) {
        console.log('No changes to the Figma icons detected, exit the build now.');
        return;
    }

    await downloadIcons(api, icons);
})();
