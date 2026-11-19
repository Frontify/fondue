/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type MentionItem, type MentionItems } from '../types';

import { MentionDraft } from './MentionDraft';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const JANE: MentionItem = { id: 'jane', username: 'jane', name: 'Jane Doe', image: '/avatars/jane.png' };
const JOHN: MentionItem = { id: 'john/1', username: 'john', name: 'John Roe' };
const DESIGN: MentionItem = { id: 'design', username: 'design', name: 'Design team', kind: 'group' };
const PEOPLE: MentionItem[] = [JANE, JOHN, DESIGN];

const search = (query: string): MentionItem[] => PEOPLE.filter((person) => person.username.includes(query));

const teardown: (() => void)[] = [];
// happy-dom has no `reportError`, which browsers give every page.
const reportError = vi.fn();
beforeEach(() => {
    vi.stubGlobal('reportError', reportError);
});
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
    reportError.mockClear();
    vi.unstubAllGlobals();
});

/** Lets the people lookup (a promise, even for a list) settle. */
const settle = async (): Promise<void> => {
    await act(async () => {
        await Promise.resolve();
    });
};

const retryOption = (): HTMLElement | undefined =>
    [...window.document.querySelectorAll<HTMLElement>('[role="option"]')].find(
        (option) => option.textContent === 'Try again',
    );

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
        expect(status()).toBe('Results: 3');
    });

    it('says when nobody matches, and the arrows then do nothing', async () => {
        const { input, type, press, status } = await mountDraft();

        await type('zz');
        press('ArrowDown');
        press('ArrowUp');

        expect(status()).toBe('No results');
        expect(window.document.body.textContent).toContain('No results');
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

    it('shows Searching only once a lookup runs past the delay, and never announces it', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
        try {
            const { status } = await mountDraft(() => new Promise<MentionItem[]>(() => {}));

            act(() => {
                vi.advanceTimersByTime(299);
            });
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
            expect(popup()).toBe('');
            expect(window.document.body.textContent).not.toContain('Searching');
            expect(status()).toBe('');

            act(() => {
                vi.advanceTimersByTime(1);
            });
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
            expect(popup()).toContain('Searching');
            expect(popup()).not.toContain('No results');
            expect(status()).toBe('');
        } finally {
            vi.useRealTimers();
        }
    });

    it('starts the Searching delay again for each new query', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
        try {
            const { type } = await mountDraft(() => new Promise<MentionItem[]>(() => {}));
            act(() => {
                vi.advanceTimersByTime(300);
            });
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
            expect(window.document.body.textContent).toContain('Searching');

            await type('ja');
            act(() => {
                vi.advanceTimersByTime(299);
            });
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
            expect(popup()).toBe('');
            expect(window.document.body.textContent).not.toContain('Searching');

            act(() => {
                vi.advanceTimersByTime(1);
            });
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
            expect(popup()).toContain('Searching');
        } finally {
            vi.useRealTimers();
        }
    });

    it('keeps the popup up and says Searching at once when a failed lookup is retried', async () => {
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
        const frame = async (): Promise<void> => {
            await act(async () => {
                await new Promise((resolve) => requestAnimationFrame(resolve));
            });
        };
        try {
            await mountDraft(
                () =>
                    new Promise<MentionItem[]>((_resolve, reject) =>
                        setTimeout(() => reject(new Error('offline')), 400),
                    ),
            );
            act(() => {
                vi.advanceTimersByTime(300);
            });
            await frame();
            expect(popup()).toContain('Searching');
            act(() => {
                vi.advanceTimersByTime(100);
            });
            await settle();
            await frame();
            expect(popup()).toContain('Could not load people.');

            act(() => retryOption()?.click());
            await frame();
            expect(popup()).toContain('Searching');
            expect(retryOption()).toBeUndefined();
        } finally {
            vi.useRealTimers();
        }
    });

    it('says No matches only for an empty answer that arrived', async () => {
        const { status, type } = await mountDraft((query) => (query === '' ? PEOPLE : []));
        await type('zz');
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });

        expect(status()).toBe('No results');
        expect(popup()).toContain('No results');
    });

    it('says the search failed, and asks again from the Retry button, keeping focus in the query', async () => {
        const offline = new Error('offline');
        const lookup = vi.fn<MentionItems>((query) =>
            query === 'fail' ? Promise.reject(offline) : Promise.resolve(PEOPLE),
        );
        const { input, type, status, container } = await mountDraft(lookup);
        await type('fail');
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });

        expect(status()).toBe('Could not load people.');
        expect(reportError).toHaveBeenCalledWith(offline);
        expect(popup()).toContain('Could not load people.');
        expect(popup()).not.toContain('No results');
        const retry = retryOption();
        expect(retry).toBeDefined();
        expect(container.contains(retry ?? null)).toBe(false);

        const press0 = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        retry?.dispatchEvent(press0);
        expect(press0.defaultPrevented).toBe(true);
        const callsBefore = lookup.mock.calls.length;
        act(() => retry?.click());
        // Cleared while asking again, so the same failure is announced again.
        expect(status()).toBe('');
        await settle();
        expect(lookup.mock.calls).toHaveLength(callsBefore + 1);
        expect(status()).toBe('Could not load people.');
        expect(window.document.activeElement).toBe(input);
    });

    it('offers Retry as the active option and runs it from the keyboard alone, leaving Tab alone', async () => {
        const lookup = vi.fn<MentionItems>(() => Promise.reject(new Error('offline')));
        const { input } = await mountDraft(lookup);
        await act(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        });
        const retry = retryOption();

        expect(input.getAttribute('aria-expanded')).toBe('true');
        expect(input.getAttribute('aria-activedescendant')).toBe(retry?.id);
        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        expect(listbox?.getAttribute('role')).toBe('listbox');
        expect(listbox?.contains(retry ?? null)).toBe(true);
        const callsBefore = lookup.mock.calls.length;

        const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        act(() => {
            input.dispatchEvent(tab);
        });
        await settle();
        expect(tab.defaultPrevented).toBe(false);
        expect(lookup.mock.calls).toHaveLength(callsBefore);

        const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        act(() => {
            input.dispatchEvent(enter);
        });
        await settle();
        expect(enter.defaultPrevented).toBe(true);
        expect(lookup.mock.calls).toHaveLength(callsBefore + 1);
        expect(window.document.activeElement).toBe(input);
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

        expect(seen).toEqual(['Results: 3', 'Results: 3', 'Results: 3', 'Results: 3']);
    });

    it('keeps a space typed while a newer query is unanswered, after an earlier No matches', async () => {
        const { type, press, onCancel } = await mountDraft((query) => {
            if (query === 'z') {
                return new Promise<MentionItem[]>(() => {});
            }
            return [];
        });
        await type('zz');
        await type('z');
        press(' ');

        expect(onCancel).not.toHaveBeenCalled();
    });

    it('says the search failed when the lookup throws instead of rejecting', async () => {
        const { type, status } = await mountDraft((query) => {
            if (query === 'x') {
                throw new Error('bad query');
            }
            return PEOPLE;
        });
        await type('x');

        expect(status()).toBe('Could not load people.');
    });

    it('drops the answer of a query that has moved on', async () => {
        const answers = new Map<string, (people: MentionItem[]) => void>();
        const { type, status } = await mountDraft(
            (query) => new Promise<MentionItem[]>((resolve) => answers.set(query, resolve)),
        );
        await type('j');
        act(() => answers.get('')?.([DESIGN]));
        await settle();

        // The dropped answer is no earlier answer to keep showing.
        expect(status()).toBe('');
        act(() => answers.get('j')?.([JANE]));
        await settle();
        expect(status()).toBe('Results: 1');
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

    it('shows a kind this version does not know as a person, without throwing', async () => {
        // An app's list is read at runtime and can carry any kind.
        const team = { id: 't', username: 't', name: 'T', kind: 'team' } as unknown as MentionItem;
        const { input } = await mountDraft(() => [team, JOHN]);

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        const [teamOption, john] = [...(listbox?.querySelectorAll('[role="option"]') ?? [])];
        expect(teamOption?.querySelector('svg')?.outerHTML).toBe(john?.querySelector('svg')?.outerHTML);
    });

    it('isolates each name and drops the characters that could reorder the row', async () => {
        const override = String.fromCodePoint(0x202e);
        const disguised: MentionItem = { id: 'd', username: `ev${override}il`, name: `Ev${override}il Doe` };
        const { input } = await mountDraft(() => [disguised]);

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        const shown = [...(listbox?.querySelectorAll('[role="option"] bdi') ?? [])].map((name) => name.textContent);
        expect(shown).toEqual(['Evil Doe', '@evil']);
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

describe('the names of the picker', () => {
    it('names the input and the list, and counts one person', async () => {
        const { input, type, status } = await mountDraft();

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        expect(input.getAttribute('aria-label')).toBe('Mention someone');
        expect(listbox?.getAttribute('aria-label')).toBe('People');

        await type('jane');

        expect(status()).toBe('Results: 1');
    });
});
