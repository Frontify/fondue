/* (c) Copyright Frontify Ltd., all rights reserved. */

// Import the necessary modules from Playwright

import { expect, test } from '@playwright/experimental-ct-react';

import { MAX_HEIGHT_MARGIN, setDialogMaxHeight } from '../domUtilities';

const Dialog = () => (
    <div id="dialog">
        <p>Dialog content</p>
    </div>
);

test('setDialogMaxHeight sets the correct max-height based on viewport size', async ({ mount }) => {
    await mount(<Dialog />);

    const dialog = document.getElementById('dialog');

    if (!dialog) {
        throw new Error('Dialog not found');
    }

    setDialogMaxHeight(dialog, () => {
        if (!dialog) {
            throw new Error('Dialog not found');
        }
        const maxHeight = dialog.style.maxHeight;
        const expectedMaxHeight = `${window.innerHeight - MAX_HEIGHT_MARGIN}px`;
        expect(maxHeight).toBe(expectedMaxHeight);
    });
});
