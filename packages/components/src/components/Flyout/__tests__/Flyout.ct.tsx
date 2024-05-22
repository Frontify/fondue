/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '#/components/Button/Button';

import { Flyout } from '../Flyout';

const FLYOUT_TEST_ID = 'test-flyout';
const FLYOUT_TRIGGER_TEXT = 'Flyout Trigger';
const FLYOUT_BODY_TEXT = 'Flyout Body';
const FLYOUT_HEADER_TEXT = 'Flyout Header';
const FLYOUT_FOOTER_TEXT = 'Flyout Footer';

const FlyoutComponent = () => {
    return (
        <Flyout.Root data-test-id={FLYOUT_TEST_ID}>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Header showCloseButton>{FLYOUT_HEADER_TEXT}</Flyout.Header>
            <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
            <Flyout.Footer>
                <div className="tw-flex tw-justify-end tw-gap-2">
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </div>
            </Flyout.Footer>
        </Flyout.Root>
    );
};

test('should render without header', async ({ mount }) => {
    const component = await mount(<FlyoutComponent />);
    await expect(component).toBeVisible();
    await expect(component).toContainText(FLYOUT_TRIGGER_TEXT);
});
