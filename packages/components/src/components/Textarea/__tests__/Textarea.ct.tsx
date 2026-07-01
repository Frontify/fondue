/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Textarea } from '../Textarea';

const TEXTAREA_TEXT = 'sample text';
const TEXTAREA_LOADER_TEST_ID = 'fondue-textarea-loader';
const TEXTAREA_TEST_ID = 'fondue-textarea';
test('render with default value', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} defaultValue={TEXTAREA_TEXT} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toHaveValue(TEXTAREA_TEXT);
});
test('render with controlled value', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} value={TEXTAREA_TEXT} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toHaveValue(TEXTAREA_TEXT);
});

test('render with placeholder', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} placeholder={TEXTAREA_TEXT} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toHaveAttribute('placeholder', TEXTAREA_TEXT);
});

test('render decorator when provided', async ({ mount }) => {
    const decorator = <div data-test-id="decorator">@</div>;
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} decorator={decorator} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.getByTestId('decorator')).toBeVisible();
});

test('render loading status', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} status="loading" />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component).toHaveAttribute('data-status', 'loading');
    await expect(component.getByTestId(TEXTAREA_LOADER_TEST_ID)).toBeVisible();
});

test('render success status', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} status="success" />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component).toHaveAttribute('data-status', 'success');
});

test('render error status', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} status="error" />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component).toHaveAttribute('data-status', 'error');
});

test('render clear button when clearable', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} clearable value={TEXTAREA_TEXT} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('button:has(svg)')).toBeVisible();
});

test('clear button resets value', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} clearable value={TEXTAREA_TEXT} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await component.locator('button:has(svg)').click();
    await expect(component.locator('textarea')).toHaveValue('');
});

test('render extra actions', async ({ mount }) => {
    const actionSpy = sinon.spy();
    const extraActions = [
        {
            icon: <IconCross />,
            title: 'Action',
            callback: actionSpy,
        },
    ];

    const wrapper = await mount(
        <Textarea data-test-id={TEXTAREA_TEST_ID} extraActions={extraActions} defaultValue="Test" />,
    );
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);

    await component.locator('button[title="Action"]').click();
    expect(actionSpy.calledOnce).toBe(true);
});

test('emits change events', async ({ mount }) => {
    const onChange = sinon.spy();
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} onChange={onChange} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);

    await component.locator('textarea').pressSequentially(TEXTAREA_TEXT);
    expect(onChange.callCount).toBe(TEXTAREA_TEXT.length);
});

test('emits enter press event', async ({ mount }) => {
    const onEnterPressed = sinon.spy();
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} onEnterPressed={onEnterPressed} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);

    await component.locator('textarea').press('Enter');
    expect(onEnterPressed.calledOnce).toBe(true);
});

test('render disabled state', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} disabled />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toBeDisabled();
});

test('render read-only state', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} readOnly />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toHaveAttribute('readonly', '');
});

test('autosize functionality', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} autosize value={TEXTAREA_TEXT} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);
    await expect(component).toHaveAttribute('data-autosize', 'true');
});

test('render resize handle when resizable', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} resizable />);
    await expect(wrapper.getByTestId(`${TEXTAREA_TEST_ID}-resize-handle`)).toBeVisible();
});

test('no resize handle when not resizable', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} />);
    await expect(wrapper.getByTestId(`${TEXTAREA_TEST_ID}-resize-handle`)).toHaveCount(0);
});

test('no resize handle when disabled', async ({ mount }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} resizable disabled />);
    await expect(wrapper.getByTestId(`${TEXTAREA_TEST_ID}-resize-handle`)).toHaveCount(0);
});

test('dragging the resize handle changes the textarea height', async ({ mount, page }) => {
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} resizable />);
    const textarea = wrapper.getByTestId(TEXTAREA_TEST_ID).locator('textarea');
    const handle = wrapper.getByTestId(`${TEXTAREA_TEST_ID}-resize-handle`);

    const startBox = await textarea.boundingBox();
    const startHeight = startBox?.height ?? 0;
    const handleBox = await handle.boundingBox();
    if (!handleBox) {
        throw new Error('resize handle not found');
    }

    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2 + 80, { steps: 5 });
    await page.mouse.up();

    const endBox = await textarea.boundingBox();
    const endHeight = endBox?.height ?? 0;
    expect(endHeight).toBeGreaterThan(startHeight);
});

test('focus management', async ({ mount }) => {
    const onFocus = sinon.spy();
    const wrapper = await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} focusOnMount onFocus={onFocus} />);
    const component = wrapper.getByTestId(TEXTAREA_TEST_ID);

    await expect(component.locator('textarea')).toBeFocused();
    expect(onFocus.calledOnce).toBe(true);
});
