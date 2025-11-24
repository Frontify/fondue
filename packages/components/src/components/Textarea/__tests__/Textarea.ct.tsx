/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Textarea } from '../Textarea';

const TEXTAREA_TEXT = 'sample text';
const TEXTAREA_LOADER_TEST_ID = 'fondue-textarea-loader';
const TEXTAREA_TEST_ID = 'fondue-textarea';
test('render with default value', async ({ mount }) => {
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} defaultValue={TEXTAREA_TEXT} />)
    ).getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toHaveValue(TEXTAREA_TEXT);
});

test('render with controlled value', async ({ mount }) => {
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} value={TEXTAREA_TEXT} />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component.locator('textarea')).toHaveValue(TEXTAREA_TEXT);
});

test('render with placeholder', async ({ mount }) => {
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} placeholder={TEXTAREA_TEXT} />)
    ).getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('textarea')).toHaveAttribute('placeholder', TEXTAREA_TEXT);
});

test('render decorator when provided', async ({ mount }) => {
    const decorator = <div data-test-id="decorator">@</div>;
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} decorator={decorator} />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component.getByTestId('decorator')).toBeVisible();
});

test('render loading status', async ({ mount }) => {
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} status="loading" />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component).toHaveAttribute('data-status', 'loading');
    await expect(component.getByTestId(TEXTAREA_LOADER_TEST_ID)).toBeVisible();
});

test('render success status', async ({ mount }) => {
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} status="success" />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component).toHaveAttribute('data-status', 'success');
});

test('render error status', async ({ mount }) => {
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} status="error" />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component).toHaveAttribute('data-status', 'error');
});

test('render clear button when clearable', async ({ mount }) => {
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} clearable value={TEXTAREA_TEXT} />)
    ).getByTestId(TEXTAREA_TEST_ID);
    await expect(component.locator('button:has(svg)')).toBeVisible();
});

test('clear button resets value', async ({ mount }) => {
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} clearable value={TEXTAREA_TEXT} />)
    ).getByTestId(TEXTAREA_TEST_ID);
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

    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} extraActions={extraActions} defaultValue="Test" />)
    ).getByTestId(TEXTAREA_TEST_ID);

    await component.locator('button[title="Action"]').click();
    expect(actionSpy.calledOnce).toBe(true);
});

test('emits change events', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} onChange={onChange} />)).getByTestId(
        TEXTAREA_TEST_ID,
    );

    await component.locator('textarea').pressSequentially(TEXTAREA_TEXT);
    expect(onChange.callCount).toBe(TEXTAREA_TEXT.length);
});

test('emits enter press event', async ({ mount }) => {
    const onEnterPressed = sinon.spy();
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} onEnterPressed={onEnterPressed} />)
    ).getByTestId(TEXTAREA_TEST_ID);

    await component.locator('textarea').press('Enter');
    expect(onEnterPressed.calledOnce).toBe(true);
});

test('render disabled state', async ({ mount }) => {
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} disabled />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component.locator('textarea')).toBeDisabled();
});

test('render read-only state', async ({ mount }) => {
    const component = (await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} readOnly />)).getByTestId(
        TEXTAREA_TEST_ID,
    );
    await expect(component.locator('textarea')).toHaveAttribute('readonly', '');
});

test('autosize functionality', async ({ mount }) => {
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} autosize value={TEXTAREA_TEXT} />)
    ).getByTestId(TEXTAREA_TEST_ID);
    await expect(component).toHaveAttribute('data-autosize', 'true');
});

test('focus management', async ({ mount }) => {
    const onFocus = sinon.spy();
    const component = (
        await mount(<Textarea data-test-id={TEXTAREA_TEST_ID} focusOnMount onFocus={onFocus} />)
    ).getByTestId(TEXTAREA_TEST_ID);

    await expect(component.locator('textarea')).toBeFocused();
    expect(onFocus.calledOnce).toBe(true);
});
