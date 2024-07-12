/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Slider } from '../Slider';

const SLIDER_TEST_ID = 'test-slider';
const SLIDER_TEXT = 'sample slider';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Slider data-test-id={SLIDER_TEST_ID}>{SLIDER_TEXT}</Slider>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(SLIDER_TEXT);
});
