/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Divider } from '../Divider';

const DIVIDER_LINE_TEST_ID = '[data-test-id="fondue-divider-line"]';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Divider />);
    await expect(component).toBeVisible();
});

test('should render with data-test-id', async ({ mount }) => {
    const component = await mount(<Divider data-test-id="test-id" />);
    await expect(component).toHaveAttribute('data-test-id', 'test-id');
});

test('should render with custom classname', async ({ mount }) => {
    const component = await mount(<Divider className="tw-h-96" />);
    await expect(component).toHaveClass(/tw-h-96/);
});

test('should render with style solid', async ({ mount }) => {
    const component = await mount(<Divider style="solid" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-solid/);
});

test('should render with style dashed', async ({ mount }) => {
    const component = await mount(<Divider style="dashed" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-dashed/);
});

test('should render with style noline', async ({ mount }) => {
    const component = await mount(<Divider style="noline" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-none/);
});

test('should render with color weak', async ({ mount }) => {
    const component = await mount(<Divider color="weak" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-line-weak/);
});

test('should render with color default', async ({ mount }) => {
    const component = await mount(<Divider color="default" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-line /);
});

test('should render with color strong', async ({ mount }) => {
    const component = await mount(<Divider color="strong" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-line-strong/);
});

test('should render with color x-strong', async ({ mount }) => {
    const component = await mount(<Divider color="x-strong" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-line-x-strong/);
});

test('should render with direction vertical', async ({ mount }) => {
    const component = await mount(<Divider direction="vertical" />);
    await expect(component.locator(DIVIDER_LINE_TEST_ID)).toHaveClass(/tw-border-r/);
});

test('should render with padding none horizontal', async ({ mount }) => {
    const component = await mount(<Divider padding="none" />);
    await expect(component).toHaveClass(/tw-h-1/);
});

test('should render with padding none vertical', async ({ mount }) => {
    const component = await mount(<Divider direction="vertical" padding="none" />);
    await expect(component).toHaveClass(/tw-w-1/);
});

test('should render with padding small horizontal', async ({ mount }) => {
    const component = await mount(<Divider padding="small" />);
    await expect(component).toHaveClass(/tw-h-9/);
});

test('should render with padding small vertical', async ({ mount }) => {
    const component = await mount(<Divider direction="vertical" padding="small" />);
    await expect(component).toHaveClass(/tw-w-9/);
});

test('should render with padding medium horizontal', async ({ mount }) => {
    const component = await mount(<Divider padding="medium" />);
    await expect(component).toHaveClass(/tw-h-16/);
});

test('should render with padding medium vertical', async ({ mount }) => {
    const component = await mount(<Divider direction="vertical" padding="medium" />);
    await expect(component).toHaveClass(/tw-w-16/);
});

test('should render with padding large horizontal', async ({ mount }) => {
    const component = await mount(<Divider padding="large" />);
    await expect(component).toHaveClass(/tw-h-24/);
});

test('should render with padding large vertical', async ({ mount }) => {
    const component = await mount(<Divider direction="vertical" padding="large" />);
    await expect(component).toHaveClass(/tw-w-24/);
});
