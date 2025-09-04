/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from '../Tag';

const TAG_TEXT = 'Frontify';
const TAG_TEST_ID = 'tag';

describe('Tag component', () => {
    it('reacts on click', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Tag onClick={clickListener}>{TAG_TEXT}</Tag>);
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        tag.click();
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on enter', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Tag onClick={clickListener}>{TAG_TEXT}</Tag>);
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        tag.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('reacts on space', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Tag onClick={clickListener}>{TAG_TEXT}</Tag>);
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        tag.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('does not react on click when disabled', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Tag onClick={clickListener} disabled>
                {TAG_TEXT}
            </Tag>,
        );
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(tag).toHaveAttribute('disabled');
        tag.click();
        expect(clickListener).not.toHaveBeenCalled();
    });

    it('does not react on enter when disabled', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Tag onClick={clickListener} disabled>
                {TAG_TEXT}
            </Tag>,
        );
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(tag).toHaveAttribute('disabled');
        tag.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).not.toHaveBeenCalled();
    });

    it('does not react on space when disabled', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(
            <Tag onClick={clickListener} disabled>
                {TAG_TEXT}
            </Tag>,
        );
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        expect(tag).toHaveAttribute('disabled');
        tag.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).not.toHaveBeenCalled();
    });
});
