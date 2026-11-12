/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EditorControlApi, type RteSelectionSnapshot, type ToolbarItemProps } from '#/core';

import { ColorFlyout } from './ColorFlyout';

let root: Root | undefined;

afterEach(() => {
    act(() => root?.unmount());
    root = undefined;
    document.body.innerHTML = '';
});

type Marks = EditorControlApi['marks'];

const COLORED: RteSelectionSnapshot['marks'] = { fontColor: { coverage: 'all', value: { color: '#ff0000' } } };

const colored = (color: string): RteSelectionSnapshot['marks'] => ({
    fontColor: { coverage: 'all', value: { color } },
});

type MountedFlyout = {
    toggle: ReturnType<typeof vi.fn<Marks['toggle']>>;
    set: ReturnType<typeof vi.fn<Marks['set']>>;
    remove: ReturnType<typeof vi.fn<Marks['remove']>>;
    trigger: HTMLButtonElement | null;
};

const mount = (marks: RteSelectionSnapshot['marks'], isActive: ToolbarItemProps['isActive']): MountedFlyout => {
    const toggle = vi.fn<Marks['toggle']>();
    const set = vi.fn<Marks['set']>();
    const remove = vi.fn<Marks['remove']>();
    const api = { marks: { toggle, set, remove }, focus: vi.fn() } as unknown as EditorControlApi;
    const container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    act(() => root?.render(<ColorFlyout selection={{ marks } as never} api={api} isActive={isActive} />));
    const trigger = container.querySelector('button');
    act(() => trigger?.click());
    return { toggle, set, remove, trigger };
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
        const { toggle, set } = mount(COLORED, true);
        typeHexAndPressEnter('c5221f');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#c5221f' }]]);
        expect(toggle).not.toHaveBeenCalled();
    });

    it.each<[string, RteSelectionSnapshot['marks'], ToolbarItemProps['isActive']]>([
        ['coloured', COLORED, true],
        ['uncoloured', {}, false],
    ])('changes nothing on Save without a choice on %s text', (_, marks, isActive) => {
        const { toggle, set } = mount(marks, isActive);
        // Clicking Save moves focus off the hex field first, and the picker reports its value again on blur.
        act(() => document.querySelector<HTMLInputElement>('input[type="text"]')?.blur());
        press('Save');

        expect(toggle).not.toHaveBeenCalled();
        expect(set).not.toHaveBeenCalled();
    });

    it('changes nothing when the text keeps its own colour', () => {
        const { toggle, set } = mount({ fontColor: { coverage: 'all', value: { color: '#c5221f' } } }, true);
        typeHexAndPressEnter('c5221f');

        expect(toggle).not.toHaveBeenCalled();
        expect(set).not.toHaveBeenCalled();
    });

    it('shows a stored alpha as the whole percent that was picked', () => {
        mount(colored('#c5221f5e'), true);

        expect(
            document.querySelector<HTMLInputElement>('[data-test-id="color-picker-value-input-alpha"] input')?.value,
        ).toBe('37');
    });

    it('removes a colour', () => {
        const { toggle, set, remove } = mount({ fontColor: { coverage: 'all', value: { color: '#c5221f' } } }, true);
        press('Remove');

        expect(remove.mock.calls).toEqual([['fontColor']]);
        expect(toggle).not.toHaveBeenCalled();
        expect(set).not.toHaveBeenCalled();
    });

    it('names a colour as hex, then its opacity while translucent', () => {
        const cases: [string, string][] = [
            ['#ff000080', 'Text colour: #FF0000 50%'],
            ['#ff00008c', 'Text colour: #FF0000 55%'],
            ['#c5221f', 'Text colour: #C5221F'],
        ];
        for (const [color, title] of cases) {
            expect(mount(colored(color), true).trigger?.getAttribute('aria-label')).toBe(title);
            act(() => root?.unmount());
        }
    });

    it('names a stored value in another CSS form by its hex, and one that is no colour as no colour', () => {
        const cases: [string, string][] = [
            ['rgba(255, 0, 0, 0.5)', 'Text colour: #FF0000 50%'],
            ['banana', 'Text colour'],
        ];
        for (const [color, title] of cases) {
            expect(mount(colored(color), true).trigger?.getAttribute('aria-label')).toBe(title);
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
            const { set } = mount({}, false);
            typeHexAndPressEnter(hex);

            expect(set).toHaveBeenCalledWith('fontColor', { color });
            act(() => root?.unmount());
        }
    });

    it('replaces a colour, keeping its opacity, in one command', () => {
        const { toggle, set } = mount(colored('#ff000080'), true);
        typeHexAndPressEnter('c5221f');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#c5221f80' }]]);
        expect(toggle).not.toHaveBeenCalled();
    });

    it.each<[string, string]>([
        ['Grey', '#5f6368'],
        ['Red', '#c5221f'],
        ['Orange', '#b45309'],
        ['Green', '#188038'],
        ['Blue', '#1a73e8'],
        ['Purple', '#8430ce'],
    ])('applies the %s preset', (name, color) => {
        const { set } = mount({}, false);
        act(() => document.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)?.click());

        expect(set.mock.calls).toEqual([['fontColor', { color }]]);
    });

    it.each<[string]>([['#ff00008c'], ['rgba(255, 0, 0, 0.5)'], ['banana']])(
        'changes nothing on Save after blur without a choice on stored %s',
        (color) => {
            const { toggle, set } = mount(colored(color), true);
            act(() => document.querySelector<HTMLInputElement>('input[type="text"]')?.blur());
            press('Save');

            expect(toggle).not.toHaveBeenCalled();
            expect(set).not.toHaveBeenCalled();
        },
    );

    it.each<[string, RteSelectionSnapshot['marks'], string]>([
        ['uncoloured text', {}, '#c5221f'],
        ['stored #ff000080', colored('#ff000080'), '#c5221f80'],
    ])('sets the typed colour on Save from %s', (_, marks, color) => {
        const { set } = mount(marks, marks.fontColor !== undefined);
        typeHex('c5221f');
        press('Save');

        expect(set.mock.calls).toEqual([['fontColor', { color }]]);
    });

    it('keeps a fully transparent stored colour transparent when a new hex is typed', () => {
        const { set } = mount(colored('#ff000000'), true);
        typeHexAndPressEnter('c5221f');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#c5221f00' }]]);
    });

    it('paints the swatch with the stored colour, and nothing for one that is no colour', () => {
        const cases: [string, string][] = [
            ['red', '#ff0000'],
            ['banana', 'transparent'],
        ];
        for (const [color, background] of cases) {
            const { trigger } = mount(colored(color), true);

            expect(trigger?.querySelector<HTMLElement>('span[aria-hidden]')?.style.background).toBe(background);
            act(() => root?.unmount());
        }
    });

    it('labels the flyout content with the colour title', () => {
        mount({}, false);
        const content = document.querySelector('[aria-labelledby]');
        const titleId = content?.getAttribute('aria-labelledby') ?? '';

        expect(document.getElementById(titleId)?.textContent).toBe('Text colour');
    });

    it('applies nothing for a typed value the hex field does not take', () => {
        for (const hex of ['ff00', 'ff000080']) {
            const { toggle, set } = mount({}, false);
            typeHexAndPressEnter(hex);

            expect(toggle).not.toHaveBeenCalled();
            expect(set).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });

    it('changes nothing on Cancel', () => {
        const cases: RteSelectionSnapshot['marks'][] = [colored('#ff000080'), {}];
        for (const marks of cases) {
            const { toggle, set } = mount(marks, marks.fontColor !== undefined);
            typeHex('c5221f');
            press('Cancel');

            expect(toggle).not.toHaveBeenCalled();
            expect(set).not.toHaveBeenCalled();
            act(() => root?.unmount());
        }
    });

    it('applies nothing on a key other than Enter', () => {
        const { toggle, set } = mount({}, false);
        const field = typeHex('c5221f');
        for (const key of ['a', 'Tab']) {
            act(() => {
                field.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
            });
        }

        expect(toggle).not.toHaveBeenCalled();
        expect(set).not.toHaveBeenCalled();
    });

    it('hides Remove when the text has no colour', () => {
        mount({}, false);
        const labels = [...document.querySelectorAll('button')].map((button) => button.textContent);

        expect(labels).not.toContain('Remove');
        expect(labels).toContain('Cancel');
        expect(labels).toContain('Save');
    });

    it('shows no colour for a half-coloured selection, even with a value', () => {
        // The cast simulates a stray value the type does not allow.
        const marks = { fontColor: { coverage: 'some', value: { color: '#ff0000' } } } as never;
        const { trigger } = mount(marks, 'mixed');

        expect(trigger?.getAttribute('aria-label')).toBe('Text colour');
        expect(trigger?.querySelector<HTMLElement>('span[aria-hidden]')?.style.background).toBe('transparent');
    });

    it('applies nothing on Enter outside the hex field', () => {
        const { set } = mount({}, false);
        typeHex('c5221f');
        const alpha = document.querySelector<HTMLInputElement>('[data-test-id="color-picker-value-input-alpha"] input');
        const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        act(() => {
            alpha?.dispatchEvent(enter);
        });

        expect(set).not.toHaveBeenCalled();
        expect(enter.defaultPrevented).toBe(false);
    });

    it('prevents the default on Enter in the hex field, not on another key', () => {
        mount({}, false);
        const field = typeHex('c5221f');
        const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        const other = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true });
        act(() => {
            field.dispatchEvent(enter);
            field.dispatchEvent(other);
        });

        expect(enter.defaultPrevented).toBe(true);
        expect(other.defaultPrevented).toBe(false);
    });

    it.each<[string, RteSelectionSnapshot['marks'], string, string]>([
        ['uncoloured text', {}, 'c5221f', '#c5221f'],
        ['stored #ff000080', colored('#ff000080'), '#c5221f', '#c5221f80'],
    ])('keeps the last complete hex when an incomplete one is typed after it on %s', (_, marks, first, color) => {
        const { set } = mount(marks, marks.fontColor !== undefined);
        typeHex(first);
        typeHex('zz');
        press('Save');

        expect(set.mock.calls).toEqual([['fontColor', { color }]]);
    });

    it('applies the last valid three-digit hex when an unfinished one is typed after it', () => {
        const { toggle, set } = mount(colored('#00ff00'), true);
        typeHex('f00');
        typeHex('zz');
        press('Save');

        expect(toggle).not.toHaveBeenCalled();
        expect(set.mock.calls).toEqual([['fontColor', { color: '#ff0000' }]]);
    });

    it('shows a half-coloured selection as mixed, and removes its colour rather than toggling it', () => {
        const { toggle, remove } = mount({ fontColor: { coverage: 'some' } }, 'mixed');

        expect(document.querySelector('button[aria-pressed]')?.getAttribute('aria-pressed')).toBe('mixed');
        press('Remove');
        expect(remove.mock.calls).toEqual([['fontColor']]);
        expect(toggle).not.toHaveBeenCalled();
    });

    it.each<[string, RteSelectionSnapshot['marks'], ToolbarItemProps['isActive']]>([
        ['uncoloured', {}, false],
        ['half-coloured', { fontColor: { coverage: 'some' } }, 'mixed'],
    ])('colours %s text white, the colour the picker shows before a choice', (_, marks, isActive) => {
        const { set } = mount(marks, isActive);
        typeHexAndPressEnter('ffffff');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#ffffff' }]]);
    });

    it('changes nothing on Save with an unfinished hex value on uncoloured text', () => {
        const { set } = mount({}, false);
        typeHex('ff');
        press('Save');

        expect(set).not.toHaveBeenCalled();
    });

    it('colours uncoloured text white on Save', () => {
        const { set } = mount({}, false);
        typeHex('ffffff');
        press('Save');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#ffffff' }]]);
    });

    it('colours uncoloured text white when the shorthand hex fff is typed', () => {
        const { set } = mount({}, false);
        typeHexAndPressEnter('fff');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#ffffff' }]]);
    });

    it('applies the last valid three-digit hex on Save when an unfinished one follows it on uncoloured text', () => {
        const { set } = mount({}, false);
        typeHex('abc');
        typeHex('ab');
        press('Save');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#aabbcc' }]]);
    });

    it('applies the last valid three-digit hex on Enter when an unfinished one follows it on mixed text', () => {
        const { set } = mount({ fontColor: { coverage: 'some' } }, 'mixed');
        typeHex('1a2');
        typeHexAndPressEnter('1a2b');

        expect(set.mock.calls).toEqual([['fontColor', { color: '#11aa22' }]]);
    });
});
