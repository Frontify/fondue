/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Grid } from '../Grid';

const GRID_TEXT = 'sample grid';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Grid>
            <div>{GRID_TEXT}1</div>
            <div>{GRID_TEXT}2</div>
            <div>{GRID_TEXT}3</div>
            <div>{GRID_TEXT}4</div>
            <div>{GRID_TEXT}5</div>
            <div>{GRID_TEXT}6</div>
            <div>{GRID_TEXT}7</div>
        </Grid>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(
        `${GRID_TEXT}1${GRID_TEXT}2${GRID_TEXT}3${GRID_TEXT}4${GRID_TEXT}5${GRID_TEXT}6${GRID_TEXT}7`,
    );
});

const ResponsiveComponent = (
    <Grid
        columns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        rows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
    >
        <div>{GRID_TEXT}1</div>
        <div>{GRID_TEXT}2</div>
        <div>{GRID_TEXT}3</div>
        <div>{GRID_TEXT}4</div>
        <div>{GRID_TEXT}5</div>
        <div>{GRID_TEXT}6</div>
    </Grid>
);

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    test('should render with responsive columns counts', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('grid-template-columns', '168px');
    });

    test('should render with correct responsive row counts', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('grid-template-rows', '24px 24px 24px 24px 24px 24px');
    });
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1600, height: 900 } });

    test('should render with responsive columns counts', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('grid-template-columns', '784px 784px');
    });

    test('should render with correct responsive row counts', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('grid-template-rows', '24px 24px 24px');
    });
});
