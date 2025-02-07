/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { LoadingCircle } from '../LoadingCircle';

test('should render with defaults', async ({ mount }) => {
    const component = await mount(<LoadingCircle />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(113, 89, 215)');
    await expect(component).toHaveCSS('width', '32px');
    await expect(component).toHaveCSS('height', '32px');
});

test('should render x-small', async ({ mount }) => {
    const component = await mount(<LoadingCircle size="x-small" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '16px');
    await expect(component).toHaveCSS('height', '16px');
});

test('should render small', async ({ mount }) => {
    const component = await mount(<LoadingCircle size="small" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '20px');
    await expect(component).toHaveCSS('height', '20px');
});

test('should render medium', async ({ mount }) => {
    const component = await mount(<LoadingCircle size="medium" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '32px');
    await expect(component).toHaveCSS('height', '32px');
});

test('should render large', async ({ mount }) => {
    const component = await mount(<LoadingCircle size="large" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '64px');
    await expect(component).toHaveCSS('height', '64px');
});

test('should render progress variant', async ({ mount }) => {
    const component = await mount(<LoadingCircle variant="progress" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(113, 89, 215)');
});

test('should render success variant', async ({ mount }) => {
    const component = await mount(<LoadingCircle variant="success" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(21, 129, 111)');
});

test('should render danger variant', async ({ mount }) => {
    const component = await mount(<LoadingCircle variant="danger" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(217, 47, 76)');
});
