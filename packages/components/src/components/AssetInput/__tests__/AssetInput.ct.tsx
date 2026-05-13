/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp, IconMusicNote } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Flex } from '../../Flex/Flex';
import { AssetInput } from '../AssetInput';

const ASSET_IMG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

test('should render placeholder with upload and browse actions', async ({ mount }) => {
    const onBrowse = sinon.spy();
    const onFileChange = sinon.spy();
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.UploadInput acceptFileType="image/*" onFileChange={onFileChange} />
            <AssetInput.BrowseInput onBrowse={onBrowse} />
        </AssetInput.Placeholder>,
    );
    await expect(wrapper.getByRole('button', { name: /Upload/i })).toBeVisible();
    await expect(wrapper.getByRole('button', { name: /Browse/i })).toBeVisible();

    await wrapper.getByRole('button', { name: /Browse/i }).click();
    expect(onBrowse.calledOnce).toBe(true);

    await wrapper.locator('input[type="file"]').setInputFiles({
        name: 'test.png',
        mimeType: 'image/png',
        buffer: Buffer.from('x'),
    });
    expect(onFileChange.calledOnce).toBe(true);
});

test('should render placeholder with upload only', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.UploadInput acceptFileType="image/*" onFileChange={() => {}} />
        </AssetInput.Placeholder>,
    );
    await expect(wrapper.getByRole('button', { name: /Upload/i })).toBeVisible();
    await expect(wrapper.getByRole('button', { name: /Browse/i })).toHaveCount(0);
});

test('should render placeholder with browse only', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.BrowseInput onBrowse={() => {}} />
        </AssetInput.Placeholder>,
    );
    await expect(wrapper.getByRole('button', { name: /Browse/i })).toBeVisible();
    await expect(wrapper.getByRole('button', { name: /Upload/i })).toHaveCount(0);
});

test('should set data-open when isOpen is true', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen onPress={() => {}}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const root = wrapper.getByRole('button');
    await expect(root).toHaveAttribute('data-open', 'true');
});

test('should call onPress when root is clicked', async ({ mount }) => {
    const onPress = sinon.spy();
    const wrapper = await mount(
        <AssetInput.Root orientation="horizontal" isOpen={false} onPress={onPress}>
            <AssetInput.Title>foo1</AssetInput.Title>
        </AssetInput.Root>,
    );
    const root = wrapper.getByRole('button');
    await root.click();
    expect(onPress.calledOnce).toBe(true);
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
                    <Flex align="center" gap={0.5}>
                        <IconArrowCircleUp size="16" />
                        Uploaded
                    </Flex>
                </AssetInput.Metadata>
                <AssetInput.Metadata>JPG</AssetInput.Metadata>
                <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByRole('button', { name: /foo1/ });
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
                <AssetInput.Metadata>Uploaded</AssetInput.Metadata>
                <AssetInput.Metadata>JPG</AssetInput.Metadata>
                <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByRole('button', { name: /foo1/ });
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
                    <Flex align="center" gap={0.5}>
                        <IconArrowCircleUp size="16" />
                        Uploaded
                    </Flex>
                </AssetInput.Metadata>
                <AssetInput.Metadata>JPG</AssetInput.Metadata>
                <AssetInput.Metadata>2000 bytes</AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByRole('button', { name: /foo1/ });
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
                <AssetInput.Metadata>2 locations</AssetInput.Metadata>
            </AssetInput.Root>,
        );
        const root = wrapper.getByRole('button', { name: /3 assets/ });
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-orientation', orientation);
        await expect(root).toContainText('2 locations');
        await expect(root.locator('img')).toHaveCount(2);
        await expect(root.getByTestId('fondue-loading-circle-content')).toBeVisible();
        await expect(root.locator('[data-multiple-parts="true"]')).toBeVisible();
    });
}
