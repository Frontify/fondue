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
    await expect(component).toContainText(GRID_TEXT);
    await expect(component).toHaveScreenshot();
});

const responsiveTests = [
    [
        'should render with responsive columns counts',
        '',
        async ({ mount }) => {
            const component = await mount(
                <Grid columns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
                    <div>{GRID_TEXT}1</div>
                    <div>{GRID_TEXT}2</div>
                    <div>{GRID_TEXT}3</div>
                    <div>{GRID_TEXT}4</div>
                    <div>{GRID_TEXT}5</div>
                    <div>{GRID_TEXT}6</div>
                    <div>{GRID_TEXT}7</div>
                </Grid>,
            );
            await expect(component).toHaveScreenshot();
        },
    ],
    [
        'should render with correct responsive row counts',
        '',
        async ({ mount }) => {
            const component = await mount(
                <Grid rows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
                    <div>{GRID_TEXT}1</div>
                    <div>{GRID_TEXT}2</div>
                    <div>{GRID_TEXT}3</div>
                    <div>{GRID_TEXT}4</div>
                    <div>{GRID_TEXT}5</div>
                    <div>{GRID_TEXT}6</div>
                    <div>{GRID_TEXT}7</div>
                </Grid>,
            );
            await expect(component).toHaveScreenshot();
        },
    ],
] as Parameters<typeof test>[];

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    for (const testContent of responsiveTests) {
        test(...testContent);
    }
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1201, height: 801 } });

    for (const testContent of responsiveTests) {
        test(...testContent);
    }
});
