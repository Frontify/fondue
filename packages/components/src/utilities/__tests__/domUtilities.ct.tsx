/* (c) Copyright Frontify Ltd., all rights reserved. */

// Import the necessary modules from Playwright

import { expect, test } from '@playwright/experimental-ct-react';
import { type ForwardedRef, forwardRef, useRef } from 'react';

import { MAX_HEIGHT_MARGIN, setDialogMaxHeight } from '../domUtilities';

const DialogComponent = (_: NonNullable<unknown>, forwardedRef: ForwardedRef<HTMLDivElement>) => (
    <div id="dialog" ref={forwardedRef}>
        <p>Dialog content</p>
    </div>
);

const Dialog = forwardRef<HTMLDivElement, NonNullable<unknown>>(DialogComponent);

test('setDialogMaxHeight sets the correct max-height based on viewport size', async ({ mount }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    await mount(<Dialog ref={dialogRef} />);

    if (!dialogRef.current) {
        throw new Error('Dialog not found');
    }

    setDialogMaxHeight(dialogRef.current, (dialog) => {
        const maxHeight = dialog.style.maxHeight;
        const expectedMaxHeight = `${window.innerHeight - MAX_HEIGHT_MARGIN}px`;
        expect(maxHeight).toBe(expectedMaxHeight);
    });
});
