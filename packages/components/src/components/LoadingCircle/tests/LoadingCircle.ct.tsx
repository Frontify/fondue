/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { LoadingCircle } from '../LoadingCircle';

test('should render with defaults', async ({ mount }) => {
    const component = (await mount(<LoadingCircle data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(182, 10, 227)');
    await expect(component).toHaveCSS('width', '32px');
    await expect(component).toHaveCSS('height', '32px');
});

test('should render x-small', async ({ mount }) => {
    const component = (await mount(<LoadingCircle size="x-small" data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '16px');
    await expect(component).toHaveCSS('height', '16px');
});

test('should render small', async ({ mount }) => {
    const component = (await mount(<LoadingCircle size="small" data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '20px');
    await expect(component).toHaveCSS('height', '20px');
});

test('should render medium', async ({ mount }) => {
    const component = (await mount(<LoadingCircle size="medium" data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '32px');
    await expect(component).toHaveCSS('height', '32px');
});

test('should render large', async ({ mount }) => {
    const component = (await mount(<LoadingCircle size="large" data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('width', '64px');
    await expect(component).toHaveCSS('height', '64px');
});

test('should render progress variant', async ({ mount }) => {
    const component = (
        await mount(<LoadingCircle variant="progress" data-test-id="loading-circle-root" />)
    ).getByTestId('loading-circle-root');
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(182, 10, 227)');
});

test('should render success variant', async ({ mount }) => {
    const component = (await mount(<LoadingCircle variant="success" data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(22, 133, 0)');
});

test('should render danger variant', async ({ mount }) => {
    const component = (await mount(<LoadingCircle variant="danger" data-test-id="loading-circle-root" />)).getByTestId(
        'loading-circle-root',
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('border-left-color', 'rgb(222, 36, 23)');
});
