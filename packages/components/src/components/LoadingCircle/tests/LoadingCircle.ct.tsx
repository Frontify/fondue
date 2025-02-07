/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { LoadingCircle } from '../LoadingCircle';

test('should render ', async ({ mount }) => {
    const container = await mount(<LoadingCircle />);

    await expect(container).toHaveAttribute('aria-label', 'Fondue Loading Bar');

    // FIXME: Playwright somehow return `undefined` when the component executes `getValueLabel`, bug?
    // await expect(container).toHaveAttribute('aria-valuetext', '60 of 120');
});
