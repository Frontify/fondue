/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '#/components/Button/Button';

import { Dialog } from '../Dialog';

const DIALOG_TRIGGER_TEXT = 'Click Me';
const DIALOG_TRIGGER_TEST_ID = 'fondue-dialog-trigger';
const DIALOG_HEADER_TEXT = 'Dialog Header';
const DIALOG_HEADER_TEST_ID = 'fondue-dialog-header';
const DIALOG_BODY_TEXT = 'Dialog Body';
const DIALOG_BODY_TEST_ID = 'fondue-dialog-body';
const DIALOG_FOOTER_TEXT = 'Dialog Footer';
const DIALOG_FOOTER_TEST_ID = 'fondue-dialog-footer';
const DIALOG_CONTENT_TEST_ID = 'fondue-dialog-content';
const DIALOG_SIDE_CONTENT_TEST_ID = 'fondue-dialog-side-content';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID} showCloseButton>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(DIALOG_TRIGGER_TEXT);
});
