/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Grid } from '../Grid';

const GRID_TEXT = 'sample grid';

test('should render without error', async ({ mount }) => {
    const wrapper = await mount(
        <Grid data-test-id="grid-root">
            <div>{GRID_TEXT}1</div>
            <div>{GRID_TEXT}2</div>
            <div>{GRID_TEXT}3</div>
            <div>{GRID_TEXT}4</div>
            <div>{GRID_TEXT}5</div>
            <div>{GRID_TEXT}6</div>
            <div>{GRID_TEXT}7</div>
        </Grid>,
    );
    const component = wrapper.getByTestId('grid-root');

    await expect(component).toBeVisible();
    await expect(component).toContainText(
        `${GRID_TEXT}1${GRID_TEXT}2${GRID_TEXT}3${GRID_TEXT}4${GRID_TEXT}5${GRID_TEXT}6${GRID_TEXT}7`,
    );
});

test('should render with correct columns counts (number)', async ({ mount }) => {
    const wrapper = await mount(
        <Grid columns={3} data-test-id="grid-root">
            <div>{GRID_TEXT}1</div>
            <div>{GRID_TEXT}2</div>
            <div>{GRID_TEXT}3</div>
            <div>{GRID_TEXT}4</div>
            <div>{GRID_TEXT}5</div>
            <div>{GRID_TEXT}6</div>
        </Grid>,
    );
    const component = wrapper.getByTestId('grid-root');
    await expect(component).toHaveCSS('grid-template-columns', '416px 416px 416px');
});

test('should render with correct columns counts (string)', async ({ mount }) => {
    const wrapper = await mount(
        <Grid columns="repeat(6, 1fr)" data-test-id="grid-root">
            <div>{GRID_TEXT}1</div>
            <div>{GRID_TEXT}2</div>
            <div>{GRID_TEXT}3</div>
            <div>{GRID_TEXT}4</div>
            <div>{GRID_TEXT}5</div>
            <div>{GRID_TEXT}6</div>
        </Grid>,
    );

    const component = wrapper.getByTestId('grid-root');
    await expect(component).toHaveCSS('grid-template-columns', '208px 208px 208px 208px 208px 208px');
});

test('should not inherit parent props', async ({ mount }) => {
    const wrapper = await mount(
        <Grid p="20px" m="50px" data-test-id="grid-root">
            <Grid data-test-id="flex-child">{GRID_TEXT}</Grid>
        </Grid>,
    );
    const component = wrapper.getByTestId('grid-root');

    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('margin', '50px');

    const child = component.getByTestId('flex-child');

    await expect(child).not.toHaveCSS('padding', '20px');
    await expect(child).not.toHaveCSS('margin', '50px');
});

test('should render with size tokens', async ({ mount }) => {
    const wrapper = await mount(
        <Grid
            p={9}
            m={12}
            gapX={6}
            gapY={10}
            minWidth={120}
            width={256}
            minHeight={18}
            height={20}
            bottom={16}
            top={15}
            right={14}
            left={13}
            data-test-id="grid-root"
        >
            <Grid data-test-id="flex-child">{GRID_TEXT}</Grid>
        </Grid>,
    );
    const component = wrapper.getByTestId('grid-root');

    await expect(component).toHaveCSS('padding', '36px');
    await expect(component).toHaveCSS('margin', '48px');
    await expect(component).toHaveCSS('gap', '40px 24px');
    await expect(component).toHaveCSS('min-width', '480px');
    await expect(component).toHaveCSS('width', '1024px');
    await expect(component).toHaveCSS('min-height', '72px');
    await expect(component).toHaveCSS('height', '80px');
    await expect(component).toHaveCSS('bottom', '64px');
    await expect(component).toHaveCSS('top', '60px');
    await expect(component).toHaveCSS('right', '56px');
    await expect(component).toHaveCSS('left', '52px');
});

const ResponsiveComponent = (
    <Grid
        columns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        rows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        data-test-id="grid-root"
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
        const wrapper = await mount(ResponsiveComponent);
        const component = wrapper.getByTestId('grid-root');
        await expect(component).toHaveCSS('grid-template-columns', '168px');
    });

    test('should render with correct responsive row counts', async ({ mount }) => {
        const wrapper = await mount(ResponsiveComponent);
        const component = wrapper.getByTestId('grid-root');
        await expect(component).toHaveCSS('grid-template-rows', '24px 24px 24px 24px 24px 24px');
    });
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1600, height: 900 } });

    test('should render with responsive columns counts', async ({ mount }) => {
        const wrapper = await mount(ResponsiveComponent);
        const component = wrapper.getByTestId('grid-root');
        await expect(component).toHaveCSS('grid-template-columns', '784px 784px');
    });

    test('should render with correct responsive row counts', async ({ mount }) => {
        const wrapper = await mount(ResponsiveComponent);
        const component = wrapper.getByTestId('grid-root');
        await expect(component).toHaveCSS('grid-template-rows', '24px 24px 24px');
    });
});
