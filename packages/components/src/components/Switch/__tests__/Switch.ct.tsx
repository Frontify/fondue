import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Switch } from '../Switch';

test('should toggle switch state', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(<Switch onChange={onChange} defaultValue={false} />);
    await expect(component).toHaveAttribute('aria-checked', 'false');
    await component.click();
    sinon.assert.calledOnceWithExactly(onChange, true);
    await expect(component).toHaveAttribute('aria-checked', 'true');
});

test('should handle controlled component behavior', async ({ mount }) => {
    let checked = false;
    const onChange = sinon.spy((newChecked) => {
        checked = newChecked;
    });
    const component = await mount(<Switch value={checked} onChange={onChange} />);
    expect(await component.getAttribute('aria-checked')).toBe('false');
    await component.click();
    sinon.assert.calledOnceWithExactly(onChange, true);
});

test('should apply size and full width classes', async ({ mount }) => {
    const component = await mount(<Switch />);
    await expect(component).toHaveClass(/medium/);

    component.update(<Switch size="large" />);
    await expect(component).toHaveClass(/large/);

    component.update(<Switch size="small" />);
    await expect(component).toHaveClass(/small/);

    component.update(<Switch hugWidth={true} />);
    await expect(component).toHaveClass(/fullwidth/);
});

test('should respect the disabled state', async ({ mount }) => {
    const component = await mount(<Switch disabled={true} />);
    await expect(component).toHaveAttribute('disabled');
});

test('should prevent form submission if switch is required and not toggled', async ({ mount }) => {
    const onSubmit = sinon.spy();

    const component = await mount(
        <form onSubmit={onSubmit}>
            <Switch name="consent" data-test-id="consent-switch" required />
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
