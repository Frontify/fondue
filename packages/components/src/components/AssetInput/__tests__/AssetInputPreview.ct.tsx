/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { AssetInput } from '../AssetInput';

const ASSET_IMG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const PREVIEW_SLOT_TEST_ID = 'fondue-asset-input-preview-slot';

test('should render a single child without adding placeholder slots', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Preview>
            <AssetInput.PreviewImage src={ASSET_IMG} alt="only" />
        </AssetInput.Preview>,
    );
    await expect(wrapper.getByTestId(PREVIEW_SLOT_TEST_ID)).toHaveCount(1);
    await expect(wrapper.locator('img')).toHaveCount(1);
});

test('should fill up to 4 slots when 2 children are provided', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Preview>
            <AssetInput.PreviewImage src={ASSET_IMG} alt="first" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="second" />
        </AssetInput.Preview>,
    );
    await expect(wrapper.getByTestId(PREVIEW_SLOT_TEST_ID)).toHaveCount(4);
    await expect(wrapper.locator('img')).toHaveCount(2);
});

test('should render exactly 4 children without padding when 4 are provided', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Preview>
            <AssetInput.PreviewImage src={ASSET_IMG} alt="first" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="second" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="third" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="fourth" />
        </AssetInput.Preview>,
    );
    await expect(wrapper.getByTestId(PREVIEW_SLOT_TEST_ID)).toHaveCount(4);
    await expect(wrapper.locator('img')).toHaveCount(4);
});

test('should truncate to 4 children when more than 4 are provided', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Preview>
            <AssetInput.PreviewImage src={ASSET_IMG} alt="first" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="second" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="third" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="fourth" />
            <AssetInput.PreviewImage src={ASSET_IMG} alt="fifth" />
        </AssetInput.Preview>,
    );
    await expect(wrapper.getByTestId(PREVIEW_SLOT_TEST_ID)).toHaveCount(4);
    await expect(wrapper.locator('img')).toHaveCount(4);
    await expect(wrapper.locator('img[alt="fifth"]')).toHaveCount(0);
});
