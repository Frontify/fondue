/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ANY_LIST, defineBlock, defineInline, defineMark, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/core';

import { mountDocument } from './editing';

import type * as ReactDomClient from 'react-dom/client';

/**
 * The React-hosted views must never make the engine wait on React, nor React
 * on the engine: plain marks have no React at all, and the views that do host
 * a component render it whenever React gets to it — never with `flushSync`
 * inside the engine's dispatch.
 */

vi.mock('react-dom/client', async (importOriginal) => {
    const actual = await importOriginal<typeof ReactDomClient>();
    return { ...actual, createRoot: vi.fn(actual.createRoot) };
});

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/** A mirror of the shipped check list: the engine adapter may not import plugins. */
const checkList: RtePlugin = {
    id: 'check-list',
    blocks: {
        checkList: defineBlock({
            content: { items: 'checkItem' },
            toHtml: () => ({ tag: 'ul', attrs: { 'data-check-list': '' }, children: true }),
            parse: [{ tag: 'ul[data-check-list]' }],
        }),
        checkItem: defineBlock<{ checked: boolean }>({
            content: { blocks: [PARAGRAPH, ANY_LIST] },
            defaults: { checked: false },
            toHtml: ({ checked }) => ({
                tag: 'li',
                attrs: {
                    'data-checked': String(checked),
                    class: checked ? 'item done' : 'item',
                    // Only there while checked, to prove it goes away again.
                    ...(checked ? { 'data-done': '' } : {}),
                },
                children: true,
            }),
            parse: [{ tag: 'li[data-checked]' }],
            render: {
                edit: ({ value, setValue, children }) => (
                    <>
                        <input
                            type="checkbox"
                            checked={value.checked}
                            contentEditable={false}
                            onChange={() => setValue({ checked: !value.checked })}
                        />
                        <span className="label">{children}</span>
                    </>
                ),
            },
        }),
    },
};

const bold: RtePlugin = {
    id: 'bold',
    marks: {
        bold: defineMark({
            toHtml: () => ({ tag: 'strong', children: true }),
            parse: [{ tag: 'strong' }],
        }),
    },
};

const tagRenders = vi.fn<() => void>();
const tag: RtePlugin = {
    id: 'tag',
    inlines: {
        tag: defineInline<{ label: string }>({
            toHtml: ({ label }) => ({ tag: 'span', attrs: { 'data-tag': '' }, children: label }),
            parse: [{ tag: 'span[data-tag]', value: (element) => ({ label: element.textContent ?? '' }) }],
            render: {
                edit: ({ value, isFocused }) => {
                    tagRenders();
                    return <span data-focused={String(isFocused)}>{value?.label}</span>;
                },
            },
        }),
    },
};

const plugins = [bold, checkList, tag];

const checkListDoc = (checked: boolean): RteDocumentOf => ({
    version: 1,
    blocks: [
        {
            type: 'checkList',
            children: [{ type: 'checkItem', checked, children: [{ type: PARAGRAPH, children: [{ text: 'task' }] }] }],
        },
    ],
});

const mounted: { destroy(): void }[] = [];

const mountInto = (container: HTMLElement, initialDoc: RteDocumentOf) => {
    const live = mountDocument({
        container,
        initialDoc,
        plugins,
        readOnly: false,
        placeholder: '',
        contentClassName: 'content',
        placeholderClassName: 'placeholder',
        onDocChange: () => {},
        onStateChange: () => {},
        onBlur: () => {},
    });
    mounted.push(live);
    return live;
};

const mount = (initialDoc: RteDocumentOf) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    let live!: ReturnType<typeof mountInto>;
    act(() => {
        live = mountInto(container, initialDoc);
    });
    return { container, live };
};

let consoleError: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
    vi.mocked(createRoot).mockClear();
    tagRenders.mockClear();
    consoleError = vi.spyOn(console, 'error');
});

afterEach(async () => {
    // The views unmount their roots in a microtask after the engine is done
    // with them; that is still React work, so it is awaited inside `act`.
    await act(async () => {
        for (const live of mounted.splice(0)) {
            live.destroy();
        }
        await Promise.resolve();
    });
    window.document.body.replaceChildren();
    // Nothing logged: React's flushSync warning goes to console.error.
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
});

/**
 * Inside `act`, React queues its work until the callback returns — so what
 * `expectBeforeReact` sees is what is in the page before React has rendered.
 */
const mountBeforeReact = (initialDoc: RteDocumentOf, expectBeforeReact: (container: HTMLElement) => void) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    act(() => {
        mountInto(container, initialDoc);
        expectBeforeReact(container);
    });
    return container;
};

describe('a mark without editing UI', () => {
    it('is drawn by the engine at once, with no React root', () => {
        mountBeforeReact(
            {
                version: 1,
                blocks: [{ type: PARAGRAPH, children: [{ text: 'plain ' }, { text: 'bold', bold: true }] }],
            },
            (container) => {
                expect(container.querySelector('strong')?.textContent).toBe('bold');
                expect(container.querySelector('p')?.innerHTML).toBe('plain <strong>bold</strong>');
            },
        );

        expect(createRoot).not.toHaveBeenCalled();
    });
});

describe('a block with editing UI', () => {
    it('has its content in the page before React renders', () => {
        mountBeforeReact(checkListDoc(false), (container) => {
            expect(container.querySelector('li input')).toBeNull();
            expect(container.querySelector('li')?.textContent).toBe('task');
            expect(container.querySelector('li')?.getAttribute('data-checked')).toBe('false');
        });
    });

    it('moves its content into the hole the component placed', () => {
        const { container } = mount(checkListDoc(false));

        const item = container.querySelector('li');
        expect(item?.querySelector('input[type=checkbox]')).not.toBeNull();
        expect(item?.querySelector('.label p')?.textContent).toBe('task');
    });

    it('keeps the caret when its content moves into the hole', () => {
        let text: ChildNode | null | undefined;
        const container = mountBeforeReact(checkListDoc(false), (beforeReact) => {
            text = beforeReact.querySelector('p')?.firstChild;
            if (text) {
                window.document.getSelection()?.setBaseAndExtent(text, 2, text, 2);
            }
        });

        const selection = window.document.getSelection();
        expect(text).toBeTruthy();
        expect(container.querySelector('.label p')?.firstChild).toBe(text);
        expect(selection?.anchorNode).toBe(text);
        expect(selection?.anchorOffset).toBe(2);
    });

    it('updates its element and drops the attributes the new `toHtml` does not have', () => {
        const { container } = mount(checkListDoc(false));
        const item = container.querySelector('li');
        const checkbox = (): HTMLInputElement | null | undefined => item?.querySelector('input');

        act(() => checkbox()?.click());

        expect(container.querySelector('li')).toBe(item);
        expect(item?.getAttribute('data-checked')).toBe('true');
        expect(item?.hasAttribute('data-done')).toBe(true);
        expect(item?.classList.contains('done')).toBe(true);
        expect(checkbox()?.checked).toBe(true);

        act(() => checkbox()?.click());

        expect(item?.getAttribute('data-checked')).toBe('false');
        expect(item?.hasAttribute('data-done')).toBe(false);
        expect(item?.classList.contains('done')).toBe(false);
        expect(item?.classList.contains('item')).toBe(true);
        expect(checkbox()?.checked).toBe(false);
    });

    it('leaves the classes the engine set on its element alone', () => {
        const { container } = mount(checkListDoc(false));
        const item = container.querySelector('li');
        item?.classList.add('ProseMirror-selectednode');

        act(() => item?.querySelector('input')?.click());

        expect(item?.classList.contains('ProseMirror-selectednode')).toBe(true);
    });

    it('is built inside React work without a flushSync warning', () => {
        const host = window.document.createElement('div');
        window.document.body.append(host);
        const Host = () => {
            const ref = useRef<HTMLDivElement>(null);
            useLayoutEffect(() => {
                if (!ref.current) {
                    return;
                }
                const live = mountInto(ref.current, { version: 1, blocks: [] });
                // The engine dispatches from inside a React commit, as a host
                // handing over a document from an effect does.
                live.setDoc(checkListDoc(true));
            }, []);
            return <div ref={ref} />;
        };
        const root = createRoot(host);

        act(() => root.render(<Host />));

        expect(host.querySelector('li input')).toHaveProperty('checked', true);
        act(() => root.unmount());
    });

    it('ignores its callbacks once the editor is gone, and unmounts quietly', async () => {
        const { container, live } = mount(checkListDoc(false));
        const checkbox = container.querySelector('input');

        live.destroy();
        // The component is still mounted until the microtask after the
        // engine is done, so its checkbox still calls `setValue`.
        expect(() => checkbox?.click()).not.toThrow();
        await act(async () => {
            await Promise.resolve();
        });

        expect(checkbox?.isConnected).toBe(false);
    });
});

describe('an inline element with editing UI', () => {
    it('re-renders only when what it is handed changes', () => {
        const { live } = mount({
            version: 1,
            blocks: [{ type: PARAGRAPH, children: [{ text: 'ab' }, { type: 'tag', label: 'x' }, { text: 'cd' }] }],
        });
        const rendersAfterMount = tagRenders.mock.calls.length;

        // Typing at the start, nowhere near the node.
        act(() => live.handle.api.insertText('1'));
        act(() => live.handle.api.insertText('2'));

        expect(tagRenders).toHaveBeenCalledTimes(rendersAfterMount);
    });
});
