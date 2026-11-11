/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { readableShortcut } from '#/ui/ToolbarButton/ToolbarButton';

import { type MentionItem, type MentionItems } from '../types';

import { MentionDraft } from './MentionDraft';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const PEOPLE: MentionItem[] = [
    { id: 'jane', username: 'jane', name: 'Jane Doe', image: '/avatars/jane.png' },
    { id: 'john/1', username: 'john', name: 'John Roe' },
    { id: 'design', username: 'design', name: 'Design team', kind: 'group' },
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

const mountDraft = async (items: MentionItems = search) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChoose = vi.fn();
    const onCancel = vi.fn();
    act(() => {
        root.render(
            <MentionDraft
                trigger="@"
                items={items}
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
    const press = (key: string, init: KeyboardEventInit = {}): void => {
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }));
        });
    };
    const status = (): string | null | undefined => container.querySelector('[role="status"]')?.textContent;
    return { input, type, press, status, onChoose, onCancel, container };
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
        expect(status()).toBe('3 people');
    });

    it('says when nobody matches, and the arrows then do nothing', async () => {
        const { input, type, press, status } = await mountDraft();

        await type('zz');
        press('ArrowDown');
        press('ArrowUp');

        expect(status()).toBe('No matches');
        expect(window.document.body.textContent).toContain('No matches');
        // Expanded means the listbox of options is in the page, which it is not with no matches.
        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(input.hasAttribute('aria-controls')).toBe(false);
        expect(input.hasAttribute('aria-activedescendant')).toBe(false);
    });

    it('is expanded only with a listbox in the page for aria-controls to point at', async () => {
        const { input } = await mountDraft();

        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect(window.document.getElementById(input.getAttribute('aria-controls') ?? '')).not.toBeNull();
    });

    it('turns back into text on a space when nobody matches', async () => {
        const { type, press, onCancel } = await mountDraft();

        await type('zz');
        press(' ');

        expect(onCancel).toHaveBeenCalledWith('@zz ');
    });

    it('shows an avatar where there is one, and the icon of their kind otherwise', async () => {
        const { input } = await mountDraft();

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        const [jane, john, design] = [...(listbox?.querySelectorAll('[role="option"]') ?? [])];
        expect(jane?.querySelector('img')?.getAttribute('src')).toBe('/avatars/jane.png');
        expect(jane?.querySelector('svg')).toBeNull();
        expect(john?.querySelector('img')).toBeNull();
        expect(john?.querySelector('svg')).not.toBeNull();
        // A group's icon is not a person's.
        expect(design?.querySelector('svg')?.outerHTML).not.toBe(john?.querySelector('svg')?.outerHTML);
    });

    it('chooses the highlighted person with Enter', async () => {
        const { press, onChoose } = await mountDraft();

        press('ArrowDown');
        press('Enter');

        expect(onChoose).toHaveBeenCalledWith(PEOPLE[1]);
    });
});

describe('a mention being searched for', () => {
    const popup = (): string => window.document.querySelector('[class*="popup"]')?.textContent ?? '';

    it('says Searching while the answer is pending, in the list and to a screen reader', async () => {
        const { status } = await mountDraft(() => new Promise<MentionItem[]>(() => {}));
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });

        expect(status()).toBe('Searching');
        expect(popup()).toContain('Searching');
        expect(popup()).not.toContain('No matches');
    });

    it('says No matches only for an empty answer that arrived', async () => {
        const { status, type } = await mountDraft((query) => (query === '' ? PEOPLE : []));
        await type('zz');
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });

        expect(status()).toBe('No matches');
        expect(popup()).toContain('No matches');
    });

    it('says the search failed, and asks again from the Retry button or Enter, keeping focus in the query', async () => {
        const lookup = vi.fn<MentionItems>((query) =>
            query === 'fail' ? Promise.reject(new Error('offline')) : Promise.resolve(PEOPLE),
        );
        const { input, type, press, status, container } = await mountDraft(lookup);
        await type('fail');
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });

        expect(status()).toBe('Could not load people. Press Enter to retry.');
        expect(popup()).toContain('Could not load people.');
        expect(popup()).not.toContain('Press Enter to retry');
        const shortcut = window.document.querySelector('kbd');
        expect(shortcut?.textContent).toBe(readableShortcut('Enter'));
        expect(shortcut?.getAttribute('aria-hidden')).toBe('true');
        expect(popup()).not.toContain('No matches');
        const retry = [...window.document.querySelectorAll('button')].find((button) => button.textContent === 'Retry');
        expect(retry).toBeDefined();
        expect(container.contains(retry ?? null)).toBe(false);

        // The mouse press must not move focus out of the query.
        const press0 = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        retry?.dispatchEvent(press0);
        expect(press0.defaultPrevented).toBe(true);
        const callsBefore = lookup.mock.calls.length;
        act(() => retry?.click());
        await settle();
        expect(lookup.mock.calls.length).toBe(callsBefore + 1);
        expect(status()).toBe('Could not load people. Press Enter to retry.');

        press('Enter');
        await settle();
        expect(lookup.mock.calls.length).toBe(callsBefore + 2);
        expect(window.document.activeElement).toBe(input);
    });

    it('retries on Tab like Enter instead of leaving the query', async () => {
        const lookup = vi.fn<MentionItems>(() => Promise.reject(new Error('offline')));
        const { input, onCancel } = await mountDraft(lookup);
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });
        const callsBefore = lookup.mock.calls.length;

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        act(() => {
            input.dispatchEvent(event);
        });
        await settle();

        expect(event.defaultPrevented).toBe(true);
        expect(lookup.mock.calls.length).toBe(callsBefore + 1);
        expect(onCancel).not.toHaveBeenCalled();
    });

    it('keeps the last count while a newer query is pending, and never says Searching for a static list', async () => {
        const { input, status } = await mountDraft(() => PEOPLE);
        const seen: (string | null | undefined)[] = [];
        for (const text of ['j', 'jo']) {
            act(() => {
                const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
                setValue?.call(input, text);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
            // Read before the answer settles: this is when the query is pending.
            seen.push(status());
            await settle();
            seen.push(status());
        }

        expect(seen).toEqual(['3 people', '3 people', '3 people', '3 people']);
    });

    it('drops the answer of a query that has moved on', async () => {
        const answers = new Map<string, (people: MentionItem[]) => void>();
        const { type, status } = await mountDraft(
            (query) => new Promise<MentionItem[]>((resolve) => answers.set(query, resolve)),
        );
        await type('j');
        // The index is in range, but indexed access reads as possibly undefined.
        act(() => answers.get('')?.([PEOPLE[2] as MentionItem]));
        await settle();

        // The dropped answer is no earlier answer to keep showing.
        expect(status()).toBe('Searching');
        // Same as above: the index is in range.
        act(() => answers.get('j')?.([PEOPLE[0] as MentionItem]));
        await settle();
        expect(status()).toBe('1 person');
    });
});

describe('a picker that takes what the app gives', () => {
    it('shows an avatar only from a safe link, and the icon otherwise', async () => {
        const unsafe: MentionItem[] = [
            { id: 'a', username: 'a', name: 'A', image: 'javascript:alert(1)' },
            { id: 'b', username: 'b', name: 'B', image: 'data:text/html,x' },
            { id: 'c', username: 'c', name: 'C', image: 'https://example.com/c.png' },
        ];
        const { input } = await mountDraft(() => unsafe);

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        const [a, b, c] = [...(listbox?.querySelectorAll('[role="option"]') ?? [])];
        expect([a, b].map((option) => option?.querySelector('img'))).toEqual([null, null]);
        expect([a, b].map((option) => option?.querySelector('svg') !== null)).toEqual([true, true]);
        expect(c?.querySelector('img')?.getAttribute('src')).toBe('https://example.com/c.png');
    });

    it('leaves Enter and Tab to the input method while it composes', async () => {
        const { press, onChoose } = await mountDraft();

        press('Enter', { isComposing: true });
        press('Tab', { isComposing: true });
        press('Enter', { keyCode: 229 });

        expect(onChoose).not.toHaveBeenCalled();
        press('Enter');
        expect(onChoose).toHaveBeenCalledTimes(1);
    });

    it('does not cancel on Space or Escape while the input method composes', async () => {
        const { type, press, onCancel } = await mountDraft();

        await type('zz');
        press(' ', { isComposing: true });
        press('Escape', { isComposing: true });

        expect(onCancel).not.toHaveBeenCalled();
        press(' ');
        expect(onCancel).toHaveBeenCalledWith('@zz ');
    });
});
