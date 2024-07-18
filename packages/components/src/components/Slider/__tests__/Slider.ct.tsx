/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Slider } from '../Slider';

const SLIDER_TEST_ID = 'test-slider';
const ARIA_LABEL = 'test slider';

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

test('should render with default value', async ({ mount }) => {
    const component = await mount(<Slider aria-label={ARIA_LABEL} defaultValue={[50]} />);
    const slider = component.getByRole('slider');
    expect(await slider.getAttribute('aria-valuenow')).toBe('50');
});

test('should render with controlled value', async ({ mount }) => {
    const component = await mount(<Slider aria-label={ARIA_LABEL} value={[20]} />);
    const slider = component.getByRole('slider');
    expect(await slider.getAttribute('aria-valuenow')).toBe('20');
});

test('should render with custom data-test-id', async ({ mount }) => {
    const component = await mount(<Slider data-test-id="custom-slider" aria-label={ARIA_LABEL} defaultValue={[0]} />);
    expect(await component.getAttribute('data-test-id')).toBe('custom-slider');
});

test('should render with custom aria-label', async ({ mount }) => {
    const component = await mount(
        <Slider data-test-id={SLIDER_TEST_ID} aria-label="custom-label" defaultValue={[0]} />,
    );
    expect(await component.getAttribute('aria-label')).toBe('custom-label');
});

test('should render with custom aria-labelledby', async ({ mount }) => {
    const component = await mount(
        <Slider data-test-id={SLIDER_TEST_ID} aria-labelledby="custom-label" defaultValue={[0]} />,
    );
    const ariaLabelledBy = await component.getAttribute('aria-labelledby');
    expect(ariaLabelledBy).toBe('custom-label');
});

test('should render with custom aria-describedby', async ({ mount }) => {
    const component = await mount(
        <Slider aria-label="custom-aria" aria-describedby="custom-description" defaultValue={[0]} />,
    );
    const ariaDescribedBy = await component.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toBe('custom-description');
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

    const travelPercentage = 10;
    const startingXPos = sliderBox.x + sliderBox.width / 2;
    const startingYPos = sliderBox.y + sliderBox.height / 2;
    const travelDistance = wrapperBox.width * (travelPercentage / 100);
    const endingXPos = startingXPos + travelDistance;

    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    expect(onCommit.notCalled).toBe(true);
    await page.mouse.up();

    sinon.assert.calledWithExactly(onChange, [60]);
    sinon.assert.calledWithExactly(onCommit, [60]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('60');
});

test('should set and enforce min and max values', async ({ mount, page, browserName }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(
        <Slider aria-label="range" min={20} max={40} defaultValue={[30]} onChange={onChange} onCommit={onCommit} />,
    );
    const slider = component.getByRole('slider');

    expect(await slider.getAttribute('aria-valuemin')).toBe('20');
    expect(await slider.getAttribute('aria-valuemax')).toBe('40');

    if (browserName !== 'firefox') {
        // for now we are not able to test this in firefox as its displaying flaky behaviour
        const sliderBox = await slider.boundingBox();

        const wrapperBox = await component.boundingBox();

        if (!sliderBox || !wrapperBox) {
            throw new Error('Slider position not found');
        }

        const startingXPos = sliderBox.x + sliderBox.width / 2;
        let travelPercentage = -100;
        let travelDistance = wrapperBox.width * (travelPercentage / 100);
        let startingYPos = sliderBox.y + sliderBox.height / 2;
        let endingXPos = startingXPos + travelDistance;

        await slider.hover();
        await page.mouse.down();
        await page.mouse.move(endingXPos, startingYPos);
        await page.mouse.up();

        sinon.assert.calledWithExactly(onChange, [20]);
        sinon.assert.calledWithExactly(onCommit, [20]);
        expect(await slider.getAttribute('aria-valuenow')).toBe('20');

        travelPercentage = 100;
        startingYPos = sliderBox.y + sliderBox.height / 2;
        travelDistance = wrapperBox.width * (travelPercentage / 100);
        endingXPos = startingXPos + travelDistance;

        await slider.hover();
        await page.mouse.down();
        await page.mouse.move(endingXPos, startingYPos);
        await page.mouse.up();
        await page.waitForTimeout(1000);

        // for now we are not able to test this in firefox as its displaying flaky behaviour
        sinon.assert.calledWithExactly(onChange, [40]);
        sinon.assert.calledWithExactly(onCommit, [40]);
        expect(await slider.getAttribute('aria-valuenow')).toBe('40');
    }
});

test('should not interact with slider when disabled', async ({ mount }) => {
    const component = await mount(<Slider aria-label="disabled-slider" disabled={true} defaultValue={[50]} />);

    expect(await component.getAttribute('aria-disabled')).toBe('true');
    expect(await component.getAttribute('data-disabled')).toBeDefined();

    const pointerEvents = await component.evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe('none');
});

test('should enforce min steps between sliders', async ({ mount, page }) => {
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

    const travelPercentage = -45;
    const startingXPos = sliderBox.x + sliderBox.width / 2;
    const startingYPos = sliderBox.y + sliderBox.height / 2;
    const travelDistance = wrapperBox.width * (travelPercentage / 100);
    const endingXPos = startingXPos + travelDistance;

    await secondSlider.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    await page.mouse.up();

    expect(onChange.notCalled).toBe(true);
    expect(onCommit.notCalled).toBe(true);
    expect(await secondSlider.getAttribute('aria-valuenow')).toBe('50');
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
