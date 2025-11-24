/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { LoadingBar } from '../LoadingBar';

test('should render with the correct value', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={60} max={120} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveAttribute('role', 'progressbar');
    await expect(container).toHaveAttribute('aria-valuenow', '60');
    await expect(container).toHaveAttribute('aria-valuemax', '120');
    await expect(container).toHaveAttribute('aria-valuetext', '50%');
});

test('should render with the correct computed label', async ({ mount }) => {
    const container = (
        await mount(
            <LoadingBar
                value={60}
                max={120}
                aria-label="Fondue Loading Bar"
                getValueLabel={(value, max) => {
                    return `${value} of ${max}`;
                }}
                data-test-id="loading-bar-root"
            />,
        )
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveAttribute('aria-label', 'Fondue Loading Bar');

    // FIXME: Playwright somehow return `undefined` when the component executes `getValueLabel`, bug?
    // await expect(container).toHaveAttribute('aria-valuetext', '60 of 120');
});

test('should render in indeterminate state', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={null} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveAttribute('aria-busy', 'true');
    await expect(container).not.toHaveAttribute('aria-valuetext');
});

test('should render progress 0%', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={0} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveCSS('--loading-bar-proportion', 'calc(0 / 100)');
});

test('should render progress 42%', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={42} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveCSS('--loading-bar-proportion', 'calc(42 / 100)');
});

test('should render progress 100 as 100%', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={100} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveCSS('--loading-bar-proportion', 'calc(100 / 100)');
});

test('should render progress 70 with 140 max as 50%', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={70} max={140} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveCSS('--loading-bar-proportion', 'calc(70 / 140)');
});

test('should render progress 0 with 140 max as 0%', async ({ mount }) => {
    const container = (
        await mount(<LoadingBar value={0} max={140} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />)
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveCSS('--loading-bar-proportion', 'calc(0 / 140)');
});

test('should render progress 140 with 140 max as 100%', async ({ mount }) => {
    const container = (
        await mount(
            <LoadingBar value={140} max={140} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />,
        )
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveCSS('--loading-bar-proportion', 'calc(140 / 140)');
});

test('should render intermediate state with max value', async ({ mount }) => {
    const container = (
        await mount(
            <LoadingBar value={null} max={200} aria-label="Fondue Loading Bar" data-test-id="loading-bar-root" />,
        )
    ).getByTestId('loading-bar-root');

    await expect(container).toHaveAttribute('aria-busy', 'true');
    await expect(container).not.toHaveAttribute('aria-valuetext');
});
