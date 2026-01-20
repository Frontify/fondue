/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from '../Tag';

const TAG_TEXT = 'Frontify';
const TAG_TEST_ID = 'tag';

describe('Tag component', () => {
    it('should react on click', () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Tag onClick={clickListener}>{TAG_TEXT}</Tag>);
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        tag.click();
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('should react on enter', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Tag onClick={clickListener}>{TAG_TEXT}</Tag>);
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        tag.focus();
        await userEvent.keyboard('{Enter}');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('should react on space', async () => {
        const clickListener = vi.fn();
        const { getByTestId } = render(<Tag onClick={clickListener}>{TAG_TEXT}</Tag>);
        const tag = getByTestId(TAG_TEST_ID);
        expect(clickListener).not.toHaveBeenCalled();
        tag.focus();
        await userEvent.keyboard('{ }');
        expect(clickListener).toHaveBeenCalledOnce();
    });

    it('should not react on click when disabled', () => {
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

    it('should not react on enter when disabled', async () => {
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

    it('should not react on space when disabled', async () => {
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

    describe('ref forwarding', () => {
        it('should forward ref to HTMLDivElement when onClick is not provided', () => {
            const ref = createRef<HTMLDivElement>();
            render(<Tag ref={ref}>{TAG_TEXT}</Tag>);

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });

        it('should forward ref to HTMLButtonElement when onClick is provided', () => {
            const ref = createRef<HTMLButtonElement>();
            render(
                <Tag ref={ref} onClick={() => {}}>
                    {TAG_TEXT}
                </Tag>,
            );

            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });

        it('should point ref to the main content element', () => {
            const ref = createRef<HTMLDivElement>();
            const { getByTestId } = render(<Tag ref={ref}>{TAG_TEXT}</Tag>);

            const tag = getByTestId(TAG_TEST_ID);
            expect(ref.current).toBe(tag);
        });

        it('should point ref to the button element when clickable', () => {
            const ref = createRef<HTMLButtonElement>();
            const { getByTestId } = render(
                <Tag ref={ref} onClick={() => {}}>
                    {TAG_TEXT}
                </Tag>,
            );

            const tag = getByTestId(TAG_TEST_ID);
            expect(ref.current).toBe(tag);
        });
    });
});
