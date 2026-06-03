/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { AssetInput } from '../AssetInput';

const UPLOAD_TEST_ID = 'fondue-asset-input-upload';
const UPLOAD_FILE_TEST_ID = 'fondue-asset-input-upload-file';

test('should propagate acceptFileType to the file input', async ({ mount }) => {
    const wrapper = await mount(<AssetInput.UploadInput acceptFileType="image/png,image/jpeg" onSelect={() => {}} />);
    await expect(wrapper.getByTestId(UPLOAD_FILE_TEST_ID)).toHaveAttribute('accept', 'image/png,image/jpeg');
});

test('should propagate allowMultiple=true to the file input', async ({ mount }) => {
    const wrapper = await mount(<AssetInput.UploadInput acceptFileType="image/*" allowMultiple onSelect={() => {}} />);
    await expect(wrapper.getByTestId(UPLOAD_FILE_TEST_ID)).toHaveAttribute('multiple', '');
});

test('should default allowMultiple to false', async ({ mount }) => {
    const wrapper = await mount(<AssetInput.UploadInput acceptFileType="image/*" onSelect={() => {}} />);
    await expect(wrapper.getByTestId(UPLOAD_FILE_TEST_ID)).not.toHaveAttribute('multiple', '');
});

test('should trigger the file input when the upload button is clicked', async ({ mount }) => {
    const wrapper = await mount(<AssetInput.UploadInput acceptFileType="image/*" onSelect={() => {}} />);
    const fileInput = wrapper.getByTestId(UPLOAD_FILE_TEST_ID);

    await fileInput.evaluate((el) => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            el.setAttribute('data-clicked', 'true');
        });
    });

    await wrapper.getByTestId(UPLOAD_TEST_ID).click();
    await expect(fileInput).toHaveAttribute('data-clicked', 'true');
});

test('should call onSelect when a file is chosen', async ({ mount }) => {
    const onSelect = sinon.spy();
    const wrapper = await mount(<AssetInput.UploadInput acceptFileType="image/*" onSelect={onSelect} />);
    await wrapper.getByTestId(UPLOAD_FILE_TEST_ID).setInputFiles({
        name: 'test.png',
        mimeType: 'image/png',
        buffer: Buffer.from('x'),
    });
    expect(onSelect.calledOnce).toBe(true);
});
