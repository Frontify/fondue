/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Checkbox } from '../Checkbox';

const CHECKBOX_ICON_CHECKED_TEST_ID = 'icon-checked';
const CHECKBOX_ICON_INDETERMINATE_TEST_ID = 'icon-indeterminate';

test('render with the checked icon', async ({ mount }) => {
    const component = (await mount(<Checkbox defaultValue data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await expect(component).toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).toBeVisible();
});

test('render with the indeterminate icon', async ({ mount }) => {
    const component = (await mount(<Checkbox defaultValue="indeterminate" data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await expect(component).toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_INDETERMINATE_TEST_ID)).toBeVisible();
});

test('render without any icon if unchecked', async ({ mount }) => {
    const component = (await mount(<Checkbox defaultValue={false} data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await expect(component).toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_INDETERMINATE_TEST_ID)).not.toBeVisible();
});

test('emits the change event', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = (await mount(<Checkbox onChange={onChange} data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await component.click();
    expect(onChange.called).toBe(true);
});

test('emits the focus and blur events', async ({ mount }) => {
    const onFocus = sinon.spy();
    const onBlur = sinon.spy();
    const component = (
        await mount(<Checkbox onFocus={onFocus} onBlur={onBlur} data-test-id="checkbox-root" />)
    ).getByTestId('checkbox-root');

    await component.focus();
    expect(onFocus.called).toBe(true);

    await component.blur();
    expect(onBlur.called).toBe(true);
});

test('loop through the checkbox state (without indeterminate)', async ({ mount }) => {
    const component = (await mount(<Checkbox defaultValue={false} data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await component.click();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).toBeVisible();

    await component.click();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).not.toBeVisible();
});

test('loop through the checkbox state (with indeterminate)', async ({ mount }) => {
    const component = (await mount(<Checkbox defaultValue="indeterminate" data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await expect(component.getByTestId(CHECKBOX_ICON_INDETERMINATE_TEST_ID)).toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).not.toBeVisible();

    await component.click();
    await expect(component.getByTestId(CHECKBOX_ICON_INDETERMINATE_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).toBeVisible();

    await component.click();
    await expect(component.getByTestId(CHECKBOX_ICON_INDETERMINATE_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).not.toBeVisible();

    await component.click();
    await expect(component.getByTestId(CHECKBOX_ICON_INDETERMINATE_TEST_ID)).not.toBeVisible();
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).toBeVisible();
});

test('loop through the checkbox state with keyboard', async ({ mount }) => {
    const component = (await mount(<Checkbox defaultValue={false} data-test-id="checkbox-root" />)).getByTestId(
        'checkbox-root',
    );

    await component.focus();
    await component.press('Space');
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).toBeVisible();

    await component.press('Space');
    await expect(component.getByTestId(CHECKBOX_ICON_CHECKED_TEST_ID)).not.toBeVisible();
});
