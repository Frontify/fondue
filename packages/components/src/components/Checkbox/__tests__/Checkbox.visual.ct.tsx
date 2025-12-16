/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Checkbox } from '../Checkbox';

test.describe('Visual Regression', () => {
    test('default size - unchecked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={false} data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('default-unchecked.png');
    });

    test('default size - checked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={true} data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('default-checked.png');
    });

    test('default size - indeterminate', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue="indeterminate" data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('default-indeterminate.png');
    });

    test('large size - unchecked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={false} size="large" data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('large-unchecked.png');
    });

    test('large size - checked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={true} size="large" data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('large-checked.png');
    });

    test('large size - indeterminate', async ({ mount }) => {
        const component = await mount(
            <Checkbox defaultValue="indeterminate" size="large" data-test-id="checkbox-root" />,
        );
        await expect(component).toHaveScreenshot('large-indeterminate.png');
    });

    test('weak emphasis - checked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={true} emphasis="weak" data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('weak-checked.png');
    });

    test('weak emphasis - indeterminate', async ({ mount }) => {
        const component = await mount(
            <Checkbox defaultValue="indeterminate" emphasis="weak" data-test-id="checkbox-root" />,
        );
        await expect(component).toHaveScreenshot('weak-indeterminate.png');
    });

    test('disabled - unchecked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={false} disabled data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('disabled-unchecked.png');
    });

    test('disabled - checked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={true} disabled data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('disabled-checked.png');
    });

    test('readonly - checked', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={true} readOnly data-test-id="checkbox-root" />);
        await expect(component).toHaveScreenshot('readonly-checked.png');
    });

    test('focus state', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={false} data-test-id="checkbox-root" />);
        await component.getByTestId('checkbox-root').focus();
        await expect(component).toHaveScreenshot('focus.png');
    });

    test('hover state', async ({ mount }) => {
        const component = await mount(<Checkbox defaultValue={false} data-test-id="checkbox-root" />);
        await component.getByTestId('checkbox-root').hover();
        await expect(component).toHaveScreenshot('hover.png');
    });
});
