/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { isApple } from '#/ui/platform';

import { boldPlugin, linkPlugin, RichTextEditor, type RteDocument, serializeToHtml } from '../index';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/**
 * Making and using a link from the keyboard and the mouse, driven through the
 * public editor the way a host mounts it.
 */

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
    vi.restoreAllMocks();
    vi.useRealTimers();
});

const HREF = 'https://example.com';
const SEARCH_DEBOUNCE_MS = 200;
const PANEL_LABEL = 'Link';

type ModifierInit = KeyboardEventInit & MouseEventInit;

type PlatformModifiers = {
    /** The key `Mod` means on this platform. */
    mod: ModifierInit;
    /** The one `Mod` does not mean here. */
    other: ModifierInit;
};

const platformModifiers = (): PlatformModifiers => {
    if (isApple()) {
        return { mod: { metaKey: true }, other: { ctrlKey: true } };
    }
    return { mod: { ctrlKey: true }, other: { metaKey: true } };
};

const { mod: MOD, other: OTHER_MOD } = platformModifiers();

const mount = (value: RteDocument, policy = {}, toolbarPlacement: 'top' | 'floating' = 'top') => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChange = vi.fn<(doc: RteDocument) => void>();
    act(() => {
        root.render(
            <RichTextEditor
                value={value}
                plugins={[boldPlugin, linkPlugin(policy)]}
                toolbarPlacement={toolbarPlacement}
                onChange={onChange}
            />,
        );
    });
    const clean = (): void => {
        act(() => {
            root.unmount();
        });
        container.remove();
    };
    teardown.push(clean);
    const editable = container.querySelector<HTMLElement>('[contenteditable]');
    if (!editable) {
        throw new Error('the editor never became editable');
    }
    act(() => editable.focus());
    return {
        container,
        editable,
        /** Takes the editor down now rather than after the test. */
        unmount: (): void => {
            teardown.splice(teardown.indexOf(clean), 1);
            clean();
        },
        stored: (): RteDocument | null => onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? null,
    };
};

const doc = (...children: Record<string, unknown>[]): RteDocument => ({
    version: 1,
    // The fixtures are loose records on purpose, so one helper builds them; the editor still parses what it gets.
    blocks: [{ type: 'paragraph', children: children as never }],
});

const press = (target: Element, key: string, init: KeyboardEventInit = {}): void => {
    act(() => {
        target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }));
    });
};

/** Puts the selection in the first run of text the given element holds that contains `needle`, as a click or drag would. */
const select = (editable: HTMLElement, needle: string, caretAt?: number): void => {
    const walker = window.document.createTreeWalker(editable, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node && !node.textContent?.includes(needle)) {
        node = walker.nextNode();
    }
    if (!node) {
        throw new Error(`"${needle}" is not in the editor`);
    }
    const start = node.textContent?.indexOf(needle) ?? 0;
    act(() => {
        const range = caretAt === undefined ? [start, start + needle.length] : [caretAt, caretAt];
        window.getSelection()?.setBaseAndExtent(node, range[0] ?? 0, node, range[1] ?? 0);
        window.document.dispatchEvent(new Event('selectionchange'));
    });
};

const click = (target: Element | null, init: MouseEventInit): void => {
    act(() => {
        target?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ...init }));
    });
};

const fieldLabelled = (label: string): HTMLInputElement => {
    for (const element of window.document.querySelectorAll('label')) {
        if (element.querySelector('span:not([aria-hidden])')?.textContent === label) {
            const field = window.document.getElementById(element.htmlFor);
            if (field instanceof HTMLInputElement) {
                return field;
            }
        }
    }
    throw new Error(`no field labelled "${label}"`);
};

const type = (field: HTMLInputElement, value: string): void => {
    act(() => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(field, value);
        field.dispatchEvent(new Event('input', { bubbles: true }));
    });
};

const buttonNamed = (name: string): HTMLButtonElement => {
    const found = [...window.document.querySelectorAll('button')].find(
        (button) => button.textContent === name || button.getAttribute('aria-label') === name,
    );
    if (!found) {
        throw new Error(`no button named "${name}"`);
    }
    return found;
};

describe('adding a link', () => {
    it('is offered at a caret, as Mod-k opens a form whose first field has focus', () => {
        const { editable } = mount(doc({ text: 'hello' }));
        select(editable, 'hello', 2);

        expect(buttonNamed('Add link').disabled).toBe(false);
        press(editable, 'k', MOD);

        expect(window.document.activeElement).toBe(fieldLabelled('Text'));
    });

    it("keeps Mod-k the editor's at a caret when no toolbar can open the form", () => {
        const { editable } = mount(doc({ text: 'hello' }), {}, 'floating');
        select(editable, 'hello', 2);
        const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true, cancelable: true, ...MOD });

        act(() => {
            editable.dispatchEvent(event);
        });

        expect(event.defaultPrevented).toBe(true);
    });

    it('takes focus back to the text on Escape', async () => {
        const { editable } = mount(doc({ text: 'hello' }));
        select(editable, 'hello', 2);
        press(editable, 'k', MOD);

        press(window.document.activeElement as Element, 'Escape');
        // The flyout hands focus back once it has finished closing.
        await act(async () => {
            await vi.waitFor(() => expect(editable.contains(window.document.activeElement)).toBe(true));
        });

        expect(window.document.querySelector('input[type="text"]')).toBeNull();
    });

    it('writes the text and the link at a caret', () => {
        const { editable, stored } = mount(doc({ text: 'hello' }));
        select(editable, 'hello', 2);
        press(editable, 'k', MOD);

        type(fieldLabelled('Text'), 'the site');
        type(fieldLabelled('Link to'), 'example.com');
        press(fieldLabelled('Link to'), 'Enter');

        expect(stored()?.blocks[0]).toMatchObject({
            children: [{ text: 'he' }, { text: 'the site', link: { href: HREF } }, { text: 'llo' }],
        });
    });

    it('falls back to the address as the text when the text is emptied', () => {
        const { editable, stored } = mount(doc({ text: 'hello' }));
        select(editable, 'hello', 5);
        press(editable, 'k', MOD);

        type(fieldLabelled('Link to'), 'example.com');
        press(fieldLabelled('Link to'), 'Enter');

        expect(stored()?.blocks[0]).toMatchObject({
            children: [{ text: 'hello' }, { text: HREF, link: { href: HREF } }],
        });
    });

    it('prefills the selected text, and linking it as it is keeps the formatting inside', () => {
        const { editable, stored } = mount(doc({ text: 'h' }, { text: 'ell', bold: true }, { text: 'o' }));
        select(editable, 'ell');
        press(editable, 'k', MOD);

        expect(fieldLabelled('Text').value).toBe('ell');
        expect(window.document.activeElement).toBe(fieldLabelled('Link to'));
        type(fieldLabelled('Link to'), 'example.com');
        press(fieldLabelled('Link to'), 'Enter');

        expect(stored()?.blocks[0]).toMatchObject({
            children: [{ text: 'h' }, { text: 'ell', bold: true, link: { href: HREF } }, { text: 'o' }],
        });
    });

    it('replaces the selected text when the text was changed', () => {
        const { editable, stored } = mount(doc({ text: 'hello' }));
        select(editable, 'ell');
        press(editable, 'k', MOD);

        type(fieldLabelled('Text'), 'ipp');
        type(fieldLabelled('Link to'), 'example.com');
        press(fieldLabelled('Link to'), 'Enter');

        expect(stored()?.blocks[0]).toMatchObject({
            children: [{ text: 'h' }, { text: 'ipp', link: { href: HREF } }, { text: 'o' }],
        });
    });
});

describe('the panel of a link', () => {
    const linked = (policy = {}) => {
        const editor = mount(doc({ text: 'see ' }, { text: 'docs', link: { href: HREF } }), policy);
        select(editor.editable, 'docs', 2);
        return editor;
    };

    const status = (): HTMLElement => {
        const element = window.document.querySelector<HTMLElement>('output');
        if (!element) {
            throw new Error('the panel has no status');
        }
        return element;
    };

    const clipboard = (writeText: (text: string) => Promise<void>): void => {
        // Only writeText is read, so a full Clipboard is not built.
        vi.spyOn(window.navigator, 'clipboard', 'get').mockReturnValue({ writeText } as unknown as Clipboard);
    };

    const noClipboard = (): void => {
        // A browser without the clipboard API has no `navigator.clipboard` at all.
        vi.spyOn(window.navigator, 'clipboard', 'get').mockReturnValue(undefined as unknown as Clipboard);
    };

    const copy = async (): Promise<void> => {
        await act(async () => {
            buttonNamed('Copy link').click();
            await Promise.resolve();
        });
    };

    it('copies the link and says so', async () => {
        const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue();
        clipboard(writeText);
        linked();
        expect(status().textContent).toBe('');

        await copy();

        expect(writeText).toHaveBeenCalledWith(HREF);
        expect(status().textContent).toBe('Link copied');
    });

    it('says when the link could not be copied', async () => {
        clipboard(() => Promise.reject(new Error('denied')));
        linked();

        await copy();

        expect(status().textContent).toBe('Could not copy the link');
    });

    it('says when the link could not be copied because the browser has no clipboard', async () => {
        noClipboard();
        linked();

        await copy();

        expect(status().textContent).toBe('Could not copy the link');
    });

    it('announces a second copy with the same outcome again', async () => {
        clipboard(vi.fn<(text: string) => Promise<void>>().mockResolvedValue());
        linked();
        const texts: string[] = [];
        const watch = new MutationObserver(() => texts.push(status().textContent ?? ''));
        watch.observe(status(), { childList: true, characterData: true, subtree: true });

        await copy();
        await copy();
        watch.disconnect();

        expect(texts).toEqual(['Link copied', '', 'Link copied']);
    });

    const shiftTab = (target: Element): KeyboardEvent => {
        const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        act(() => {
            target.dispatchEvent(event);
        });
        return event;
    };

    it('returns focus to the text on Shift-Tab from the first control, which is Edit when the link is refused', () => {
        const { editable } = linked({ allowedHosts: ['frontify.com'] });

        press(editable, 'Tab');
        expect(window.document.activeElement).toBe(buttonNamed('Edit'));
        const event = shiftTab(buttonNamed('Edit'));

        expect(event.defaultPrevented).toBe(true);
        expect(editable.contains(window.document.activeElement)).toBe(true);
    });

    it('returns focus to the text on Shift-Tab from the first control, which is the link when it is allowed', () => {
        const { editable } = linked();

        press(editable, 'Tab');
        const target = window.document.querySelector(`[aria-label="${PANEL_LABEL}"] a`);
        expect(target).not.toBeNull();
        expect(window.document.activeElement).toBe(target);
        const event = shiftTab(target as Element);

        expect(event.defaultPrevented).toBe(true);
        expect(editable.contains(window.document.activeElement)).toBe(true);
    });

    it('leaves Shift-Tab from a later control to the browser', () => {
        const { editable } = linked();
        press(editable, 'Tab');
        const remove = buttonNamed('Remove');
        act(() => remove.focus());

        const event = shiftTab(remove);

        expect(event.defaultPrevented).toBe(false);
        expect(editable.contains(window.document.activeElement)).toBe(false);
    });

    it('opens the link in a new tab on a Mod+click, and a plain click only places the caret', () => {
        const open = vi.spyOn(window, 'open').mockReturnValue(null);
        const { editable } = linked();
        const anchor = editable.querySelector('a');

        click(anchor, {});
        expect(open).not.toHaveBeenCalled();

        click(anchor, MOD);
        expect(open).toHaveBeenCalledWith(HREF, '_blank', 'noopener,noreferrer');
    });

    it("does not open the link on the other platform's modifier", () => {
        const open = vi.spyOn(window, 'open').mockReturnValue(null);
        const { editable } = linked();
        const anchor = editable.querySelector('a');

        click(anchor, OTHER_MOD);
        expect(open).not.toHaveBeenCalled();

        click(anchor, MOD);
        expect(open).toHaveBeenCalledTimes(1);
    });

    it('offers no Copy link for a stored link the policy refuses', () => {
        for (const [href, policy] of [
            [HREF, { allowedHosts: ['frontify.com'] }],
            ['javascript:alert(1)', {}],
        ] as const) {
            const editor = mount(doc({ text: 'see ' }, { text: 'docs', link: { href } }), policy);
            select(editor.editable, 'docs', 2);

            const names = [...window.document.querySelectorAll('button')].map((button) => button.textContent);
            expect(names).toContain('Edit');
            expect(names).not.toContain('Copy link');
            expect(window.document.querySelector('output')).toBeNull();
            editor.unmount();
        }
    });

    it('does not open a link the policy refuses', () => {
        const open = vi.spyOn(window, 'open').mockReturnValue(null);
        const { editable } = linked({ allowedHosts: ['frontify.com'] });

        click(editable.querySelector('a'), MOD);

        expect(open).not.toHaveBeenCalled();
    });
});

describe('the destination search of a stored link', () => {
    const openStoredLink = () => {
        const search = vi.fn<(query: string, signal: AbortSignal) => Promise<never[]>>().mockResolvedValue([]);
        const { editable } = mount(doc({ text: 'see ' }, { text: 'docs', link: { href: HREF } }), { search });
        select(editable, 'docs', 2);
        click(buttonNamed('Edit'), {});
        return search;
    };

    it('stays quiet until the value is edited', async () => {
        vi.useFakeTimers();
        const search = openStoredLink();

        await act(async () => {
            await vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS * 2);
        });

        expect(fieldLabelled('Link to').value).toBe(HREF);
        expect(search).not.toHaveBeenCalled();
        expect(window.document.querySelector('output')?.textContent).toBe('');
    });

    it('closes the form on Escape rather than a list', async () => {
        openStoredLink();

        press(fieldLabelled('Link to'), 'Escape');
        await act(async () => {
            await vi.waitFor(() => expect(window.document.querySelector('input[type="url"]')).toBeNull());
        });
    });
});

describe('pasting the reading markup of a link', () => {
    const pasteHtml = (editable: HTMLElement, html: string): void => {
        const data = new DataTransfer();
        data.setData('text/html', html);
        act(() => {
            editable.dispatchEvent(
                new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }),
            );
        });
    };

    it('keeps the new-tab note out of the text, round trip after round trip', () => {
        const link = { text: 'docs', link: { href: HREF, openInNewTab: true as const } };
        const html = serializeToHtml(doc(link), { plugins: [linkPlugin()] });
        expect(html).toContain('opens in new tab');

        const { editable, stored } = mount(doc({ text: 'x' }));
        select(editable, 'x', 1);
        pasteHtml(editable, html);
        const first = stored();
        expect(first?.blocks[0]).toMatchObject({ children: [{ text: 'x' }, link] });
        expect(JSON.stringify(first)).not.toContain('opens in new tab');

        // The text of the second paste lands next to the first link, so what is compared is the link run alone.
        // `stored()` is typed nullable; the expectation above has already shown it holds a document.
        pasteHtml(editable, serializeToHtml(first as RteDocument, { plugins: [linkPlugin()] }));
        const second = JSON.stringify(stored());
        expect(second).not.toContain('opens in new tab');
        expect(second.split('"docs"')).toHaveLength(3);
    });
});
