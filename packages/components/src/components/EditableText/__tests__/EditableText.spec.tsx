/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EditableText } from '../EditableText';

const TEST_ID = 'fondue-editable-text';
const SAMPLE_TEXT = 'sample text';

describe('EditableText Component', () => {
    it('should render children correctly', () => {
        render(<EditableText>{SAMPLE_TEXT}</EditableText>);

        const component = screen.getByTestId(TEST_ID);

        expect(component).toBeInTheDocument();
        expect(component).toHaveTextContent(SAMPLE_TEXT);
    });

    it('should render the text element as a span by default', () => {
        render(<EditableText>{SAMPLE_TEXT}</EditableText>);

        const textbox = screen.getByRole('textbox');

        expect(textbox.tagName).toBe('SPAN');
    });

    it('should render as child element when asChild is true', () => {
        render(
            <EditableText asChild>
                <h1>{SAMPLE_TEXT}</h1>
            </EditableText>,
        );

        const textbox = screen.getByRole('textbox');

        expect(textbox.tagName).toBe('H1');
        expect(textbox).toHaveTextContent(SAMPLE_TEXT);
    });

    it('should enable contentEditable on focus', () => {
        render(<EditableText>{SAMPLE_TEXT}</EditableText>);

        const textbox = screen.getByRole('textbox');

        expect(textbox).not.toHaveAttribute('contenteditable');

        fireEvent.focus(textbox);

        expect(textbox).toHaveAttribute('contenteditable', 'plaintext-only');
    });

    it('should disable contentEditable on blur', () => {
        render(<EditableText>{SAMPLE_TEXT}</EditableText>);

        const textbox = screen.getByRole('textbox');
        fireEvent.focus(textbox);
        fireEvent.blur(textbox);

        expect(textbox).not.toHaveAttribute('contenteditable');
    });

    it('should call onChange with textContent on input', () => {
        const handleChange = vi.fn();
        render(<EditableText onChange={handleChange}>{SAMPLE_TEXT}</EditableText>);

        const textbox = screen.getByRole('textbox');
        textbox.textContent = 'new text';
        fireEvent.input(textbox);

        expect(handleChange).toHaveBeenCalledWith('new text');
    });

    it('should support custom data-test-id', () => {
        const customTestId = 'custom-test-id';
        render(<EditableText data-test-id={customTestId}>{SAMPLE_TEXT}</EditableText>);

        const component = screen.getByTestId(customTestId);

        expect(component).toBeInTheDocument();
    });

    it('should show editing state on wrapper when focused', () => {
        render(<EditableText>{SAMPLE_TEXT}</EditableText>);

        const wrapper = screen.getByTestId(TEST_ID);
        const textbox = screen.getByRole('textbox');

        expect(wrapper).toHaveAttribute('data-editing', 'false');

        fireEvent.focus(textbox);

        expect(wrapper).toHaveAttribute('data-editing', 'true');
    });

    it('should render a pen icon', () => {
        render(<EditableText>{SAMPLE_TEXT}</EditableText>);

        const icon = screen.getByTestId(TEST_ID).querySelector('svg');

        expect(icon).toBeInTheDocument();
    });
});
