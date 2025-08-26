/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Button } from '#/components/Button/Button';
import { TextInput } from '#/components/TextInput/TextInput';
import { FOCUS_BORDER_CSS, FOCUS_OUTLINE_CSS } from '#/helpers/constants';

import { Flyout } from '../Flyout';

const FLYOUT_TRIGGER_TEST_ID = 'fondue-flyout-trigger';
const FLYOUT_CONTENT_TEST_ID = 'fondue-flyout-content';
const FLYOUT_TRIGGER_TEXT = 'Flyout Trigger';
const FLYOUT_BODY_TEST_ID = 'fondue-flyout-body';
const FLYOUT_BODY_TEXT = 'Flyout Body';
const FLYOUT_HEADER_TEST_ID = 'fondue-flyout-header';
const FLYOUT_HEADER_TEXT = 'Flyout Header';
const FLYOUT_FOOTER_TEST_ID = 'fondue-flyout-footer';
const FLYOUT_FOOTER_TEXT = 'Flyout Footer';
const TEXT_INPUT_TEST_ID_1 = 'fondue-text-input-1';
const TEXT_INPUT_TEST_ID_2 = 'fondue-text-input-2';
const TEXT_INPUT_TEST_ID_3 = 'fondue-text-input-3';

test('should render trigger', async ({ mount, page }) => {
    const component = await mount(
        <Flyout.Root>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header showCloseButton>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await expect(tooltipTrigger).toBeVisible();
    await expect(component).toContainText(FLYOUT_TRIGGER_TEXT);
    await expect(flyoutContent).not.toBeVisible();
});

test('should render content on click', async ({ mount, page }) => {
    const component = await mount(
        <Flyout.Root>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header showCloseButton>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(component).toBeVisible();
    await expect(tooltipTrigger).toBeVisible();
    await expect(component).toContainText(FLYOUT_TRIGGER_TEXT);
    await expect(flyoutContent).not.toBeVisible();
    await tooltipTrigger.click();
    await expect(flyoutContent).toBeVisible();
});

test('should close on click outside', async ({ mount, page }) => {
    await mount(
        <Flyout.Root>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header showCloseButton>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await tooltipTrigger.click();
    await expect(flyoutContent).toBeVisible();
    await page.click('body');
    await expect(flyoutContent).not.toBeVisible();
});

test('should close on cross button click', async ({ mount, page }) => {
    await mount(
        <Flyout.Root>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header showCloseButton>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await tooltipTrigger.click();
    await expect(flyoutContent).toBeVisible();
    await page.getByTestId('fondue-flyout-header-close').click();
    await expect(flyoutContent).not.toBeVisible();
});

test('should not render close button when prop is not passed', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent).toBeVisible();
    await expect(page.getByTestId('fondue-flyout-header-close')).not.toBeVisible();
});

test('should render only flyout header', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toBeVisible();
    await expect(flyoutContent).toContainText(FLYOUT_HEADER_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).not.toBeVisible();
    await expect(flyoutContent).not.toContainText(FLYOUT_BODY_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).not.toBeVisible();
    await expect(flyoutContent).not.toContainText(FLYOUT_FOOTER_TEXT);
});

test('should render only flyout body', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).not.toBeVisible();
    await expect(flyoutContent).not.toContainText(FLYOUT_HEADER_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toBeVisible();
    await expect(flyoutContent).toContainText(FLYOUT_BODY_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).not.toBeVisible();
    await expect(flyoutContent).not.toContainText(FLYOUT_FOOTER_TEXT);
});

test('should render only flyout footer', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).not.toBeVisible();
    await expect(flyoutContent).not.toContainText(FLYOUT_HEADER_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).not.toBeVisible();
    await expect(flyoutContent).not.toContainText(FLYOUT_BODY_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toBeVisible();
    await expect(flyoutContent).toContainText(FLYOUT_FOOTER_TEXT);
});

test('should render full flyout layout', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toBeVisible();
    await expect(flyoutContent).toContainText(FLYOUT_HEADER_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toBeVisible();
    await expect(flyoutContent).toContainText(FLYOUT_BODY_TEXT);
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toBeVisible();
    await expect(flyoutContent).toContainText(FLYOUT_FOOTER_TEXT);
});

test('should render custom content', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <div data-test-id="custom-content" className="tw-bg-[red]">
                    {FLYOUT_BODY_TEXT}
                </div>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent).toContainText(FLYOUT_BODY_TEXT);
    await expect(flyoutContent.getByTestId('custom-content')).toBeVisible();
    await expect(flyoutContent.getByTestId('custom-content')).toHaveClass('tw-bg-[red]');
});

test('should render compact padding by default', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toHaveCSS('padding', '16px');
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toHaveCSS('padding', '8px 16px');
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toHaveCSS('padding', '16px');
});

test('should render no padding', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="none">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toHaveCSS('padding', '0px');
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toHaveCSS('padding', '0px');
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toHaveCSS('padding', '0px');
});

test('should render tight padding', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="tight">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toHaveCSS('padding', '8px');
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toHaveCSS('padding', '8px');
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toHaveCSS('padding', '8px');
});

test('should render compact padding', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="compact">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toHaveCSS('padding', '16px');
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toHaveCSS('padding', '8px 16px');
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toHaveCSS('padding', '16px');
});

test('should render comfortable padding', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="comfortable">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toHaveCSS('padding', '24px');
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toHaveCSS('padding', '16px 24px');
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toHaveCSS('padding', '24px');
});

test('should render spacious padding', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="spacious">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent.getByTestId(FLYOUT_HEADER_TEST_ID)).toHaveCSS('padding', '40px');
    await expect(flyoutContent.getByTestId(FLYOUT_BODY_TEST_ID)).toHaveCSS('padding', '24px 40px');
    await expect(flyoutContent.getByTestId(FLYOUT_FOOTER_TEST_ID)).toHaveCSS('padding', '40px');
});

test('should render open', async ({ mount, page }) => {
    await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="spacious">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const flyoutContent = page.getByTestId(FLYOUT_CONTENT_TEST_ID);
    await expect(flyoutContent).toBeVisible();
});

test('should trigger callback on open and close', async ({ mount, page }) => {
    const onOpenChange = sinon.spy();

    const component = await mount(
        <Flyout.Root onOpenChange={onOpenChange}>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content padding="spacious">
                <Flyout.Header>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    await expect(component).toBeVisible();
    await expect(tooltipTrigger).toBeVisible();
    await tooltipTrigger.click();
    expect(onOpenChange.calledWith(true)).toBe(true);
    await page.click('body');
    expect(onOpenChange.calledWith(false)).toBe(true);
});

test('should render focus visible input on enter press', async ({ mount, page }) => {
    const component = await mount(
        <Flyout.Root>
            <Flyout.Trigger>
                <Button>Open flyout</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Body>
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_1} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_2} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_3} />
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    const textInput1 = page.getByTestId(TEXT_INPUT_TEST_ID_1);
    const textInput2 = page.getByTestId(TEXT_INPUT_TEST_ID_2);
    const textInput3 = page.getByTestId(TEXT_INPUT_TEST_ID_3);
    await expect(component).toBeVisible();
    await expect(tooltipTrigger).toBeVisible();
    await tooltipTrigger.focus();
    await page.keyboard.press('Enter');
    await expect(textInput1).toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput1).not.toHaveCSS(...FOCUS_BORDER_CSS);
    await page.keyboard.press('Tab');
    await expect(textInput2).toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput2).not.toHaveCSS(...FOCUS_BORDER_CSS);
    await textInput3.click();
    await expect(textInput3).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput3).toHaveCSS(...FOCUS_BORDER_CSS);
});

test('should not render focus visible input on click', async ({ mount, page }) => {
    const component = await mount(
        <Flyout.Root>
            <Flyout.Trigger>
                <Button>Open flyout</Button>
            </Flyout.Trigger>
            <Flyout.Content>
                <Flyout.Body>
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_1} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_2} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_3} />
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>,
    );
    const tooltipTrigger = page.getByTestId(FLYOUT_TRIGGER_TEST_ID);
    const textInput1 = page.getByTestId(TEXT_INPUT_TEST_ID_1);
    const textInput2 = page.getByTestId(TEXT_INPUT_TEST_ID_2);
    const textInput3 = page.getByTestId(TEXT_INPUT_TEST_ID_3);
    await expect(component).toBeVisible();
    await expect(tooltipTrigger).toBeVisible();
    await tooltipTrigger.focus();
    await tooltipTrigger.click();
    await expect(textInput1).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput1).toHaveCSS(...FOCUS_BORDER_CSS);
    await textInput2.click();
    await expect(textInput2).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput2).toHaveCSS(...FOCUS_BORDER_CSS);
    await page.keyboard.press('Tab');
    await expect(textInput3).toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput3).not.toHaveCSS(...FOCUS_BORDER_CSS);
});

test('should render with spacious trigger offset', async ({ mount, page }) => {
    const component = await mount(
        <Flyout.Root open>
            <Flyout.Trigger>
                <Button>{FLYOUT_TRIGGER_TEXT}</Button>
            </Flyout.Trigger>
            <Flyout.Content triggerOffset="spacious">
                <Flyout.Header showCloseButton>{FLYOUT_HEADER_TEXT}</Flyout.Header>
                <Flyout.Body>{FLYOUT_BODY_TEXT}</Flyout.Body>
                <Flyout.Footer>
                    <Button>{FLYOUT_FOOTER_TEXT}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(FLYOUT_TRIGGER_TEST_ID)).toBeVisible();
    await expect(page.getByTestId(FLYOUT_CONTENT_TEST_ID)).toBeVisible();
    const triggerElementBoundingBox = await page.getByTestId(FLYOUT_TRIGGER_TEST_ID).boundingBox();
    const contentElementBoundingBox = await page.getByTestId(FLYOUT_CONTENT_TEST_ID).boundingBox();
    expect(triggerElementBoundingBox && contentElementBoundingBox).toBeTruthy();
    if (triggerElementBoundingBox && contentElementBoundingBox) {
        expect(contentElementBoundingBox.y).toBe(triggerElementBoundingBox.y + triggerElementBoundingBox.height + 16);
    }
});
