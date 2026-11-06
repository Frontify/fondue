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
): { toggle: ReturnType<typeof vi.fn<Marks['toggle']>>; set: ReturnType<typeof vi.fn<Marks['set']>> } => {
    const toggle = vi.fn<Marks['toggle']>();
    const set = vi.fn<Marks['set']>();
    const api = { marks: { toggle, set }, focus: vi.fn() } as unknown as EditorControlApi;
    const container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    act(() => root?.render(<ColorFlyout selection={{ marks } as never} api={api} />));
    act(() => container.querySelector('button')?.click());
    return { toggle, set };
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
});
