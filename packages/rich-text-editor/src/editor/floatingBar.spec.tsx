/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { columnBreakPlugin, defaultPlugins, RichTextEditor, type RteDocument } from '../index';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/**
 * The floating bar's own controls — "Turn into", the inline marks and everything else —
 * and the `/` menu, driven through the public editor the way a host mounts it.
 */

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const mount = (render: (onChange: (doc: RteDocument) => void) => ReactNode) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChange = vi.fn<(doc: RteDocument) => void>();
    act(() => {
        root.render(render(onChange));
    });
    teardown.push(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
    });
    const editable = container.querySelector<HTMLElement>('[contenteditable]');
    if (!editable) {
        throw new Error('the editor never became editable');
    }
    return {
        container,
        editable,
        stored: (): RteDocument | null => onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? null,
    };
};

const press = (target: Element, key: string, init: KeyboardEventInit = {}): KeyboardEvent => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
    act(() => {
        target.dispatchEvent(event);
    });
    return event;
};

const paste = (editable: HTMLElement, content: { html?: string; text?: string }): void => {
    const data = new DataTransfer();
    if (content.html !== undefined) {
        data.setData('text/html', content.html);
    }
    if (content.text !== undefined) {
        data.setData('text/plain', content.text);
    }
    act(() => {
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
};

const labels = (elements: Iterable<Element>): (string | null)[] =>
    [...elements].map((element) => element.getAttribute('aria-label'));

/** The text a screen reader reads out: an icon drawn as text ("H2") is hidden from it. */
const spokenText = (element: Element): string => {
    const copy = element.cloneNode(true) as Element;
    for (const hidden of copy.querySelectorAll('[aria-hidden="true"]')) {
        hidden.remove();
    }
    return copy.textContent ?? '';
};

describe('the floating bar', () => {
    const open = (html: string) => {
        const editor = mount((onChange) => (
            <RichTextEditor plugins={defaultPlugins} toolbarPlacement="floating" onChange={onChange} />
        ));
        paste(editor.editable, { html });
        act(() => editor.editable.focus());
        press(editor.editable, 'F10', { altKey: true });
        const bar = editor.container.querySelector<HTMLElement>('[role="toolbar"]');
        if (!bar) {
            throw new Error('the bar never appeared');
        }
        return { ...editor, bar };
    };

    it('shows Turn into first, naming what the block is, then every inline item in plugin order', () => {
        const { bar } = open('<p>text</p>');

        const controls = labels(bar.querySelectorAll('button'));
        expect(controls[0]).toBe('Turn into: Text');
        expect(controls).not.toContain('More');
        expect(controls).toContain('Bold');
        expect(controls).toContain('Italic');
        // Blocks reach the bar through Turn into, not as buttons.
        expect(controls).not.toContain('Quote');
    });

    it('names the style of a heading in Turn into', () => {
        const { bar } = open('<h2>text</h2>');

        expect(bar.querySelector('button')?.getAttribute('aria-label')).toBe('Turn into: Heading 2');
    });

    it('shows alignment, subscript, superscript and reset formatting in the bar', () => {
        const { bar } = open('<p>text</p>');

        const names = labels(bar.querySelectorAll('button'));
        expect(names).toEqual(expect.arrayContaining(['Align left', 'Subscript', 'Superscript']));
        expect(names.some((name) => /reset/i.test(name ?? ''))).toBe(true);
        expect(window.document.querySelector('[aria-label="More formatting"]')).toBeNull();
    });

    it('draws no bar when there is nothing to put in it', () => {
        const editor = mount((onChange) => (
            <RichTextEditor
                plugins={[{ id: 'quiet', toolbarItem: () => null, floatingToolbar: 'hidden' }]}
                toolbarPlacement="floating"
                onChange={onChange}
            />
        ));
        paste(editor.editable, { html: '<p>text</p>' });
        act(() => editor.editable.focus());
        press(editor.editable, 'F10', { altKey: true });

        expect(editor.container.querySelector('[role="toolbar"]')).toBeNull();
        expect(editor.container.querySelector('[data-side]')).toBeNull();
    });

    it('turns the block into a heading from Turn into', () => {
        const { bar, stored } = open('<p>text</p>');
        const trigger = bar.querySelector<HTMLElement>('[aria-label^="Turn into"]');
        if (!trigger) {
            throw new Error('no Turn into');
        }
        act(() => trigger.focus());
        press(trigger, 'ArrowDown');

        const items = [...window.document.querySelectorAll<HTMLElement>('[role="menuitem"]')];
        expect(items.map(spokenText)).toEqual(expect.arrayContaining(['Text', 'Heading 1', 'Quote']));
        const heading = items.find((item) => spokenText(item) === 'Heading 1');
        act(() => heading?.click());

        expect(stored()?.blocks[0]).toMatchObject({ type: 'textStyle', style: 'heading1' });
    });

    const turnInto = (bar: HTMLElement, label: string): void => {
        const trigger = bar.querySelector<HTMLElement>('[aria-label^="Turn into"]');
        if (!trigger) {
            throw new Error('no Turn into');
        }
        act(() => trigger.focus());
        press(trigger, 'ArrowDown');
        const items = [...window.document.querySelectorAll<HTMLElement>('[role="menuitem"]')];
        act(() => items.find((item) => spokenText(item) === label)?.click());
    };

    it('turns a list item into a heading, leaving the list', () => {
        const { bar, stored } = open('<ul><li>one</li></ul>');

        turnInto(bar, 'Heading 1');

        expect(stored()?.blocks[0]).toMatchObject({
            type: 'textStyle',
            style: 'heading1',
            children: [{ text: 'one' }],
        });
    });

    it('does nothing when the entry chosen is the one the block already is', () => {
        const { bar, stored } = open('<ul><li>one</li></ul>');
        const before = stored();

        turnInto(bar, 'Bulleted list');

        expect(stored()).toBe(before);
        expect(stored()?.blocks[0]).toMatchObject({ type: 'bulletList' });
    });
});

describe('the / menu', () => {
    const plugins = [...defaultPlugins, columnBreakPlugin()];
    const start = () => mount((onChange) => <RichTextEditor plugins={plugins} onChange={onChange} />);

    const listbox = (): HTMLElement | null => window.document.querySelector('[role="listbox"]');
    const options = (): string[] => [...window.document.querySelectorAll('[role="option"]')].map(spokenText);

    /** What typing does to the text, as far as the editor can tell. */
    const type = (editable: HTMLElement, text: string): void => paste(editable, { text });

    it('opens on a slash typed into an empty paragraph, listing both groups', () => {
        const { editable } = start();
        act(() => editable.focus());

        type(editable, '/');

        expect(listbox()).not.toBeNull();
        expect(options()).toEqual(expect.arrayContaining(['Text', 'Heading 1', 'Quote', 'Column break']));
        expect([...window.document.querySelectorAll('[role="status"]')].map((status) => status.textContent)).toContain(
            `${options().length} commands`,
        );
        // The text names the highlighted option, so the caret never leaves it.
        const active = window.document.querySelector('[role="option"][aria-selected="true"]');
        expect(active?.id).toBeTruthy();
        expect(window.document.querySelector('[contenteditable]')?.getAttribute('aria-activedescendant')).toBe(
            active?.id,
        );
    });

    it('narrows to what is typed after the slash', () => {
        const { editable } = start();
        act(() => editable.focus());

        type(editable, '/');
        type(editable, 'hea');

        expect(options()).toEqual(['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4']);
    });

    it('runs the highlighted command on Enter, taking the typed text with it', () => {
        const { editable, stored } = start();
        act(() => editable.focus());
        type(editable, '/');
        type(editable, 'hea');

        const event = press(editable, 'Enter');

        expect(event.defaultPrevented).toBe(true);
        expect(listbox()).toBeNull();
        // The `/hea` went before the command ran: nothing is left in the block.
        expect(stored()?.blocks[0]).toEqual({ type: 'textStyle', style: 'heading1', children: [] });
    });

    it('moves with the arrows, so Enter runs the one highlighted', () => {
        const { editable, stored } = start();
        act(() => editable.focus());
        type(editable, '/');
        type(editable, 'hea');

        press(editable, 'ArrowDown');
        press(editable, 'Enter');

        expect(stored()?.blocks[0]).toMatchObject({ type: 'textStyle', style: 'heading2' });
    });

    it('closes on Escape, leaving what was typed', () => {
        const { editable, stored } = start();
        act(() => editable.focus());
        type(editable, '/');
        type(editable, 'hea');

        press(editable, 'Escape');

        expect(listbox()).toBeNull();
        expect(stored()?.blocks[0]).toMatchObject({ type: 'paragraph', children: [{ text: '/hea' }] });
    });

    it('says so when nothing matches, and is gone after a space typed there', () => {
        const { editable } = start();
        act(() => editable.focus());
        type(editable, '/');
        type(editable, 'zzz');

        expect(window.document.body.textContent).toContain('No results');

        type(editable, ' ');

        expect(window.document.querySelector('[role="listbox"]')).toBeNull();
        expect(window.document.body.textContent).not.toContain('No results');
    });

    it('does not open for a slash in the middle of text', () => {
        const { editable } = start();
        act(() => editable.focus());

        type(editable, 'and/or');
        type(editable, ' /');

        expect(listbox()).toBeNull();
    });
});
