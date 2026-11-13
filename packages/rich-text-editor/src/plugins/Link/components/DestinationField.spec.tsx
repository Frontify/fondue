/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { type LinkLabels, resolveLinkLabels } from '../helpers/labels';
import { type LinkPolicy } from '../helpers/policy';

import { LinkTargetForm } from './LinkTargetForm';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const BRAND: LinkDestination = { id: 'brand', label: 'Brand guidelines', href: 'https://frontify.com/brand' };
const LOGOS: LinkDestination = { id: 'logos', label: 'Logos', href: 'https://frontify.com/logos' };
const ELSEWHERE: LinkDestination = { id: 'other', label: 'Elsewhere', href: 'https://example.com/other' };

const teardown: (() => void)[] = [];
beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
    vi.useRealTimers();
});

type SearchFormOptions = {
    policy?: LinkPolicy;
    mode?: { kind: 'create'; text: string } | { kind: 'edit' };
    labels?: Partial<LinkLabels>;
};

type KeyPressInit = KeyboardEventInit & { keyCode?: number };

const mountSearchForm = (
    search: LinkSearch | undefined,
    { policy = {}, mode = { kind: 'edit' }, labels }: SearchFormOptions = {},
) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onSave = vi.fn();
    act(() => {
        root.render(
            <LinkTargetForm
                initial={{ href: '' }}
                {...mode}
                policy={policy}
                labels={resolveLinkLabels(labels)}
                search={search}
                onSave={onSave}
                onCancel={vi.fn()}
            />,
        );
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    const field = container.querySelector<HTMLInputElement>('input[type="url"]');
    if (!field) {
        throw new Error('the form did not render its field');
    }
    const setValue = (input: HTMLInputElement, value: string): void => {
        act(() => {
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, value);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    };
    const type = async (value: string): Promise<void> => {
        setValue(field, value);
        await act(async () => {
            await vi.advanceTimersByTimeAsync(200);
        });
    };
    const press = (key: string, init: KeyPressInit = {}): KeyboardEvent => {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
        act(() => {
            field.dispatchEvent(event);
        });
        return event;
    };
    return {
        container,
        field,
        type,
        press,
        onSave,
        textField: () => container.querySelector<HTMLInputElement>('input[type="text"]'),
        setText: (value: string) => {
            const input = container.querySelector<HTMLInputElement>('input[type="text"]');
            if (!input) {
                throw new Error('no Text field');
            }
            setValue(input, value);
        },
        options: () => [...container.querySelectorAll('[role="option"]')],
        status: () => container.querySelector('output')?.textContent ?? '',
        listbox: () => container.querySelector('[role="listbox"]'),
    };
};

const fixed =
    (...found: LinkDestination[]): LinkSearch =>
    () =>
        Promise.resolve(found);

describe('the destination field', () => {
    it('is the plain field when no search is given', () => {
        const { field, container } = mountSearchForm(undefined);

        expect(field.getAttribute('role')).toBeNull();
        expect(container.querySelector('output')).toBeNull();
    });

    it('is a combobox named "Link to" that opens a listbox of results while typing', async () => {
        const { container, field, type, options, listbox } = mountSearchForm(fixed(BRAND, LOGOS));

        expect(field.getAttribute('role')).toBe('combobox');
        expect(field.getAttribute('aria-autocomplete')).toBe('list');
        expect(field.getAttribute('aria-expanded')).toBe('false');
        expect(container.querySelector(`label[for="${field.id}"]`)?.textContent).toContain('Link to');

        await type('br');

        expect(field.getAttribute('aria-expanded')).toBe('true');
        expect(field.getAttribute('aria-controls')).toBe(listbox()?.id);
        expect(options().map((option) => option.textContent)).toEqual([
            'Brand guidelineshttps://frontify.com/brand',
            'Logoshttps://frontify.com/logos',
        ]);
    });

    it('scrolls the active option into view as the arrows move it', async () => {
        const scrolled = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
        const { type, press, options } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');

        press('ArrowUp');

        expect(scrolled.mock.contexts).toEqual([options()[1]]);
        scrolled.mockRestore();
    });

    it('leaves the list where it is when the pointer highlights an option', async () => {
        const scrolled = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
        const { type, options } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');

        act(() => {
            options()[1]?.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
        });

        expect(options()[1]?.getAttribute('aria-selected')).toBe('true');
        expect(scrolled).not.toHaveBeenCalled();
        scrolled.mockRestore();
    });

    it('leaves the list where it is on hover after arrows that could not move the highlight', async () => {
        const scrolled = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
        const search = vi.fn<LinkSearch>((query) => {
            if (query === 'b') {
                return Promise.resolve([BRAND]);
            }
            return Promise.resolve([BRAND, LOGOS]);
        });
        const { type, press, options } = mountSearchForm(search);
        await type('b');
        press('ArrowDown');
        press('ArrowDown');
        scrolled.mockClear();
        await type('br');

        act(() => {
            options()[1]?.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
        });

        expect(scrolled).not.toHaveBeenCalled();
        scrolled.mockRestore();
    });

    it('does not search again for the address a pick fills in', async () => {
        const search = vi.fn<LinkSearch>(fixed(BRAND, LOGOS));
        const { type, press } = mountSearchForm(search);
        await type('br');
        press('ArrowDown');
        press('Enter');

        await act(async () => {
            await vi.advanceTimersByTimeAsync(200);
        });

        expect(search.mock.calls.map(([query]) => query)).toEqual(['br']);
    });

    it('moves the active option with the arrows and picks it with Enter', async () => {
        const { field, type, press, options, onSave } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');
        // No option is active until an arrow makes one, so Enter on a typed address stays a save.
        expect(field.getAttribute('aria-activedescendant')).toBeNull();

        press('ArrowDown');
        expect(field.getAttribute('aria-activedescendant')).toBe(options()[0]?.id);
        press('ArrowDown');
        expect(field.getAttribute('aria-activedescendant')).toBe(options()[1]?.id);
        expect(options()[1]?.getAttribute('aria-selected')).toBe('true');
        press('ArrowDown');
        expect(field.getAttribute('aria-activedescendant')).toBe(options()[0]?.id);
        press('ArrowUp');
        expect(field.getAttribute('aria-activedescendant')).toBe(options()[1]?.id);

        const enter = press('Enter');

        expect(enter.defaultPrevented).toBe(true);
        expect(field.value).toBe(LOGOS.href);
        expect(onSave).not.toHaveBeenCalled();
        expect(field.getAttribute('aria-expanded')).toBe('false');
    });

    it('picks an option on a mouse press and keeps focus in the field', async () => {
        const { field, type, options, onSave } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');
        field.focus();

        const press = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        act(() => {
            options()[1]?.dispatchEvent(press);
        });

        expect(press.defaultPrevented).toBe(true);
        expect(field.value).toBe(LOGOS.href);
        expect(window.document.activeElement).toBe(field);
        expect(onSave).not.toHaveBeenCalled();
        expect(field.getAttribute('aria-expanded')).toBe('false');
    });

    it('moves the highlight to the option under the pointer', async () => {
        const { field, type, options } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');

        act(() => {
            options()[1]?.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
        });

        expect(field.getAttribute('aria-activedescendant')).toBe(options()[1]?.id);
        expect(options()[1]?.getAttribute('data-highlighted')).toBe('true');
    });

    it('saves a typed address on Enter when no option is active', async () => {
        const { type, press, onSave } = mountSearchForm(fixed(BRAND));
        await type('https://frontify.com/typed');

        press('Enter');

        expect(onSave).toHaveBeenCalledWith({ href: 'https://frontify.com/typed' });
    });

    it('does not pick on the Enter that confirms a composition', async () => {
        const { field, type, press, options } = mountSearchForm(fixed(BRAND));
        await type('br');
        press('ArrowDown');

        press('Enter', { isComposing: true });
        press('Enter', { keyCode: 229 });

        expect(field.value).toBe('br');
        expect(options()).toHaveLength(1);
    });

    it('closes the list on Escape without the Escape reaching the flyout, then reopens it on typing', async () => {
        const { field, type, press, listbox } = mountSearchForm(fixed(BRAND));
        await type('br');
        const reached = vi.fn();
        // A flyout listens on the document, in the capture phase.
        window.document.addEventListener('keydown', reached, true);
        teardown.push(() => window.document.removeEventListener('keydown', reached, true));

        press('Escape');

        expect(listbox()).toBeNull();
        expect(field.getAttribute('aria-expanded')).toBe('false');
        expect(reached).not.toHaveBeenCalled();

        await type('bra');
        expect(listbox()).not.toBeNull();
    });

    it('lets Escape through when the list is not open', () => {
        const { press } = mountSearchForm(fixed(BRAND));
        const reached = vi.fn();
        window.document.addEventListener('keydown', reached, true);
        teardown.push(() => window.document.removeEventListener('keydown', reached, true));

        press('Escape');

        expect(reached).toHaveBeenCalledTimes(1);
    });

    it('says what is happening in a status region', async () => {
        let finish: (found: readonly LinkDestination[]) => void = () => undefined;
        let fail: () => void = () => undefined;
        const queries: string[] = [];
        const search: LinkSearch = (query) => {
            queries.push(query);
            return new Promise((resolve, reject) => {
                finish = resolve;
                fail = () => reject(new Error('offline'));
            });
        };
        const { type, status } = mountSearchForm(search);
        expect(status()).toBe('');

        await type('a');
        expect(status()).toBe('Searching');
        await act(async () => {
            finish([BRAND, LOGOS]);
            await Promise.resolve();
        });
        expect(status()).toBe('2 results');

        await type('ab');
        await act(async () => {
            finish([BRAND]);
            await Promise.resolve();
        });
        expect(status()).toBe('1 result');

        await type('abc');
        await act(async () => {
            finish([]);
            await Promise.resolve();
        });
        expect(status()).toBe('No results');

        await type('abcd');
        await act(async () => {
            fail();
            await Promise.resolve();
        });
        expect(status()).toBe('Search failed');
    });

    it('says the status with the labels a host passes', async () => {
        const labels: Partial<LinkLabels> = {
            searching: 'Suche läuft',
            noResults: 'Keine Treffer',
            resultCount: (count) => `${count} Treffer`,
        };
        let finish: (found: readonly LinkDestination[]) => void = () => undefined;
        const search: LinkSearch = () =>
            new Promise((resolve) => {
                finish = resolve;
            });
        const { type, status } = mountSearchForm(search, { labels });

        await type('a');
        expect(status()).toBe('Suche läuft');
        await act(async () => {
            finish([BRAND, LOGOS]);
            await Promise.resolve();
        });
        expect(status()).toBe('2 Treffer');

        await type('ab');
        await act(async () => {
            finish([]);
            await Promise.resolve();
        });
        expect(status()).toBe('Keine Treffer');
    });

    it('fills an empty Text field with the label when a result is picked, and leaves typed text alone', async () => {
        const first = mountSearchForm(fixed(BRAND), { mode: { kind: 'create', text: '' } });
        await first.type('br');
        first.press('ArrowDown');
        first.press('Enter');
        expect(first.textField()?.value).toBe(BRAND.label);
        expect(first.field.value).toBe(BRAND.href);

        const second = mountSearchForm(fixed(BRAND), { mode: { kind: 'create', text: 'my words' } });
        await second.type('br');
        second.press('ArrowDown');
        second.press('Enter');
        expect(second.textField()?.value).toBe('my words');

        const third = mountSearchForm(fixed(BRAND), { mode: { kind: 'create', text: '' } });
        third.setText('typed');
        await third.type('br');
        third.press('ArrowDown');
        third.press('Enter');
        expect(third.textField()?.value).toBe('typed');
    });

    it('never shows a result the policy refuses', async () => {
        const { type, options, status } = mountSearchForm(fixed(BRAND, ELSEWHERE), {
            policy: { allowedHosts: ['frontify.com'] },
        });

        await type('a');

        expect(options().map((option) => option.textContent)).toEqual(['Brand guidelineshttps://frontify.com/brand']);
        expect(status()).toBe('1 result');
    });
});
