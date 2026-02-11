/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ClearButton } from '../components/ClearButton';

describe('ClearButton', () => {
    it('renders children inside the slot', () => {
        render(
            <ClearButton onClear={vi.fn()}>
                <button type="button">Clear</button>
            </ClearButton>,
        );

        expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('calls onClear when clicked', async () => {
        const onClear = vi.fn();
        const user = userEvent.setup();

        render(
            <ClearButton onClear={onClear}>
                <button type="button">Clear</button>
            </ClearButton>,
        );

        await user.click(screen.getByText('Clear'));

        expect(onClear).toHaveBeenCalledOnce();
    });

    it('stops event propagation on click', async () => {
        const onClear = vi.fn();
        const outerClick = vi.fn();
        const user = userEvent.setup();

        render(
            // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
            <div onClick={outerClick}>
                <ClearButton onClear={onClear}>
                    <button type="button">Clear</button>
                </ClearButton>
            </div>,
        );

        await user.click(screen.getByText('Clear'));

        expect(onClear).toHaveBeenCalledOnce();
        expect(outerClick).not.toHaveBeenCalled();
    });

    it('has aria-label for accessibility', () => {
        render(
            <ClearButton onClear={vi.fn()}>
                <button type="button">Clear</button>
            </ClearButton>,
        );

        expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
    });
});
