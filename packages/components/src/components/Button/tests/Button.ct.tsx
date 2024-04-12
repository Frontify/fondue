/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../Button';

const BUTTON_TEXT = 'Frontify';
// const BUTTON_TEST_ID = 'fondue-button';

test.use({ viewport: { width: 500, height: 500 } });

test('should render without error', async ({ mount }) => {
    const component = await mount(<Button>{BUTTON_TEXT}</Button>);
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should render in positive medium and with only text.', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium">
            {BUTTON_TEXT}
        </Button>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should react on Click', async ({ mount }) => {
    const component = await mount(
        <Button style="positive" size="medium">
            {BUTTON_TEXT}
        </Button>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

test('should render in positive medium and with only icon.', async ({ mount }) => {
    const component = await mount(<Button style="positive" size="medium" icon={<IconIcon />} />);
    await expect(component).toBeVisible();
    await expect(component).toContainText(BUTTON_TEXT);
});

/*

it(`renders in ${style} medium with only an icon.`, () => {
    const { getByTestId } = render(<Button style={style} size="medium" icon={<IconIcon />} />);
    const button = getByTestId(BUTTON_TEST_ID);
    expect(button.getElementsByTagName('svg')[0]).toBeVisible();
    expect(button).not.toContainHTML(BUTTON_TEXT);
});

it(`renders in ${style} medium with only an icon and fully rounded.`, () => {
    const { getByTestId } = render(<Button style={style} size="medium" icon={<IconIcon />} rounding="full" />);
    const button = getByTestId(BUTTON_TEST_ID);
    expect(button.getElementsByTagName('svg')[0]).toBeVisible();
    expect(button).not.toContainHTML(BUTTON_TEXT);
    expect(button).toHaveClass('tw-rounded-full');
});

it(`renders in ${style} medium with an icon and text.`, () => {
    const { getByTestId } = render(
        <Button style={style} size="medium" icon={<IconIcon />}>
            {BUTTON_TEXT}
        </Button>,
    );
    const button = getByTestId(BUTTON_TEST_ID);
    expect(button).toBeVisible();
    expect(button).toContainHTML(BUTTON_TEXT);
    expect(button.querySelector('span > svg')).toBeVisible();
});
}


*/
