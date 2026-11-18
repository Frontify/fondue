/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from '../Textarea';

describe('Textarea', () => {
    it('calls onEnterPressed and onKeyDown on plain Enter', () => {
        const onEnterPressed = vi.fn();
        const onKeyDown = vi.fn();
        render(<Textarea onEnterPressed={onEnterPressed} onKeyDown={onKeyDown} />);
        const field = screen.getByRole('textbox');
        fireEvent.keyDown(field, { key: 'Enter', code: 'Enter' });
        expect(onEnterPressed).toHaveBeenCalledTimes(1);
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('skips onEnterPressed but calls onKeyDown on Enter while composing', () => {
        const onEnterPressed = vi.fn();
        const onKeyDown = vi.fn();
        render(<Textarea onEnterPressed={onEnterPressed} onKeyDown={onKeyDown} />);
        const field = screen.getByRole('textbox');
        fireEvent.keyDown(field, { key: 'Enter', code: 'Enter', isComposing: true });
        expect(onEnterPressed).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('skips onEnterPressed but calls onKeyDown on Enter with IME keyCode', () => {
        const onEnterPressed = vi.fn();
        const onKeyDown = vi.fn();
        render(<Textarea onEnterPressed={onEnterPressed} onKeyDown={onKeyDown} />);
        const field = screen.getByRole('textbox');
        fireEvent.keyDown(field, { key: 'Enter', code: 'Enter', keyCode: 229 });
        expect(onEnterPressed).not.toHaveBeenCalled();
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
});