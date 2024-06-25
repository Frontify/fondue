/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Button } from '#/components/Button/Button';

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
    await expect(component).toBeVisible();
    await expect(component).toContainText(DIALOG_TRIGGER_TEXT);
});

test('should render trigger element', async ({ mount, page }) => {
    await mount(
        <Dialog.Root>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
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
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
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
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
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
        <Dialog.Root open={true}>
            <Dialog.Trigger data-test-id={DIALOG_TRIGGER_TEST_ID}>
                <Button>{DIALOG_TRIGGER_TEXT}</Button>
            </Dialog.Trigger>
            <Dialog.Content data-test-id={DIALOG_CONTENT_TEST_ID}>
                <Dialog.SideContent data-test-id={DIALOG_SIDE_CONTENT_TEST_ID}>
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
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
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
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
                    <div className="tw-bg-box-positive-strong tw-h-full tw-w-full"></div>
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
