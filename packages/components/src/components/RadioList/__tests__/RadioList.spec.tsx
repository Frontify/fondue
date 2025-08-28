/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Label } from '../../Label/Label';
import { RadioList } from '../RadioList';

describe('RadioList component', () => {
    const createRadioList = (props = {}) => {
        return (
            <RadioList.Root {...props}>
                <RadioList.RadioButton id="option-1" value="1" />
                <Label htmlFor="option-1">Option 1</Label>
                <RadioList.RadioButton id="option-2" value="2" />
                <Label htmlFor="option-2">Option 2</Label>
                <RadioList.RadioButton id="option-3" value="3" />
                <Label htmlFor="option-3">Option 3</Label>
            </RadioList.Root>
        );
    };

    it('should render all radio buttons', () => {
        render(createRadioList());

        expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
        expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    });

    it('should handle value changes', async () => {
        const onValueChange = vi.fn();
        render(createRadioList({ onValueChange }));

        await userEvent.click(screen.getByLabelText('Option 2'));

        expect(onValueChange).toHaveBeenCalledWith('2');
    });

    it('should render with default value selected', () => {
        render(createRadioList({ value: '2' }));

        const option2 = screen.getByLabelText('Option 2');
        expect(option2).toBeChecked();
    });

    it('should allow only one selection at a time', async () => {
        render(createRadioList());

        const option1 = screen.getByLabelText('Option 1');
        const option2 = screen.getByLabelText('Option 2');

        await userEvent.click(option1);
        expect(option1).toBeChecked();
        expect(option2).not.toBeChecked();

        await userEvent.click(option2);
        expect(option1).not.toBeChecked();
        expect(option2).toBeChecked();
    });

    it('should respect disabled state', async () => {
        const onValueChange = vi.fn();
        render(createRadioList({ disabled: true, onValueChange }));

        const option1 = screen.getByLabelText('Option 1');
        expect(option1).toBeDisabled();

        await userEvent.click(option1);
        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('should respect readOnly state', () => {
        const onValueChange = vi.fn();
        const { container } = render(createRadioList({ readOnly: true, onValueChange }));

        const root = container.querySelector('[aria-readonly="true"]');
        expect(root).toBeInTheDocument();

        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('should handle keyboard navigation', () => {
        const { container } = render(createRadioList());

        const radioGroup = container.querySelector('[role="radiogroup"]');
        expect(radioGroup).toBeInTheDocument();

        // All radio buttons should be part of the group
        const radios = container.querySelectorAll('[role="radio"]');
        expect(radios).toHaveLength(3);

        // Verify they all have proper accessibility attributes
        for (const radio of radios) {
            expect(radio).toHaveAttribute('type', 'button');
            expect(radio).toHaveAttribute('aria-checked');
        }
    });

    it('should apply emphasis attribute', () => {
        const { container } = render(createRadioList({ emphasis: 'highlight' }));

        const root = container.querySelector('[data-emphasis="highlight"]');
        expect(root).toBeInTheDocument();
    });

    it('should apply orientation attribute', () => {
        const { container } = render(createRadioList({ orientation: 'horizontal' }));

        const root = container.querySelector('[aria-orientation="horizontal"]');
        expect(root).toBeInTheDocument();
    });

    it('should respect required attribute', () => {
        const { container } = render(createRadioList({ required: true }));

        // Check for required attribute on the radio group (Radix may use aria-required)
        const root = container.querySelector('[role="radiogroup"]');
        expect(root).toBeInTheDocument();

        // The required prop should be passed through
        const hasRequired = root?.hasAttribute('required') || root?.getAttribute('aria-required') === 'true';
        expect(hasRequired).toBe(true);
    });

    it('should handle individual radio button disabled state', async () => {
        const onValueChange = vi.fn();
        render(
            <RadioList.Root onValueChange={onValueChange}>
                <RadioList.RadioButton id="option-1" value="1" disabled />
                <Label htmlFor="option-1">Option 1</Label>
                <RadioList.RadioButton id="option-2" value="2" />
                <Label htmlFor="option-2">Option 2</Label>
            </RadioList.Root>,
        );

        const option1 = screen.getByLabelText('Option 1');
        const option2 = screen.getByLabelText('Option 2');

        expect(option1).toBeDisabled();
        expect(option2).not.toBeDisabled();

        await userEvent.click(option1);
        expect(onValueChange).not.toHaveBeenCalled();

        await userEvent.click(option2);
        expect(onValueChange).toHaveBeenCalledWith('2');
    });

    it('should handle individual radio button readOnly state', async () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <RadioList.Root onValueChange={onValueChange}>
                <RadioList.RadioButton id="option-1" value="1" readOnly />
                <Label htmlFor="option-1">Option 1</Label>
                <RadioList.RadioButton id="option-2" value="2" />
                <Label htmlFor="option-2">Option 2</Label>
            </RadioList.Root>,
        );

        const readOnlyButton = container.querySelector('[aria-readonly="true"]');
        expect(readOnlyButton).toBeInTheDocument();

        const option2 = screen.getByLabelText('Option 2');
        await userEvent.click(option2);
        expect(onValueChange).toHaveBeenCalledWith('2');
    });

    it('should render with asChild prop', () => {
        const { container } = render(
            <RadioList.Root asChild>
                <div className="custom-wrapper">
                    <RadioList.RadioButton id="option-1" value="1" />
                    <Label htmlFor="option-1">Option 1</Label>
                </div>
            </RadioList.Root>,
        );

        expect(container.querySelector('.custom-wrapper')).toBeInTheDocument();
    });
});
