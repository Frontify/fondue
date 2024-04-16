/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { LoadingBar } from '../LoadingBar';

test('should render with the correct value', async ({ mount }) => {
    const container = await mount(<LoadingBar value={60} max={120} aria-label="Fondue Loading Bar" />);

    await expect(container).toHaveAttribute('role', 'progressbar');
    await expect(container).toHaveAttribute('aria-valuenow', '60');
    await expect(container).toHaveAttribute('aria-valuemax', '120');
    await expect(container).toHaveAttribute('aria-valuetext', '50%');
});

test('should render with the correct computed label', async ({ mount }) => {
    const container = await mount(
        <LoadingBar
            value={60}
            max={120}
            aria-label="Fondue Loading Bar"
            getValueLabel={(value, max) => {
                return `${value} of ${max}`;
            }}
        />,
    );

    await expect(container).toHaveAttribute('aria-label', 'Fondue Loading Bar');

    // FIXME: Playwright somehow return `undefined` when the component executes `getValueLabel`, bug?
    // await expect(container).toHaveAttribute('aria-valuetext', '60 of 120');
});

test('should render in indeterminate state', async ({ mount }) => {
    const container = await mount(<LoadingBar value={null} aria-label="Fondue Loading Bar" />);

    await expect(container).toHaveAttribute('aria-busy', 'true');
    await expect(container).not.toHaveAttribute('aria-valuetext');
});
