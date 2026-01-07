/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Button } from '#/components/Button/Button';
import { TextInput } from '#/components/TextInput/TextInput';
import { Tooltip } from '#/components/Tooltip/Tooltip';
import { FOCUS_BORDER_CSS, FOCUS_OUTLINE_CSS } from '#/helpers/constants';

import { Dialog } from '../Dialog';

const DIALOG_TRIGGER_TEXT = 'Click Me';
const DIALOG_TRIGGER_TEST_ID = 'fondue-dialog-trigger';
const DIALOG_HEADER_TEXT = 'Dialog Header';
const DIALOG_HEADER_TEST_ID = 'fondue-dialog-header';
const DIALOG_HEADER_CLOSE_TEST_ID = 'fondue-dialog-header-close';
const DIALOG_BODY_TEXT = 'Dialog Body';
const DIALOG_BODY_TEST_ID = 'fondue-dialog-body';
const DIALOG_FOOTER_TEXT = 'Dialog Footer';
const DIALOG_FOOTER_TEST_ID = 'fondue-dialog-footer';
const DIALOG_CONTENT_TEST_ID = 'fondue-dialog-content';
const DIALOG_SIDE_CONTENT_TEST_ID = 'fondue-dialog-side-content';
const TEXT_INPUT_TEST_ID_1 = 'fondue-text-input-1';
const TEXT_INPUT_TEST_ID_2 = 'fondue-text-input-2';
const TEXT_INPUT_TEST_ID_3 = 'fondue-text-input-3';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>{DIALOG_FOOTER_TEXT}</Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(DIALOG_TRIGGER_TEXT);
});

test('should render no padding', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.Header padding="none" data-test-id={DIALOG_HEADER_TEST_ID}>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body padding="none" data-test-id={DIALOG_BODY_TEST_ID}>
                    {DIALOG_BODY_TEXT}
                </Dialog.Body>
                <Dialog.Footer padding="none" data-test-id={DIALOG_FOOTER_TEST_ID}>
                    {DIALOG_FOOTER_TEXT}
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogContent = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(dialogContent.getByTestId(DIALOG_HEADER_TEST_ID)).toHaveCSS('padding', '0px');
    await expect(dialogContent.getByTestId(DIALOG_BODY_TEST_ID)).toHaveCSS('padding', '0px');
    await expect(dialogContent.getByTestId(DIALOG_FOOTER_TEST_ID)).toHaveCSS('padding', '0px');
});

test('should render tight padding', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.Header padding="tight" data-test-id={DIALOG_HEADER_TEST_ID}>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body padding="tight" data-test-id={DIALOG_BODY_TEST_ID}>
                    {DIALOG_BODY_TEXT}
                </Dialog.Body>
                <Dialog.Footer padding="tight" data-test-id={DIALOG_FOOTER_TEST_ID}>
                    {DIALOG_FOOTER_TEXT}
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogContent = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(dialogContent.getByTestId(DIALOG_HEADER_TEST_ID)).toHaveCSS('padding', '8px');
    await expect(dialogContent.getByTestId(DIALOG_BODY_TEST_ID)).toHaveCSS('padding', '8px');
    await expect(dialogContent.getByTestId(DIALOG_FOOTER_TEST_ID)).toHaveCSS('padding', '8px');
});

test('should render compact padding', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.Header padding="compact" data-test-id={DIALOG_HEADER_TEST_ID}>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body padding="compact" data-test-id={DIALOG_BODY_TEST_ID}>
                    {DIALOG_BODY_TEXT}
                </Dialog.Body>
                <Dialog.Footer padding="compact" data-test-id={DIALOG_FOOTER_TEST_ID}>
                    {DIALOG_FOOTER_TEXT}
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogContent = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(dialogContent.getByTestId(DIALOG_HEADER_TEST_ID)).toHaveCSS('padding', '16px');
    await expect(dialogContent.getByTestId(DIALOG_BODY_TEST_ID)).toHaveCSS('padding', '8px 16px');
    await expect(dialogContent.getByTestId(DIALOG_FOOTER_TEST_ID)).toHaveCSS('padding', '16px');
});

test('should render comfortable padding', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.Header padding="comfortable" data-test-id={DIALOG_HEADER_TEST_ID}>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body padding="comfortable" data-test-id={DIALOG_BODY_TEST_ID}>
                    {DIALOG_BODY_TEXT}
                </Dialog.Body>
                <Dialog.Footer padding="comfortable" data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <Button>{DIALOG_FOOTER_TEXT}</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogContent = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(dialogContent.getByTestId(DIALOG_HEADER_TEST_ID)).toHaveCSS('padding', '24px');
    await expect(dialogContent.getByTestId(DIALOG_BODY_TEST_ID)).toHaveCSS('padding', '16px 24px');
    await expect(dialogContent.getByTestId(DIALOG_FOOTER_TEST_ID)).toHaveCSS('padding', '24px');
});

test('should render spacious padding', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.Header padding="spacious" data-test-id={DIALOG_HEADER_TEST_ID}>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body padding="spacious" data-test-id={DIALOG_BODY_TEST_ID}>
                    {DIALOG_BODY_TEXT}
                </Dialog.Body>
                <Dialog.Footer padding="spacious" data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <Button>{DIALOG_FOOTER_TEXT}</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogContent = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(dialogContent.getByTestId(DIALOG_HEADER_TEST_ID)).toHaveCSS('padding', '40px');
    await expect(dialogContent.getByTestId(DIALOG_BODY_TEST_ID)).toHaveCSS('padding', '24px 40px');
    await expect(dialogContent.getByTestId(DIALOG_FOOTER_TEST_ID)).toHaveCSS('padding', '40px');
});

test('should render trigger element', async ({ mount, page }) => {
    await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const triggerElement = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    await expect(triggerElement).toBeVisible();
    await expect(triggerElement).toContainText(DIALOG_TRIGGER_TEXT);
});

test('should open on trigger click', async ({ mount, page }) => {
    await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const triggerElement = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    const contentElement = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(triggerElement).toBeVisible();
    await expect(contentElement).not.toBeVisible();
    await triggerElement.click();
    await expect(contentElement).toBeVisible();
});

test('should close on close button click', async ({ mount, page }) => {
    await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const triggerElement = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    const contentElement = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    const closeElement = page.getByTestId(DIALOG_HEADER_CLOSE_TEST_ID);
    await expect(triggerElement).toBeVisible();
    await expect(contentElement).not.toBeVisible();
    await triggerElement.click();
    await expect(contentElement).toBeVisible();
    await closeElement.click();
    await expect(contentElement).not.toBeVisible();
});

test('should open show open from prop', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const triggerElement = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    const contentElement = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(triggerElement).toBeVisible();
    await expect(contentElement).toBeVisible();
});

test('should call event handler on open and close', async ({ mount, page }) => {
    const onOpenChange = sinon.spy();
    await mount(
        <Dialog.Root onOpenChange={onOpenChange}>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const triggerElement = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    const closeElement = page.getByTestId(DIALOG_HEADER_CLOSE_TEST_ID);
    expect(onOpenChange.callCount).toBe(0);
    await triggerElement.click();
    expect(onOpenChange.callCount).toBe(1);
    await closeElement.click();
    expect(onOpenChange.callCount).toBe(2);
});

test('should show layout elements', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-success tw-h-full tw-w-full"></div>
                </Dialog.SideContent>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>
                    <div className="tw-flex tw-h-fit tw-justify-end tw-gap-2">
                        <Button>{DIALOG_FOOTER_TEXT}</Button>
                    </div>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const sideContentElement = page.getByTestId(DIALOG_SIDE_CONTENT_TEST_ID);
    const headerElement = page.getByTestId(DIALOG_HEADER_TEST_ID);
    const bodyElement = page.getByTestId(DIALOG_BODY_TEST_ID);
    const footerElement = page.getByTestId(DIALOG_FOOTER_TEST_ID);
    await expect(sideContentElement).toBeVisible();
    await expect(headerElement).toBeVisible();
    await expect(bodyElement).toBeVisible();
    await expect(footerElement).toBeVisible();
});

test('should render focus visible input on enter press', async ({ mount, page }) => {
    const component = await mount(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Body>
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_1} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_2} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_3} />
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogTrigger = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    const textInput1 = page.getByTestId(TEXT_INPUT_TEST_ID_1);
    const textInput2 = page.getByTestId(TEXT_INPUT_TEST_ID_2);
    const textInput3 = page.getByTestId(TEXT_INPUT_TEST_ID_3);
    await expect(component).toBeVisible();
    await expect(dialogTrigger).toBeVisible();
    await dialogTrigger.focus();
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
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Body>
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_1} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_2} />
                    <TextInput data-test-id={TEXT_INPUT_TEST_ID_3} />
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const dialogTrigger = page.getByTestId(DIALOG_TRIGGER_TEST_ID);
    const textInput1 = page.getByTestId(TEXT_INPUT_TEST_ID_1);
    const textInput2 = page.getByTestId(TEXT_INPUT_TEST_ID_2);
    const textInput3 = page.getByTestId(TEXT_INPUT_TEST_ID_3);
    await expect(component).toBeVisible();
    await expect(dialogTrigger).toBeVisible();
    await dialogTrigger.focus();
    await dialogTrigger.click();
    await expect(textInput1).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput1).toHaveCSS(...FOCUS_BORDER_CSS);
    await textInput2.click();
    await expect(textInput2).not.toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput2).toHaveCSS(...FOCUS_BORDER_CSS);
    await page.keyboard.press('Tab');
    await expect(textInput3).toHaveCSS(...FOCUS_OUTLINE_CSS);
    await expect(textInput3).not.toHaveCSS(...FOCUS_BORDER_CSS);
});

test('should render borders on footer and header by default', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header data-test-id={DIALOG_HEADER_TEST_ID}>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer data-test-id={DIALOG_FOOTER_TEST_ID}>{DIALOG_FOOTER_TEXT}</Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const headerElement = page.getByTestId(DIALOG_HEADER_TEST_ID);
    const footerElement = page.getByTestId(DIALOG_FOOTER_TEST_ID);
    await expect(headerElement).toHaveCSS('border-bottom-width', '1px');
    await expect(footerElement).toHaveCSS('border-top-width', '1px');
});

test('should not render borders when showBorder is false', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header showBorder={false} data-test-id={DIALOG_HEADER_TEST_ID}>
                    {DIALOG_HEADER_TEXT}
                </Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>{DIALOG_BODY_TEXT}</Dialog.Body>
                <Dialog.Footer showBorder={false} data-test-id={DIALOG_FOOTER_TEST_ID}>
                    {DIALOG_FOOTER_TEXT}
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );
    const headerElement = page.getByTestId(DIALOG_HEADER_TEST_ID);
    const footerElement = page.getByTestId(DIALOG_FOOTER_TEST_ID);
    await expect(headerElement).not.toHaveCSS('border-bottom-width', '1px');
    await expect(footerElement).not.toHaveCSS('border-top-width', '1px');
});

test('should have its content to expand to max width set by user', async ({ mount, page }) => {
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="810px">
                <Dialog.Header showBorder={false} data-test-id={DIALOG_HEADER_TEST_ID}>
                    <Dialog.Title>{DIALOG_HEADER_TEXT}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body data-test-id={DIALOG_BODY_TEST_ID}>
                    <div style={{ width: '1234px' }}>Content</div>
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const contentElement = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(contentElement).toHaveCSS('max-width', '810px');
    await expect(contentElement).toHaveCSS('width', '810px');
});

test('should focus first input in body when dialog opens', async ({ mount, page }) => {
    const component = await mount(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body>
                    <input data-test-id={TEXT_INPUT_TEST_ID_1} />
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const dialogTrigger = page.getByTestId(DIALOG_TRIGGER_TEST_ID);

    await expect(component).toBeVisible();
    await expect(dialogTrigger).toBeVisible();

    await dialogTrigger.focus();
    await page.keyboard.press('Enter');

    const textInput1 = page.getByTestId(TEXT_INPUT_TEST_ID_1);

    await expect(textInput1).toBeFocused();
});

test('should not focus the tooltip trigger when dialog opens', async ({ mount, page }) => {
    const component = await mount(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body>
                    <Tooltip.Root>
                        <Tooltip.Trigger data-test-id="tooltip-trigger">Tooltip Trigger</Tooltip.Trigger>
                        <Tooltip.Content side="right" padding="compact">
                            Tooltip Content
                        </Tooltip.Content>
                    </Tooltip.Root>
                    <input data-test-id={TEXT_INPUT_TEST_ID_1} />
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const dialogTrigger = page.getByTestId(DIALOG_TRIGGER_TEST_ID);

    await expect(component).toBeVisible();

    await dialogTrigger.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('tooltip-trigger')).not.toBeFocused();
    await expect(page.getByTestId(TEXT_INPUT_TEST_ID_1)).toBeFocused();
});

test('should focus first button in footer when body has no focusable elements', async ({ mount, page }) => {
    const component = await mount(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body>
                    <p>Just some text, no focusable elements</p>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button data-test-id="footer-button-1">Cancel</Button>
                    <Button data-test-id="footer-button-2">Submit</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const dialogTrigger = page.getByTestId(DIALOG_TRIGGER_TEST_ID);

    await expect(component).toBeVisible();
    await expect(dialogTrigger).toBeVisible();

    await dialogTrigger.focus();
    await page.keyboard.press('Enter');

    const firstFooterButton = page.getByTestId('footer-button-1');
    await expect(firstFooterButton).toBeFocused();
});

test('should call onEscapeKeyDown when escape is pressed', async ({ mount, page }) => {
    const onEscapeKeyDown = sinon.spy();
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID} onEscapeKeyDown={onEscapeKeyDown}>
                <Dialog.Header>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body>{DIALOG_BODY_TEXT}</Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const contentElement = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(contentElement).toBeVisible();
    expect(onEscapeKeyDown.callCount).toBe(0);
    await page.keyboard.press('Escape');
    expect(onEscapeKeyDown.callCount).toBe(1);
});

test('should prevent dialog close when onEscapeKeyDown calls preventDefault', async ({ mount, page }) => {
    const onEscapeKeyDown = sinon.spy((event: KeyboardEvent) => {
        event.preventDefault();
    });
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID} onEscapeKeyDown={onEscapeKeyDown}>
                <Dialog.Header>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body>{DIALOG_BODY_TEXT}</Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const contentElement = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(contentElement).toBeVisible();
    expect(onEscapeKeyDown.callCount).toBe(0);
    await page.keyboard.press('Escape');
    expect(onEscapeKeyDown.callCount).toBe(1);
    // Dialog should still be visible because we prevented the default behavior
    await expect(contentElement).toBeVisible();
});

test('should close nested dropdown before dialog when escape is pressed', async ({ mount, page }) => {
    const { Dropdown } = await import('#/components/Dropdown/Dropdown');
    await mount(
        <Dialog.Root open>
            <Dialog.Trigger>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.Header>{DIALOG_HEADER_TEXT}</Dialog.Header>
                <Dialog.Body>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button data-test-id="nested-dropdown-trigger">Open Dropdown</Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content data-test-id="nested-dropdown-content">
                            <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    const dialogContent = page.getByTestId(DIALOG_CONTENT_TEST_ID);
    await expect(dialogContent).toBeVisible();

    // Open the nested dropdown
    const dropdownTrigger = page.getByTestId('nested-dropdown-trigger');
    await dropdownTrigger.click();
    const dropdownContent = page.getByTestId('nested-dropdown-content');
    await expect(dropdownContent).toBeVisible();

    // First escape should close the dropdown
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
    await expect(dialogContent).toBeVisible();

    // Second escape should close the dialog
    await page.keyboard.press('Escape');
    await expect(dialogContent).not.toBeVisible();
});

test('should close inner dialog before outer dialog when escape is pressed in nested dialogs', async ({
    mount,
    page,
}) => {
    const outerOnEscapeKeyDown = sinon.spy();
    const innerOnEscapeKeyDown = sinon.spy();

    await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id="outer-dialog-trigger">
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id="outer-dialog-content" onEscapeKeyDown={outerOnEscapeKeyDown}>
                <Dialog.Header>Outer Dialog</Dialog.Header>
                <Dialog.Body>
                    <Dialog.Root>
                        <Dialog.Trigger data-test-id="inner-dialog-trigger">
                            <Button>Open Inner Dialog</Button>
                        </Dialog.Trigger>
                        <Dialog.Content data-test-id="inner-dialog-content" onEscapeKeyDown={innerOnEscapeKeyDown}>
                            <Dialog.Header>Inner Dialog</Dialog.Header>
                            <Dialog.Body>Inner dialog content</Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Root>
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>,
    );

    // Open the outer dialog
    const outerTrigger = page.getByTestId('outer-dialog-trigger');
    await outerTrigger.click();

    const outerDialogContent = page.getByTestId('outer-dialog-content');
    await expect(outerDialogContent).toBeVisible();

    // Open the inner dialog
    const innerTrigger = page.getByTestId('inner-dialog-trigger');
    await innerTrigger.click();

    const innerDialogContent = page.getByTestId('inner-dialog-content');
    await expect(innerDialogContent).toBeVisible();

    // Both dialogs should be visible
    await expect(outerDialogContent).toBeVisible();
    await expect(innerDialogContent).toBeVisible();

    // First escape should close the inner dialog
    await page.keyboard.press('Escape');
    expect(innerOnEscapeKeyDown.callCount).toBe(1);
    expect(outerOnEscapeKeyDown.callCount).toBe(0);
    await expect(innerDialogContent).not.toBeVisible();
    await expect(outerDialogContent).toBeVisible();

    // Second escape should close the outer dialog
    await page.keyboard.press('Escape');
    expect(outerOnEscapeKeyDown.callCount).toBe(1);
    await expect(outerDialogContent).not.toBeVisible();
});
