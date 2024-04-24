/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
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
});
