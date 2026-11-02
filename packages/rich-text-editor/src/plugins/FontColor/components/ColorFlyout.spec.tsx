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

const mount = (
    marks: Record<string, Record<string, unknown>>,
): { toggle: ReturnType<typeof vi.fn>; trigger: HTMLButtonElement } => {
    const toggle = vi.fn();
    const api = { marks: { toggle }, focus: vi.fn() } as unknown as EditorControlApi;
    const container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    act(() => root?.render(<ColorFlyout selection={{ marks } as never} api={api} />));
    const trigger = container.querySelector<HTMLButtonElement>('button');
    if (trigger === null) {
        throw new Error('no trigger');
    }
    return { toggle, trigger };
};

const open = (trigger: HTMLButtonElement): void => {
    act(() => trigger.click());
};

const typeHexAndPressEnter = (hex: string): void => {
    const field = document.querySelector<HTMLInputElement>('input[type="text"]');
    if (field === null) {
        throw new Error('no hex field');
    }
    act(() => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(field, hex);
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });
};

describe('the colour flyout', () => {
    it('names a colour as hex, then its opacity while translucent', () => {
        expect(mount({ fontColor: { color: '#ff000080' } }).trigger.getAttribute('title')).toBe(
            'Text colour: #FF0000 50%',
        );
        act(() => root?.unmount());
        expect(mount({ fontColor: { color: '#ff00008c' } }).trigger.getAttribute('title')).toBe(
            'Text colour: #FF0000 55%',
        );
        act(() => root?.unmount());
        expect(mount({ fontColor: { color: '#c5221f' } }).trigger.getAttribute('title')).toBe('Text colour: #C5221F');
    });

    it('names a stored value that is no colour as no colour', () => {
        expect(mount({ fontColor: { color: 'red' } }).trigger.getAttribute('title')).toBe('Text colour');
    });

    it('applies a typed six digit hex value on Enter', () => {
        const { toggle, trigger } = mount({});
        open(trigger);
        typeHexAndPressEnter('c5221f');

        expect(toggle).toHaveBeenCalledWith('fontColor', { color: '#c5221f' });
    });

    it('applies a typed three digit or #-prefixed hex value', () => {
        for (const [hex, color] of [
            ['f00', '#ff0000'],
            ['#c5221f', '#c5221f'],
        ]) {
            const { toggle, trigger } = mount({});
            open(trigger);
            typeHexAndPressEnter(hex as string);

            expect(toggle).toHaveBeenCalledWith('fontColor', { color });
            act(() => root?.unmount());
        }
    });

    it('replaces a colour, keeping its opacity, by clearing it first', () => {
        const { toggle, trigger } = mount({ fontColor: { color: '#ff000080' } });
        open(trigger);
        typeHexAndPressEnter('c5221f');

        expect(toggle.mock.calls).toEqual([['fontColor'], ['fontColor', { color: '#c5221f80' }]]);
    });

    it('applies a preset, and removes a colour', () => {
        const uncoloured = mount({});
        open(uncoloured.trigger);
        act(() => document.querySelector<HTMLButtonElement>('button[aria-label="Blue"]')?.click());
        expect(uncoloured.toggle.mock.calls).toEqual([['fontColor', { color: '#1a73e8' }]]);
        act(() => root?.unmount());

        const coloured = mount({ fontColor: { color: '#c5221f' } });
        open(coloured.trigger);
        const remove = [...document.querySelectorAll('button')].find((button) => button.textContent === 'Remove');
        act(() => remove?.click());
        expect(coloured.toggle.mock.calls).toEqual([['fontColor']]);
    });

    it('applies nothing for a typed value the hex field does not take', () => {
        for (const hex of ['ff00', 'ff000080']) {
            const { toggle, trigger } = mount({});
            open(trigger);
            typeHexAndPressEnter(hex);

            expect(toggle).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });

    it('changes nothing on Cancel', () => {
        const cases: Record<string, Record<string, unknown>>[] = [{ fontColor: { color: '#ff000080' } }, {}];
        for (const marks of cases) {
            const { toggle, trigger } = mount(marks);
            open(trigger);
            const cancel = [...document.querySelectorAll('button')].find((button) => button.textContent === 'Cancel');
            act(() => cancel?.click());

            expect(cancel).toBeDefined();
            expect(toggle).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });

    it('changes nothing on Save without a choice', () => {
        const cases: Record<string, Record<string, unknown>>[] = [{ fontColor: { color: '#ff000080' } }, {}];
        for (const marks of cases) {
            const { toggle, trigger } = mount(marks);
            open(trigger);
            const save = [...document.querySelectorAll('button')].find((button) => button.textContent === 'Save');
            act(() => save?.click());

            expect(save).toBeDefined();
            expect(toggle).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });
});
