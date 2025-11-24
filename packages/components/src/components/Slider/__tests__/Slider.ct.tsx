/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';
import sinon from 'sinon';

import { Slider } from '../Slider';

const SLIDER_TEST_ID = 'test-slider';
const ARIA_LABEL = 'test slider';

async function dragSlider(
    page: Page,
    container: Locator,
    slider: Locator,
    travelPercentage: number,
    onBeforeMouseUp?: () => void,
) {
    const sliderBox = await slider.boundingBox();

    const containerBox = await container.boundingBox();

    if (!sliderBox || !containerBox) {
        throw new Error('Slider position not found');
    }

    const startingXPos = sliderBox.x + sliderBox.width / 2;
    const travelDistance = containerBox.width * (travelPercentage / 100);
    const endingXPos = startingXPos + travelDistance;
    const startingYPos = sliderBox.y + sliderBox.height / 2;

    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(endingXPos, startingYPos);
    onBeforeMouseUp?.();
    await page.mouse.up();
}

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

test('should render with custom aria attributes and test id', async ({ mount }) => {
    const component = (
        await mount(
            <Slider
                data-test-id={SLIDER_TEST_ID}
                aria-label="custom-label"
                aria-labelledby="custom-label"
                aria-describedby="custom-description"
                defaultValue={[0]}
            />,
        )
    ).getByTestId(SLIDER_TEST_ID);
    expect(await component.getAttribute('data-test-id')).toBe('test-slider');
    expect(await component.getAttribute('aria-label')).toBe('custom-label');
    expect(await component.getAttribute('aria-labelledby')).toBe('custom-label');
    expect(await component.getAttribute('aria-describedby')).toBe('custom-description');
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

    await dragSlider(page, component, slider, 10, onBeforeMouseUp);

    function onBeforeMouseUp() {
        expect(onCommit.notCalled).toBe(true);
    }

    sinon.assert.calledWithExactly(onChange, [60]);
    sinon.assert.calledWithExactly(onCommit, [60]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('60');
});

test('should set and enforce min and max values', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const wrapper = await mount(
        <div style={{ position: 'relative', display: 'block', width: '300px', padding: '0 100px' }}>
            <Slider
                data-test-id={SLIDER_TEST_ID}
                aria-label="range"
                min={20}
                max={40}
                defaultValue={[30]}
                onChange={onChange}
                onCommit={onCommit}
            />
        </div>,
    );
    const component = wrapper.getByTestId(SLIDER_TEST_ID);

    const slider = component.getByRole('slider');

    expect(await slider.getAttribute('aria-valuemin')).toBe('20');
    expect(await slider.getAttribute('aria-valuemax')).toBe('40');

    await dragSlider(page, component, slider, -100);

    sinon.assert.calledWithExactly(onChange, [20]);
    sinon.assert.calledWithExactly(onCommit, [20]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('20');

    await dragSlider(page, component, slider, 100);

    sinon.assert.calledWithExactly(onChange, [40]);
    sinon.assert.calledWithExactly(onCommit, [40]);
    expect(await slider.getAttribute('aria-valuenow')).toBe('40');
});

test('should not interact with slider when disabled', async ({ mount }) => {
    const component = (
        await mount(<Slider aria-label="disabled-slider" disabled defaultValue={[50]} data-test-id={SLIDER_TEST_ID} />)
    ).getByTestId(SLIDER_TEST_ID);

    expect(await component.getAttribute('aria-disabled')).toBe('true');
    expect(await component.getAttribute('data-disabled')).toBeDefined();

    const pointerEvents = await component.evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe('none');
});

test('should enforce min steps between thumbs', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const onCommit = sinon.spy();
    const component = await mount(<Slider aria-label="range" minStepsBetweenThumbs={10} defaultValue={[0, 50]} />);

    const sliders = component.getByRole('slider');
    const allSliders = await sliders.all();
    const secondSlider = allSliders[1];

    if (!secondSlider) {
        throw new Error('Second slider not found');
    }

    await dragSlider(page, component, secondSlider, -45);

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
