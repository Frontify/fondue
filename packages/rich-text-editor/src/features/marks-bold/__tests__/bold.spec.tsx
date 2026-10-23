/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mountText, para, text } from '#/react/__tests__/fixtures/text';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

type Mounted = ReturnType<typeof mountText>;
const blockOf = ({ handle }: Mounted) => handle.getSnapshot().document.content.content?.[0]?.content;

describe('the bold editor part', () => {
    it('toggles bold over the selection with Mod+B as one undo step', () => {
        const mounted = mountText({ blocks: [para(text('make this bold'))] });
        setSelection(mounted.handle, { text: 'this' });
        act(() => {
            pressKey(mounted.handle, 'Mod-b');
        });

        expect(blockOf(mounted)).toEqual([text('make '), text('this', 'bold'), text(' bold')]);
        expect(mounted.handle.query('mark.bold.toggle')).toEqual({ enabled: true, active: true, disabledReason: null });

        act(() => {
            mounted.handle.execute('history.undo');
        });
        expect(blockOf(mounted)).toEqual([text('make this bold')]);
    });

    it('turns text typed between double stars bold', () => {
        const mounted = mountText({ blocks: [para(text('a'))] });
        setSelection(mounted.handle, { text: 'a', from: 1, to: 1 });
        act(() => {
            typeText(mounted.handle, ' **strong**');
        });

        expect(blockOf(mounted)).toEqual([text('a '), text('strong', 'bold')]);
    });

    it('shows its toolbar toggle pressed while the selection is bold', () => {
        const mounted = mountText({
            blocks: [para(text('bold', 'bold'), text(' plain'))],
            toolbar: [['mark.bold.toggle']],
        });
        setSelection(mounted.handle, { text: 'bold' });
        const button = screen.getByRole('button', { name: 'Bold' });

        expect(button).toHaveAttribute('aria-pressed', 'true');

        act(() => {
            setSelection(mounted.handle, { text: 'plain' });
        });
        expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('refuses the toggle in a read-only editor', () => {
        const mounted = mountText({ blocks: [para(text('ab'))], readOnly: true });
        setSelection(mounted.handle, { text: 'ab' });

        expect(mounted.handle.execute('mark.bold.toggle')).toEqual({ status: 'rejected', code: 'readonly' });
    });
});
