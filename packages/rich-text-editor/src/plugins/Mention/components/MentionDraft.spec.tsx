/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type MentionItem } from '../types';

import { MentionDraft } from './MentionDraft';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const PEOPLE: MentionItem[] = [
    { id: 'jane', username: 'jane', name: 'Jane Doe' },
    { id: 'john/1', username: 'john', name: 'John Roe' },
];

const search = (query: string): MentionItem[] => PEOPLE.filter((person) => person.username.includes(query));

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

/** Lets the people lookup (a promise, even for a list) settle. */
const settle = async (): Promise<void> => {
    await act(async () => {
        await Promise.resolve();
    });
};

const mountDraft = async () => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChoose = vi.fn();
    const onCancel = vi.fn();
    act(() => {
        root.render(
            <MentionDraft
                trigger="@"
                items={search}
                focused
                onChoose={onChoose}
                onCancel={onCancel}
                onRemove={vi.fn()}
            />,
        );
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    await settle();
    const input = container.querySelector('input');
    if (!input) {
        throw new Error('no query input');
    }
    const type = async (text: string): Promise<void> => {
        act(() => {
            const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
            setValue?.call(input, text);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await settle();
    };
    const press = (key: string): void => {
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        });
    };
    const status = (): string | null | undefined => container.querySelector('[role="status"]')?.textContent;
    return { input, type, press, status, onChoose, onCancel };
};

describe('a mention being made', () => {
    it('drives a listbox of people from its combobox, and says how many there are', async () => {
        const { input, status } = await mountDraft();

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        expect(listbox?.getAttribute('role')).toBe('listbox');
        // A popup of its own, not a dialog around the list.
        expect(listbox?.closest('[role="dialog"]')).toBeNull();
        const options = [...(listbox?.querySelectorAll('[role="option"]') ?? [])];
        expect(options.map((option) => option.id)).toEqual(options.map((_, index) => `${listbox?.id}-option-${index}`));
        expect(listbox?.querySelector('button')).toBeNull();
        expect(input.getAttribute('aria-activedescendant')).toBe(options[0]?.id);
        expect(status()).toBe('2 people');
    });

    it('says when nobody matches, and the arrows then do nothing', async () => {
        const { input, type, press, status } = await mountDraft();

        await type('zz');
        press('ArrowDown');
        press('ArrowUp');

        expect(status()).toBe('No matches');
        expect(window.document.body.textContent).toContain('No matches');
        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect(input.hasAttribute('aria-activedescendant')).toBe(false);
    });

    it('turns back into text on a space when nobody matches', async () => {
        const { type, press, onCancel } = await mountDraft();

        await type('zz');
        press(' ');

        expect(onCancel).toHaveBeenCalledWith('@zz ');
    });

    it('chooses the highlighted person with Enter', async () => {
        const { press, onChoose } = await mountDraft();

        press('ArrowDown');
        press('Enter');

        expect(onChoose).toHaveBeenCalledWith(PEOPLE[1]);
    });
});
