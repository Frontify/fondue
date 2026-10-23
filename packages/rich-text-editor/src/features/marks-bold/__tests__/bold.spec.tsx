/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mountText, para, text } from '#/react/__tests__/fixtures/text';
import { paste, pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

type Mounted = ReturnType<typeof mountText>;
const blockOf = ({ handle }: Mounted) => handle.getSnapshot().document.content.content?.[0]?.content;

const pasteHtml = ({ handle }: Mounted, html: string) => {
    act(() => {
        paste(handle, { html, text: 'x' });
    });
};

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

describe('bold paste rules', () => {
    it('pastes a `b` or `strong` that sets a normal weight without bold, and keeps its other styles', () => {
        const mounted = mountText({ blocks: [para()] });
        pasteHtml(
            mounted,
            '<b style="font-weight:normal">plain </b><strong style="font-weight:400;font-style:italic">slanted</strong>',
        );

        expect(blockOf(mounted)).toEqual([text('plain '), text('slanted', 'italic')]);
    });

    it('pastes a normal weight inside a bold element without bold', () => {
        const mounted = mountText({ blocks: [para()] });
        pasteHtml(
            mounted,
            '<strong>bold <span style="font-weight:400">normal</span></strong><span style="font-weight:700">heavy <span style="font-weight:normal">light</span></span>',
        );

        expect(blockOf(mounted)).toEqual([
            text('bold ', 'bold'),
            text('normal'),
            text('heavy ', 'bold'),
            text('light'),
        ]);
    });

    it('pastes a weight from 600 and a plain `b` as bold', () => {
        const mounted = mountText({ blocks: [para()] });
        pasteHtml(
            mounted,
            '<span style="font-weight:700">heavy</span> <b>tagged</b> <b style="font-weight:bold">styled</b>',
        );

        expect(blockOf(mounted)).toEqual([
            text('heavy', 'bold'),
            text(' '),
            text('tagged', 'bold'),
            text(' '),
            text('styled', 'bold'),
        ]);
    });
});
