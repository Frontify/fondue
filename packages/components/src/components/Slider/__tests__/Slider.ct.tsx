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

test('should render a slider', async ({ mount }) => {
    const component = await mount(<Slider data-test-id={SLIDER_TEST_ID} aria-label={ARIA_LABEL} defaultValue={[0]} />);
    await expect(component).toBeVisible();
    await expect(component.getByRole('slider')).toBeVisible();
});

test('should render two sliders', async ({ mount }) => {
    const component = await mount(
        <Slider data-test-id={SLIDER_TEST_ID} aria-label={ARIA_LABEL} defaultValue={[33, 67]} />,
    );
    await expect(component).toBeVisible();
    const sliders = component.getByRole('slider');
    const allSliders = await sliders.all();
    for (const slider of allSliders) {
        await expect(slider).toBeVisible();
        await expect(slider).toHaveAttribute('aria-valuenow');
    }
    expect(allSliders).toHaveLength(2);
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
    const slider = component.getByRole('slider');
    const sliderBox = await slider.boundingBox();

    const wrapperBox = await component.boundingBox();

    if (!sliderBox || !wrapperBox) {
        throw new Error('Slider position not found');
    }

    const startingXPos = sliderBox.x + sliderBox.width / 2;
    const endingXPos = startingXPos + wrapperBox.width / 10;
    const startingYPos = sliderBox.y + sliderBox.height / 2;

    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    sinon.assert.notCalled(onCommit);
    sinon.assert.calledOnceWithExactly(onChange, [60]);

    await page.mouse.up();
    sinon.assert.calledOnceWithExactly(onCommit, [60]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('60');
});

test('should update values when arrows used', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(
        <Slider aria-label="volume-control" onChange={onChange} onCommit={onCommit} defaultValue={[50]} />,
    );
    const slider = component.getByRole('slider');
    await slider.focus();

    await page.keyboard.press('ArrowRight');
    sinon.assert.calledWithExactly(onChange, [51]);
    sinon.assert.calledWithExactly(onCommit, [51]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('51');

    await page.keyboard.press('ArrowLeft');
    sinon.assert.calledWithExactly(onChange, [50]);
    sinon.assert.calledWithExactly(onCommit, [50]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('50');

    await page.keyboard.press('Shift+ArrowRight');
    sinon.assert.calledWithExactly(onChange, [60]);
    sinon.assert.calledWithExactly(onCommit, [60]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('60');
});

test('should set and enforce min and max values', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(
        <Slider aria-label="range" min={20} max={50} defaultValue={[30]} onChange={onChange} onCommit={onCommit} />,
    );
    const slider = component.getByRole('slider');

    expect(await slider.getAttribute('aria-valuemin')).toBe('20');
    expect(await slider.getAttribute('aria-valuemax')).toBe('50');

    const sliderBox = await slider.boundingBox();
    const wrapperBox = await component.boundingBox();

    if (!sliderBox || !wrapperBox) {
        throw new Error('Slider position not found');
    }

    const startingXPos = sliderBox.x + sliderBox.width / 2;
    const endingXPos = startingXPos - wrapperBox.width;
    const startingYPos = sliderBox.y + sliderBox.height / 2;

    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    await page.mouse.up();

    sinon.assert.calledWithExactly(onChange, [20]);
    sinon.assert.calledWithExactly(onCommit, [20]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('20');
});

test('should not interact with slider when disabled', async ({ mount }) => {
    const component = await mount(<Slider aria-label="disabled-slider" disabled={true} />);
    expect(await component.getAttribute('aria-disabled')).toBe('true');
});

test('should set min steps between sliders', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(<Slider aria-label="range" minStepsBetweenThumbs={10} defaultValue={[0, 50]} />);

    const sliders = component.getByRole('slider');
    const allSliders = await sliders.all();
    const secondSlider = allSliders[1];

    if (!secondSlider) {
        throw new Error('Second slider not found');
    }

    const sliderBox = await secondSlider.boundingBox();
    const wrapperBox = await component.boundingBox();

    if (!sliderBox || !wrapperBox) {
        throw new Error('Slider position not found');
    }

    const startingXPos = sliderBox.x + sliderBox.width / 2;
    const endingXPos = startingXPos - wrapperBox.width / 2;
    const startingYPos = sliderBox.y + sliderBox.height / 2;

    await secondSlider.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    await page.mouse.up();

    sinon.assert.notCalled(onChange);
    sinon.assert.notCalled(onCommit);
    expect(await secondSlider.getAttribute('aria-valuenow')).toBe('50');
});
