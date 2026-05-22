/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp, IconMusicNote } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Flex } from '../../Flex/Flex';
import { AssetInput } from '../AssetInput';

const ASSET_IMG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const ROOT_TEST_ID = 'fondue-asset-input-root';
const ROTATED_180_MATRIX = 'matrix(-1, 0, 0, -1, 0, 0)';

test('should set data-open when isOpen is true', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen onPress={() => {}}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const root = wrapper.getByTestId(ROOT_TEST_ID);
    await expect(root).toHaveAttribute('data-open', 'true');
});

test('should default to horizontal orientation', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Root onPress={() => {}}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const root = wrapper.getByTestId(ROOT_TEST_ID);
    await expect(root).toHaveAttribute('data-orientation', 'horizontal');
});

test('should call onPress when root is clicked', async ({ mount }) => {
    const onPress = sinon.spy();
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen={false} onPress={onPress}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const root = wrapper.getByTestId(ROOT_TEST_ID);
    await root.click();
    expect(onPress.calledOnce).toBe(true);
});

test('should call onPress when Enter is pressed on root', async ({ mount }) => {
    const onPress = sinon.spy();
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen={false} onPress={onPress}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const root = wrapper.getByTestId(ROOT_TEST_ID);
    await root.focus();
    await root.press('Enter');
    expect(onPress.calledOnce).toBe(true);
});

test('should rotate caret 180deg when isOpen is true', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen onPress={() => {}}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const caretSvg = wrapper.getByTestId(ROOT_TEST_ID).locator('svg').last();
    const transform = await caretSvg.evaluate((el) => getComputedStyle(el).transform);
    expect(transform).toBe(ROTATED_180_MATRIX);
});

test('should not rotate caret when isOpen is false', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen={false} onPress={() => {}}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const caretSvg = wrapper.getByTestId(ROOT_TEST_ID).locator('svg').last();
    const transform = await caretSvg.evaluate((el) => getComputedStyle(el).transform);
    expect(transform).not.toBe(ROTATED_180_MATRIX);
});

for (const orientation of ['horizontal', 'vertical'] as const) {
    test(`should render single image preview with title and metadata (Input - Single - Image) (${orientation})`, async ({
        mount,
    }) => {
        const wrapper = await mount(
            <AssetInput.Root orientation={orientation} isOpen={false} onPress={() => {}}>
                <AssetInput.Preview>
                    <AssetInput.PreviewImage src={ASSET_IMG} alt="asset preview" />
                </AssetInput.Preview>
                <AssetInput.Title>foo1</AssetInput.Title>
                <AssetInput.Metadata>
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByTestId(ROOT_TEST_ID);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-orientation', orientation);
        await expect(root).toHaveAttribute('data-open', 'false');
        await expect(root).toContainText('Uploaded');
        await expect(root).toContainText('JPG');
        await expect(root).toContainText('2000 bytes');
        await expect(root.locator('img[alt="asset preview"]')).toHaveCount(1);
    });

    test(`should render single icon preview with title and metadata (Input - Single - Icon) (${orientation})`, async ({
        mount,
    }) => {
        const wrapper = await mount(
            <AssetInput.Root orientation={orientation} isOpen={false} onPress={() => {}}>
                <AssetInput.Preview>
                    <AssetInput.PreviewIcon>
                        <IconMusicNote />
                    </AssetInput.PreviewIcon>
                </AssetInput.Preview>
                <AssetInput.Title>foo1</AssetInput.Title>
                <AssetInput.Metadata>
                    <AssetInput.MetadataItem>Uploaded</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByTestId(ROOT_TEST_ID);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-orientation', orientation);
        await expect(root).toContainText('Uploaded');
        await expect(root.locator('img')).toHaveCount(0);
        const previewIconSvg = root.locator(':scope > div').first().locator('svg');
        await expect(previewIconSvg).toBeVisible();
        await expect(previewIconSvg).toHaveCount(1);
    });

    test(`should render preview loading with title and metadata (Input - Single - Loading) (${orientation})`, async ({
        mount,
    }) => {
        const wrapper = await mount(
            <AssetInput.Root orientation={orientation} isOpen={false} onPress={() => {}}>
                <AssetInput.Preview>
                    <AssetInput.PreviewLoading />
                </AssetInput.Preview>
                <AssetInput.Title>foo1</AssetInput.Title>
                <AssetInput.Metadata>
                    <AssetInput.MetadataItem>
                        <Flex align="center" gap={0.5}>
                            <IconArrowCircleUp size="16" />
                            Uploaded
                        </Flex>
                    </AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>JPG</AssetInput.MetadataItem>
                    <AssetInput.MetadataItem>2000 bytes</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByTestId(ROOT_TEST_ID);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-orientation', orientation);
        await expect(root.getByTestId('fondue-loading-circle-content')).toBeVisible();
    });

    test(`should render mixed multiple preview with title and metadata (Input - Multiple - Mixed) (${orientation})`, async ({
        mount,
    }) => {
        const wrapper = await mount(
            <AssetInput.Root orientation={orientation} isOpen={false} onPress={() => {}}>
                <AssetInput.Preview>
                    <AssetInput.PreviewImage src={ASSET_IMG} alt="first" />
                    <AssetInput.PreviewImage src={ASSET_IMG} alt="second" />
                    <AssetInput.PreviewIcon>
                        <IconMusicNote />
                    </AssetInput.PreviewIcon>
                    <AssetInput.PreviewLoading />
                </AssetInput.Preview>
                <AssetInput.Title>3 assets</AssetInput.Title>
                <AssetInput.Metadata>
                    <AssetInput.MetadataItem>2 locations</AssetInput.MetadataItem>
                </AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByTestId(ROOT_TEST_ID);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-orientation', orientation);
        await expect(root).toContainText('2 locations');
        await expect(root.locator('img')).toHaveCount(2);
        await expect(root.getByTestId('fondue-loading-circle-content')).toBeVisible();
    });
}
