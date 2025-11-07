/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SplitButton } from '../SplitButton';

const SPLIT_BUTTON_TEXT = 'Primary Action';
const SPLIT_BUTTON_TEST_ID = 'split-button';
const CONTENT_TEST_ID = 'split-button-content';
const ACTION_TEST_ID = 'split-button-action';

describe('SplitButton component', () => {
    it('renders with content and action', () => {
        const { getByTestId } = render(
            <SplitButton>
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const splitButton = getByTestId(SPLIT_BUTTON_TEST_ID);
        const content = getByTestId(CONTENT_TEST_ID);
        const action = getByTestId(ACTION_TEST_ID);

        expect(splitButton).toBeInTheDocument();
        expect(content).toBeInTheDocument();
        expect(action).toBeInTheDocument();
        expect(content).toHaveTextContent(SPLIT_BUTTON_TEXT);
    });

    it('reacts on content click', async () => {
        const contentListener = vi.fn();
        const { getByTestId } = render(
            <SplitButton>
                <SplitButton.Content onPress={contentListener}>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const content = getByTestId(CONTENT_TEST_ID);
        expect(contentListener).not.toHaveBeenCalled();
        await userEvent.click(content);
        expect(contentListener).toHaveBeenCalledOnce();
    });

    it('applies correct data attributes', () => {
        const { getByTestId } = render(
            <SplitButton variant="positive" emphasis="strong" size="large">
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const splitButton = getByTestId(SPLIT_BUTTON_TEST_ID);
        expect(splitButton).toHaveAttribute('data-variant', 'positive');
        expect(splitButton).toHaveAttribute('data-emphasis', 'strong');
        expect(splitButton).toHaveAttribute('data-size', 'large');
    });

    it('applies disabled attribute', () => {
        const contentListener = vi.fn();
        const { getByTestId } = render(
            <SplitButton disabled>
                <SplitButton.Content onPress={contentListener}>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const splitButton = getByTestId(SPLIT_BUTTON_TEST_ID);
        expect(splitButton).toHaveAttribute('data-disabled', 'true');
    });

    it('reacts on enter key', async () => {
        const contentListener = vi.fn();
        const { getByTestId } = render(
            <SplitButton>
                <SplitButton.Content onPress={contentListener}>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const content = getByTestId(CONTENT_TEST_ID);
        expect(contentListener).not.toHaveBeenCalled();
        content.focus();
        await userEvent.keyboard('{Enter}');
        expect(contentListener).toHaveBeenCalledOnce();
    });

    it('reacts on space key', async () => {
        const contentListener = vi.fn();
        const { getByTestId } = render(
            <SplitButton>
                <SplitButton.Content onPress={contentListener}>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const content = getByTestId(CONTENT_TEST_ID);
        expect(contentListener).not.toHaveBeenCalled();
        content.focus();
        await userEvent.keyboard('{ }');
        expect(contentListener).toHaveBeenCalledOnce();
    });

    it('has role="group"', () => {
        const { getByTestId } = render(
            <SplitButton>
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        const splitButton = getByTestId(SPLIT_BUTTON_TEST_ID);
        expect(splitButton).toHaveAttribute('role', 'group');
    });

    it('forwards ref to root element', () => {
        const ref = vi.fn();
        render(
            <SplitButton ref={ref}>
                <SplitButton.Content>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        expect(ref).toHaveBeenCalled();
        expect(ref.mock.calls[0]?.[0]).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to content button', () => {
        const ref = vi.fn();
        render(
            <SplitButton>
                <SplitButton.Content ref={ref}>{SPLIT_BUTTON_TEXT}</SplitButton.Content>
                <SplitButton.Action>
                    <button type="button">Action</button>
                </SplitButton.Action>
            </SplitButton>,
        );

        expect(ref).toHaveBeenCalled();
        expect(ref.mock.calls[0]?.[0]).toBeInstanceOf(HTMLButtonElement);
    });
});
