/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { AssetInput } from '../AssetInput';

const UPLOAD_TEST_ID = 'fondue-asset-input-upload';
const UPLOAD_FILE_TEST_ID = 'fondue-asset-input-upload-file';
const BROWSE_TEST_ID = 'fondue-asset-input-browse';

test('should render placeholder with upload and browse actions', async ({ mount }) => {
    const onBrowse = sinon.spy();
    const onFileChange = sinon.spy();
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.UploadInput acceptFileType="image/*" onSelect={onFileChange} />
            <AssetInput.BrowseInput onBrowse={onBrowse} />
        </AssetInput.Placeholder>,
    );
    await expect(wrapper.getByTestId(UPLOAD_TEST_ID)).toBeVisible();
    await expect(wrapper.getByTestId(BROWSE_TEST_ID)).toBeVisible();

    await wrapper.getByTestId(BROWSE_TEST_ID).click();
    expect(onBrowse.calledOnce).toBe(true);

    await wrapper.getByTestId(UPLOAD_FILE_TEST_ID).setInputFiles({
        name: 'test.png',
        mimeType: 'image/png',
        buffer: Buffer.from('x'),
    });
    expect(onFileChange.calledOnce).toBe(true);
});

test('should render placeholder with upload only', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.UploadInput acceptFileType="image/*" onSelect={() => {}} />
        </AssetInput.Placeholder>,
    );
    await expect(wrapper.getByTestId(UPLOAD_TEST_ID)).toBeVisible();
    await expect(wrapper.getByTestId(BROWSE_TEST_ID)).toHaveCount(0);
});

test('should render placeholder with browse only', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.BrowseInput onBrowse={() => {}} />
        </AssetInput.Placeholder>,
    );
    await expect(wrapper.getByTestId(BROWSE_TEST_ID)).toBeVisible();
    await expect(wrapper.getByTestId(UPLOAD_TEST_ID)).toHaveCount(0);
});

test('should render upload before browse regardless of child order', async ({ mount }) => {
    const wrapper = await mount(
        <AssetInput.Placeholder>
            <AssetInput.BrowseInput onBrowse={() => {}} />
            <AssetInput.UploadInput acceptFileType="image/*" onSelect={() => {}} />
        </AssetInput.Placeholder>,
    );
    const uploadBox = await wrapper.getByTestId(UPLOAD_TEST_ID).boundingBox();
    const browseBox = await wrapper.getByTestId(BROWSE_TEST_ID).boundingBox();
    expect(uploadBox).not.toBeNull();
    expect(browseBox).not.toBeNull();
    expect(uploadBox!.x).toBeLessThan(browseBox!.x);
});
