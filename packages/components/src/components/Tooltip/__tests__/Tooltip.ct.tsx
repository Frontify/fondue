/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tooltip } from '../Tooltip';

const TOOLTIP_TEST_ID = 'test-tooltip';
const TOOLTIP_TEXT = 'sample tooltip';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Tooltip data-test-id={TOOLTIP_TEST_ID}>{TOOLTIP_TEXT}</Tooltip>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(TOOLTIP_TEXT);
});
