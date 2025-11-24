/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Divider } from '../Divider';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Divider />);
    await expect(component).toBeVisible();
});

test('should render with data-test-id', async ({ mount }) => {
    const wrapper = await mount(<Divider data-test-id="test-id" />);
    const component = wrapper.getByTestId('test-id');
    await expect(component).toBeVisible();
});

test('should render with custom classname', async ({ mount }) => {
    const wrapper = await mount(<Divider className="tw-h-96" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-h-96/);
});

test('should render with style solid', async ({ mount }) => {
    const wrapper = await mount(<Divider variant="solid" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-solid/);
});

test('should render with style dashed', async ({ mount }) => {
    const wrapper = await mount(<Divider variant="dashed" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-dashed/);
});

test('should render with style noline', async ({ mount }) => {
    const wrapper = await mount(<Divider variant="noline" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-none/);
});

test('should render with color weak', async ({ mount }) => {
    const wrapper = await mount(<Divider color="weak" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-line-subtle/);
});

test('should render with color default', async ({ mount }) => {
    const wrapper = await mount(<Divider color="default" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-line-mid /);
});

test('should render with color strong', async ({ mount }) => {
    const wrapper = await mount(<Divider color="strong" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-line-strong/);
});

test('should render with direction vertical', async ({ mount }) => {
    const wrapper = await mount(<Divider direction="vertical" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-border-e/);
});

test('should render with padding none horizontal', async ({ mount }) => {
    const wrapper = await mount(<Divider padding="none" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).not.toHaveClass(/tw-my-/);
});

test('should render with padding none vertical', async ({ mount }) => {
    const wrapper = await mount(<Divider direction="vertical" padding="none" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).not.toHaveClass(/tw-mx-/);
});

test('should render with padding small horizontal', async ({ mount }) => {
    const wrapper = await mount(<Divider padding="small" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');

    await expect(component).toHaveClass(/tw-my-4/);
});

test('should render with padding small vertical', async ({ mount }) => {
    const wrapper = await mount(<Divider direction="vertical" padding="small" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-mx-4/);
});

test('should render with padding medium horizontal', async ({ mount }) => {
    const wrapper = await mount(<Divider padding="medium" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-my-7/);
});

test('should render with padding medium vertical', async ({ mount }) => {
    const wrapper = await mount(<Divider direction="vertical" padding="medium" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-mx-7/);
});

test('should render with padding large horizontal', async ({ mount }) => {
    const wrapper = await mount(<Divider padding="large" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-my-12/);
});

test('should render with padding large vertical', async ({ mount }) => {
    const wrapper = await mount(<Divider direction="vertical" padding="large" data-test-id="divider-root" />);
    const component = wrapper.getByTestId('divider-root');
    await expect(component).toHaveClass(/tw-mx-12/);
});
