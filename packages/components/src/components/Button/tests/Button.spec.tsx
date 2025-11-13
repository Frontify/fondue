/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';

const BUTTON_TEXT = 'Frontify';
const BUTTON_TEST_ID = 'fondue-button';

describe('Button component', () => {
    it('reacts on click', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Button onPress={clickListener}>{BUTTON_TEXT}</Button>);
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        button.click();
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on enter', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Button onPress={clickListener}>{BUTTON_TEXT}</Button>);
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        button.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on space', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Button onPress={clickListener}>{BUTTON_TEXT}</Button>);
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        button.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on click when rendering a link', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Button onPress={clickListener} asChild>
                <a href="https://www.frontify.com/">{BUTTON_TEXT}</a>
            </Button>,
        );
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        button.click();
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('does not react on click when disabled', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Button onPress={clickListener} disabled>
                {BUTTON_TEXT}
            </Button>,
        );
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('disabled');
        button.click();
        expect(clickListener).not.toHaveBeenCalled();
    });

    it('does not react on enter when disabled', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Button onPress={clickListener} disabled>
                {BUTTON_TEXT}
            </Button>,
        );
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('disabled');
        button.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).not.toHaveBeenCalled();
    });

    it('does not react on space when disabled', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Button onPress={clickListener} disabled>
                {BUTTON_TEXT}
            </Button>,
        );
        const button = getByTestId(BUTTON_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('disabled');
        button.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).not.toHaveBeenCalled();
    });
});
