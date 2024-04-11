/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button, ButtonStyle } from '..';

const BUTTON_TEXT = 'Frontify';
const BUTTON_TEST_ID = 'button';

const styles: ButtonStyle[] = ['default', 'positive', 'negative', 'danger', 'loud'];

describe('Button component', () => {
    for (const style of styles) {
        it(`renders in ${style} medium and with only text.`, () => {
            const { getByTestId } = render(
                <Button style={style} size="medium">
                    {BUTTON_TEXT}
                </Button>,
            );
            const button = getByTestId(BUTTON_TEST_ID);
            expect(button).toBeVisible();
            expect(button).toContainHTML(BUTTON_TEXT);
        });

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

    it('reacts on click', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Button onClick={clickListener}>{BUTTON_TEXT}</Button>);
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        button.click();
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('does not react on click when disabled', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Button disabled>{BUTTON_TEXT}</Button>);
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('disabled');
        button.click();
        expect(clickListener).not.toHaveBeenCalled();
    });
});
