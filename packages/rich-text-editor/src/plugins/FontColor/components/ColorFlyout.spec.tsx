/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EditorControlApi } from '#/core';

import { ColorFlyout } from './ColorFlyout';

let root: Root | undefined;

afterEach(() => {
    act(() => root?.unmount());
    root = undefined;
    document.body.innerHTML = '';
});

type Marks = EditorControlApi['marks'];

const mount = (
    marks: Record<string, Record<string, unknown>>,
): {
    toggle: ReturnType<typeof vi.fn<Marks['toggle']>>;
    set: ReturnType<typeof vi.fn<Marks['set']>>;
    trigger: HTMLButtonElement | null;
} => {
    const toggle = vi.fn<Marks['toggle']>();
    const set = vi.fn<Marks['set']>();
    const api = { marks: { toggle, set }, focus: vi.fn() } as unknown as EditorControlApi;
    const container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    act(() => root?.render(<ColorFlyout selection={{ marks } as never} api={api} />));
    const trigger = container.querySelector('button');
    act(() => trigger?.click());
    return { toggle, set, trigger };
};

const typeHex = (hex: string): HTMLInputElement => {
    const field = document.querySelector<HTMLInputElement>('input[type="text"]');
    if (field === null) {
        throw new Error('no hex field');
    }
    act(() => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(field, hex);
        field.dispatchEvent(new Event('input', { bubbles: true }));
    });
    return field;
};

const typeHexAndPressEnter = (hex: string): void => {
    const field = typeHex(hex);
    act(() => {
        field.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });
};

const press = (label: string): void => {
    const button = [...document.querySelectorAll('button')].find((candidate) => candidate.textContent === label);
    if (button === undefined) {
        throw new Error(`no ${label} button`);
    }
    act(() => button.click());
};

describe('the colour flyout', () => {
    it('replaces a colour in one command', () => {
        const { toggle, set } = mount({ fontColor: { color: '#ff0000' } });
        typeHexAndPressEnter('c5221f');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#c5221f' }]]);
        expect(toggle).not.toHaveBeenCalled();
    });

    it.each<[string, Record<string, Record<string, unknown>>]>([
        ['coloured', { fontColor: { color: '#ff0000' } }],
        ['uncoloured', {}],
    ])('changes nothing on Save without a choice on %s text', (_, marks) => {
        const { toggle, set } = mount(marks);
        // Clicking Save moves focus off the hex field first, and the picker reports its value again on blur.
        act(() => document.querySelector<HTMLInputElement>('input[type="text"]')?.blur());
        press('Save');

        expect(toggle).not.toHaveBeenCalled();
        expect(set).not.toHaveBeenCalled();
    });

    it('changes nothing when the text keeps its own colour', () => {
        const { toggle, set } = mount({ fontColor: { color: '#c5221f' } });
        typeHexAndPressEnter('c5221f');

        expect(toggle).not.toHaveBeenCalled();
        expect(set).not.toHaveBeenCalled();
    });

    it('removes a colour', () => {
        const { toggle, set } = mount({ fontColor: { color: '#c5221f' } });
        press('Remove');

        expect(toggle.mock.calls).toEqual([['fontColor']]);
        expect(set).not.toHaveBeenCalled();
    });

    it('names a colour as hex, then its opacity while translucent', () => {
        const cases: [string, string][] = [
            ['#ff000080', 'Text colour: #FF0000 50%'],
            ['#ff00008c', 'Text colour: #FF0000 55%'],
            ['#c5221f', 'Text colour: #C5221F'],
        ];
        for (const [color, title] of cases) {
            expect(mount({ fontColor: { color } }).trigger?.getAttribute('title')).toBe(title);
            act(() => root?.unmount());
        }
    });

    it('names a stored value in another CSS form by its hex, and one that is no colour as no colour', () => {
        const cases: [string, string][] = [
            ['rgba(255, 0, 0, 0.5)', 'Text colour: #FF0000 50%'],
            ['banana', 'Text colour'],
        ];
        for (const [color, title] of cases) {
            expect(mount({ fontColor: { color } }).trigger?.getAttribute('title')).toBe(title);
            act(() => root?.unmount());
        }
    });

    it('applies a typed hex value on Enter, with three digits or a # prefix too', () => {
        const cases: [string, string][] = [
            ['c5221f', '#c5221f'],
            ['f00', '#ff0000'],
            ['#c5221f', '#c5221f'],
        ];
        for (const [hex, color] of cases) {
            const { set } = mount({});
            typeHexAndPressEnter(hex);

            expect(set).toHaveBeenCalledWith('fontColor', { color });
            act(() => root?.unmount());
        }
    });

    it('replaces a colour, keeping its opacity, in one command', () => {
        const { toggle, set } = mount({ fontColor: { color: '#ff000080' } });
        typeHexAndPressEnter('c5221f');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#c5221f80' }]]);
        expect(toggle).not.toHaveBeenCalled();
    });

    it('applies a preset', () => {
        const { set } = mount({});
        act(() => document.querySelector<HTMLButtonElement>('button[aria-label="Blue"]')?.click());

        expect(set.mock.calls).toEqual([['fontColor', { color: '#1a73e8' }]]);
    });

    it('applies nothing for a typed value the hex field does not take', () => {
        for (const hex of ['ff00', 'ff000080']) {
            const { toggle, set } = mount({});
            typeHexAndPressEnter(hex);

            expect(toggle).not.toHaveBeenCalled();
            expect(set).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });

    it('changes nothing on Cancel', () => {
        const cases: Record<string, Record<string, unknown>>[] = [{ fontColor: { color: '#ff000080' } }, {}];
        for (const marks of cases) {
            const { toggle, set } = mount(marks);
            press('Cancel');

            expect(toggle).not.toHaveBeenCalled();
            expect(set).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });
});
