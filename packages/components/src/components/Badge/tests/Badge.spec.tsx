/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Badge } from '../Badge';

const BADGE_TEXT = 'Frontify';
const BADGE_TEST_ID = 'badge';

describe('Badge component', () => {
    it('reacts on click', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Badge onClick={clickListener}>{BADGE_TEXT}</Badge>);
        const badge = getByTestId(BADGE_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        badge.click();
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on enter', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Badge onClick={clickListener}>{BADGE_TEXT}</Badge>);
        const badge = getByTestId(BADGE_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        badge.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on space', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Badge onClick={clickListener}>{BADGE_TEXT}</Badge>);
        const badge = getByTestId(BADGE_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        badge.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('does not react on click when disabled', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Badge onClick={clickListener} disabled>
                {BADGE_TEXT}
            </Badge>,
        );
        const badge = getByTestId(BADGE_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(badge).toHaveAttribute('disabled');
        badge.click();
        expect(clickListener).not.toHaveBeenCalled();
    });

    it('does not react on enter when disabled', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Badge onClick={clickListener} disabled>
                {BADGE_TEXT}
            </Badge>,
        );
        const badge = getByTestId(BADGE_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(badge).toHaveAttribute('disabled');
        badge.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).not.toHaveBeenCalled();
    });

    it('does not react on space when disabled', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Badge onClick={clickListener} disabled>
                {BADGE_TEXT}
            </Badge>,
        );
        const badge = getByTestId(BADGE_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(badge).toHaveAttribute('disabled');
        badge.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).not.toHaveBeenCalled();
    });
});
