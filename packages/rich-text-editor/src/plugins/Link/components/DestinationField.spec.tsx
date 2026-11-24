/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type LinkDestination, type LinkSearch } from '../helpers/destination';

import { LinkTargetForm } from './LinkTargetForm';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const BRAND: LinkDestination = { id: 'brand', label: 'Brand guidelines', href: 'https://frontify.com/brand' };
const LOGOS: LinkDestination = { id: 'logos', label: 'Logos', href: 'https://frontify.com/logos' };
const UNSAFE: LinkDestination = { id: 'script', label: 'Script', href: 'javascript:alert(1)' };

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
    mode?: { kind: 'create'; text: string } | { kind: 'edit' };
};

type KeyPressInit = KeyboardEventInit & { keyCode?: number };

const mountSearchForm = (search: LinkSearch | undefined, { mode = { kind: 'edit' } }: SearchFormOptions = {}) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onSave = vi.fn();
    act(() => {
        root.render(
            <LinkTargetForm initial={{ href: '' }} {...mode} search={search} onSave={onSave} onCancel={vi.fn()} />,
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
    const press = (key: string, init: KeyPressInit = {}, target: Element = field): KeyboardEvent => {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
        act(() => {
            target.dispatchEvent(event);
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
        pages: () => [...container.querySelectorAll<HTMLButtonElement>('ul button')],
        status: () => container.querySelector('output')?.textContent ?? '',
        list: () => container.querySelector('ul'),
    };
};

const fixed =
    (...found: LinkDestination[]): LinkSearch =>
    () =>
        Promise.resolve(found);

const pageAt = (pages: readonly HTMLButtonElement[], index: number): HTMLButtonElement => {
    const page = pages[index];
    if (page === undefined) {
        throw new Error(`no page at ${index}`);
    }
    return page;
};

const pressButton = (button: HTMLButtonElement | undefined): void => {
    act(() => {
        button?.click();
    });
};

describe('the destination field', () => {
    it('is the plain field when no search is given', () => {
        const { field, container } = mountSearchForm(undefined);

        expect(field.getAttribute('role')).toBeNull();
        expect(container.querySelector('output')).toBeNull();
    });

    it('stays a plain text field named "Link to" while it searches', async () => {
        const { container, field, type } = mountSearchForm(fixed(BRAND, LOGOS));

        await type('br');

        expect(field.getAttribute('role')).toBeNull();
        expect(container.querySelector(`label[for="${field.id}"]`)?.textContent).toContain('Link to');
    });

    it('lists the pages found as buttons under the field, in a list named Pages', async () => {
        const { type, pages, list } = mountSearchForm(fixed(BRAND, LOGOS));

        await type('br');

        expect(list()?.getAttribute('aria-label')).toBe('Pages');
        expect(pages().map((page) => page.textContent)).toEqual([
            'Brand guidelineshttps://frontify.com/brand',
            'Logoshttps://frontify.com/logos',
        ]);
    });

    it('names each page button by the page, with its address as the description', async () => {
        const { container, type, pages } = mountSearchForm(fixed(BRAND));
        await type('br');

        const page = pageAt(pages(), 0);
        const textOf = (ids: string | null): string | null | undefined =>
            ids === null ? null : container.querySelector(`[id="${ids}"]`)?.textContent;

        expect(textOf(page.getAttribute('aria-labelledby'))).toBe(BRAND.label);
        expect(textOf(page.getAttribute('aria-describedby'))).toBe(BRAND.href);
    });

    it('fills the field in with a pressed page, closes the list and keeps focus in the field without saving', async () => {
        const { field, type, pages, list, onSave } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');

        pressButton(pages()[1]);

        expect(field.value).toBe(LOGOS.href);
        expect(list()).toBeNull();
        expect(window.document.activeElement).toBe(field);
        expect(onSave).not.toHaveBeenCalled();
    });

    it('does not search again for the address a pick fills in', async () => {
        const search = vi.fn<LinkSearch>(fixed(BRAND, LOGOS));
        const { type, pages } = mountSearchForm(search);
        await type('br');

        pressButton(pages()[0]);
        await act(async () => {
            await vi.advanceTimersByTimeAsync(200);
        });

        expect(search.mock.calls.map(([query]) => query)).toEqual(['br']);
    });

    it('moves focus into the list with ArrowDown, between pages with the arrows, and back to the field from the first', async () => {
        const { field, type, press, pages } = mountSearchForm(fixed(BRAND, LOGOS));
        await type('br');
        field.focus();

        const down = press('ArrowDown');
        expect(down.defaultPrevented).toBe(true);
        expect(window.document.activeElement).toBe(pages()[0]);

        press('ArrowDown', {}, pageAt(pages(), 0));
        expect(window.document.activeElement).toBe(pages()[1]);
        press('ArrowDown', {}, pageAt(pages(), 1));
        expect(window.document.activeElement).toBe(pages()[1]);

        press('ArrowUp', {}, pageAt(pages(), 1));
        expect(window.document.activeElement).toBe(pages()[0]);
        press('ArrowUp', {}, pageAt(pages(), 0));
        expect(window.document.activeElement).toBe(field);
    });

    it('leaves ArrowDown to the field when nothing was found', async () => {
        const { type, press } = mountSearchForm(fixed());
        await type('zz');

        expect(press('ArrowDown').defaultPrevented).toBe(false);
    });

    it('saves a typed address on Enter, even with pages listed', async () => {
        const { type, press, onSave } = mountSearchForm(fixed(BRAND));
        await type('https://frontify.com/typed');

        press('Enter');

        expect(onSave).toHaveBeenCalledWith({ href: 'https://frontify.com/typed' });
    });

    it('does not save on the Enter that confirms a composition', async () => {
        const { type, press, onSave } = mountSearchForm(fixed(BRAND));
        await type('https://frontify.com/typed');

        press('Enter', { isComposing: true });
        press('Enter', { keyCode: 229 });

        expect(onSave).not.toHaveBeenCalled();
    });

    it('leaves Escape to the flyout, list or not', async () => {
        const { type, press } = mountSearchForm(fixed(BRAND));
        await type('br');
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
        expect(status()).toBe('Results: 2');

        await type('ab');
        await act(async () => {
            finish([BRAND]);
            await Promise.resolve();
        });
        expect(status()).toBe('Results: 1');

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

    it('fills an empty Text field with the label when a page is picked, and leaves typed text alone', async () => {
        const first = mountSearchForm(fixed(BRAND), { mode: { kind: 'create', text: '' } });
        await first.type('br');
        pressButton(first.pages()[0]);
        expect(first.textField()?.value).toBe(BRAND.label);
        expect(first.field.value).toBe(BRAND.href);

        const second = mountSearchForm(fixed(BRAND), { mode: { kind: 'create', text: 'my words' } });
        await second.type('br');
        pressButton(second.pages()[0]);
        expect(second.textField()?.value).toBe('my words');

        const third = mountSearchForm(fixed(BRAND), { mode: { kind: 'create', text: '' } });
        third.setText('typed');
        await third.type('br');
        pressButton(third.pages()[0]);
        expect(third.textField()?.value).toBe('typed');
    });

    it('never shows a result with an unsafe target', async () => {
        const { type, pages, status } = mountSearchForm(fixed(BRAND, UNSAFE));

        await type('a');

        expect(pages().map((page) => page.textContent)).toEqual(['Brand guidelineshttps://frontify.com/brand']);
        expect(status()).toBe('Results: 1');
    });
});
