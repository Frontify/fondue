/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Switch } from '../Switch';

const ARIA_LABEL = 'Toggle airplane mode';

test('should toggle switch state', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(<Switch aria-label={ARIA_LABEL} onChange={onChange} defaultValue={false} />);

    await expect(component).toHaveAttribute('aria-checked', 'false');
    await component.click();

    sinon.assert.calledOnceWithExactly(onChange, true);
    await expect(component).toHaveAttribute('aria-checked', 'true');
});

test('should handle controlled component behavior', async ({ mount }) => {
    let checked = false;
    const onChange = sinon.spy((newChecked: boolean) => {
        checked = newChecked;
    });

    const component = await mount(<Switch aria-label={ARIA_LABEL} value={checked} onChange={onChange} />);

    expect(await component.getAttribute('aria-checked')).toBe('false');

    await component.click();
    sinon.assert.calledOnceWithExactly(onChange, true);
});

test('should apply size classes', async ({ mount }) => {
    const component = await mount(<Switch aria-label={ARIA_LABEL} />);
    await expect(component).toHaveClass(/medium/);

    await component.update(<Switch aria-label={ARIA_LABEL} size="large" />);
    await expect(component).toHaveClass(/large/);

    await component.update(<Switch aria-label={ARIA_LABEL} size="small" />);
    await expect(component).toHaveClass(/small/);
});

test('should update value when user focuses and presses enter', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(<Switch aria-label={ARIA_LABEL} onChange={onChange} />);

    await component.focus();

    await component.press('Enter');
    expect(await component.getAttribute('aria-checked')).toBe('true');
    sinon.assert.calledWithExactly(onChange, true);

    await component.press('Enter');
    expect(await component.getAttribute('aria-checked')).toBe('false');
    sinon.assert.calledWithExactly(onChange, false);
});

test('should respect the disabled state', async ({ mount }) => {
    const component = await mount(<Switch aria-label={ARIA_LABEL} disabled />);
    await expect(component).toHaveAttribute('disabled');
});

test('should prevent form submission if switch is required and not toggled', async ({ mount }) => {
    const onSubmit = sinon.spy();

    const component = await mount(
        <form onSubmit={onSubmit}>
            <Switch aria-label={ARIA_LABEL} name="consent" data-test-id="consent-switch" required />
            <br />
            <button data-test-id="submit-button" type="submit">
                Submit
            </button>
        </form>,
    );

    await component.getByTestId('submit-button').click();
    sinon.assert.notCalled(onSubmit);

    await component.getByTestId('consent-switch').click();
    await component.getByTestId('submit-button').click();
    sinon.assert.calledOnce(onSubmit);
});
