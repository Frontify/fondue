/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Slider } from '../Slider';

const SLIDER_TEST_ID = 'test-slider';
const ARIA_LABEL = 'sample slider';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Slider data-test-id={SLIDER_TEST_ID} aria-label={ARIA_LABEL} defaultValue={[0]} />);
    await expect(component).toBeVisible();
});

test('should render a thumb', async ({ mount }) => {
    const component = await mount(<Slider data-test-id={SLIDER_TEST_ID} aria-label={ARIA_LABEL} defaultValue={[0]} />);
    await expect(component).toBeVisible();
    await expect(component.getByRole('slider')).toBeVisible();
});

test('should render two thumbs', async ({ mount }) => {
    const component = await mount(
        <Slider data-test-id={SLIDER_TEST_ID} aria-label={ARIA_LABEL} defaultValue={[33, 67]} />,
    );
    await expect(component).toBeVisible();
    const thumbs = component.getByRole('slider');
    const allThumbs = await thumbs.all();
    for (const thumb of allThumbs) {
        await expect(thumb).toBeVisible();
        await expect(thumb).toHaveAttribute('aria-valuenow');
    }
    expect(allThumbs).toHaveLength(2);
});

test('should handle controlled component behavior', async ({ mount }) => {
    let value = [20];
    const component = await mount(
        <Slider
            aria-label="volume-control"
            value={value}
            onChange={(newValue) => {
                value = newValue;
            }}
        />,
    );
    const slider = component.getByRole('slider');
    const ariaValue = await slider.getAttribute('aria-valuenow');
    expect(ariaValue).toBe('20');
});

test('should update values when mouse dragged', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(
        <Slider aria-label="volume-control" onChange={onChange} onCommit={onCommit} defaultValue={[50]} />,
    );
    const thumb = component.getByRole('slider');
    const thumbBox = await thumb.boundingBox();

    if (!thumbBox) {
        throw new Error('Thumb position not found');
    }

    const startingXPos = thumbBox.x + thumbBox.width;
    const endingXPos = startingXPos + 10;
    const startingYPos = thumbBox.y;

    await thumb.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    sinon.assert.notCalled(onCommit);
    sinon.assert.calledOnceWithExactly(onChange, [60]);

    await page.mouse.up();
    sinon.assert.calledOnceWithExactly(onCommit, [60]);
    expect(await thumb.getAttribute('aria-valuenow')).toBe('60');
});

test('should update values when arrows used', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(
        <Slider aria-label="volume-control" onChange={onChange} onCommit={onCommit} defaultValue={[50]} />,
    );
    const thumb = component.getByRole('slider');
    await thumb.focus();

    await page.keyboard.press('ArrowRight');
    sinon.assert.calledWithExactly(onChange, [51]);
    sinon.assert.calledWithExactly(onCommit, [51]);
    expect(await thumb.getAttribute('aria-valuenow')).toBe('51');

    await page.keyboard.press('ArrowLeft');
    sinon.assert.calledWithExactly(onChange, [50]);
    sinon.assert.calledWithExactly(onCommit, [50]);
    expect(await thumb.getAttribute('aria-valuenow')).toBe('50');

    await page.keyboard.press('Shift+ArrowRight');
    sinon.assert.calledWithExactly(onChange, [60]);
    sinon.assert.calledWithExactly(onCommit, [60]);
    expect(await thumb.getAttribute('aria-valuenow')).toBe('60');
});

test('should set min and max values', async ({ mount }) => {
    const component = await mount(<Slider aria-label="range" min={20} max={50} />);
    const slider = component.getByRole('slider');
    expect(await slider.getAttribute('aria-valuemin')).toBe('20');
    expect(await slider.getAttribute('aria-valuemax')).toBe('50');
});

test('should display min and max values when showMinMax is true', async ({ mount }) => {
    const component = await mount(<Slider aria-label="range" showMinMax={true} min={0} max={200} />);
    await expect(component.locator('text=0 - 200')).toBeVisible();
});

test('should not interact with slider when disabled', async ({ mount }) => {
    const component = await mount(<Slider aria-label="disabled-slider" disabled={true} />);
    expect(await component.getAttribute('aria-disabled')).toBe('true');
});
