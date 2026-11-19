/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EditableText } from '../EditableText';

describe('EditableText', () => {
    it('blurs and prevents default on plain Enter', () => {
        render(<EditableText>Edit me</EditableText>);
        const text = screen.getByText('Edit me');
        fireEvent.focus(text);
        text.focus();
        expect(fireEvent.keyDown(text, { key: 'Enter', code: 'Enter' })).toBe(false);
        expect(document.activeElement).not.toBe(text);
    });

    it('keeps focus and does not prevent default on Enter while composing', () => {
        render(<EditableText>Edit me</EditableText>);
        const text = screen.getByText('Edit me');
        fireEvent.focus(text);
        text.focus();
        expect(fireEvent.keyDown(text, { key: 'Enter', code: 'Enter', isComposing: true })).toBe(true);
        expect(document.activeElement).toBe(text);
    });

    it('keeps focus and does not prevent default on Enter with IME keyCode', () => {
        render(<EditableText>Edit me</EditableText>);
        const text = screen.getByText('Edit me');
        fireEvent.focus(text);
        text.focus();
        expect(fireEvent.keyDown(text, { key: 'Enter', code: 'Enter', keyCode: 229 })).toBe(true);
        expect(document.activeElement).toBe(text);
    });
});