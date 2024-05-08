/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tooltip } from '../Tooltip';

const TOOLTIP_TRIGGER_TEST_ID = 'fondue-tooltip-trigger';
const TOOLTIP_CONTENT_TEST_ID = 'fondue-tooltip-content';
const TOOLTIP_TEXT = 'sample tooltip';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id={TOOLTIP_TRIGGER_TEST_ID}>Hover over me!</Tooltip.Trigger>
            <Tooltip.Content
                data-test-id={TOOLTIP_CONTENT_TEST_ID}
                padding="spacious"
                side="top"
                ignoreCollisions={false}
                maxWidth="200px"
            >
                {TOOLTIP_TEXT}
            </Tooltip.Content>
        </Tooltip.Root>,
    );
    await expect(component).toBeVisible();
});
