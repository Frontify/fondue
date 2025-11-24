/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Text } from '../Text';

const TEXT_TEST_ID = 'test-text';
const SAMPLE_TEXT = 'The fox jumps over the lazy dog';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Text data-test-id={TEXT_TEST_ID}>{SAMPLE_TEXT}</Text>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(SAMPLE_TEXT);
});

test('should render text as span by default', async ({ mount }) => {
    const component = (await mount(<Text data-test-id={TEXT_TEST_ID}>{SAMPLE_TEXT}</Text>)).getByTestId(TEXT_TEST_ID);
    await expect(component).toHaveJSProperty('nodeName', 'SPAN');
});

test('should render text as specified element', async ({ mount }) => {
    const component = (
        await mount(
            <Text as="p" data-test-id={TEXT_TEST_ID}>
                {SAMPLE_TEXT}
            </Text>,
        )
    ).getByTestId(TEXT_TEST_ID);
    await expect(component).toHaveJSProperty('nodeName', 'P');
});
