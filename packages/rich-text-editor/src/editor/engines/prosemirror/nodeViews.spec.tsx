/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { TextSelection } from 'prosemirror-state';
import { act, createContext, type ReactNode, useContext, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    buildPluginRegistry,
    ANY_LIST,
    defineBlock,
    defineInline,
    defineMark,
    PARAGRAPH,
    type RteDocumentOf,
    type EditorControlApi,
    type RtePlugin,
} from '#/core';
import { type ViewPortals } from '#/editor/port';

import { mountEditorForTests } from './editing';

/**
 * The React-hosted views must never make the engine wait on React, nor React
 * on the engine: plain marks have no React at all, and the views that do host
 * a component hand it to the shell as a portal, which renders it whenever
 * React gets to it — never with `flushSync` inside the engine's dispatch.
 */

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
const hosts: Root[] = [];

/**
 * The shell's side of `ViewPortals`, as small as it gets: the portals in a
 * store, and one component rendering them all.
 */
const createViewPortals = () => {
    const portals = new Map<object, ReactNode>();
    const listeners = new Set<() => void>();
    let snapshot: ReactNode[] = [];
    const changed = (): void => {
        snapshot = [...portals.values()];
        for (const listener of listeners) {
            listener();
        }
    };
    const store: ViewPortals = {
        set: (owner, portal) => {
            portals.set(owner, portal);
            changed();
        },
        delete: (owner) => {
            portals.delete(owner);
            changed();
        },
    };
    return {
        ...store,
        subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        getSnapshot: () => snapshot,
    };
};

const ViewPortalHost = ({ store }: { store: ReturnType<typeof createViewPortals> }): ReactNode =>
    useSyncExternalStore(store.subscribe, store.getSnapshot);

/** What a component inside the shell's providers reads. */
const ShellContext = createContext('none');

/** Mounts the editor, and the shell's one host for its views' portals inside a provider. Call inside `act`. */
const mountInto = (container: HTMLElement, initialDoc: RteDocumentOf) => {
    const portals = createViewPortals();
    const hostElement = window.document.createElement('div');
    window.document.body.append(hostElement);
    const host = createRoot(hostElement);
    hosts.push(host);
    host.render(
        <ShellContext.Provider value="shell">
            <ViewPortalHost store={portals} />
        </ShellContext.Provider>,
    );
    const { mounted: live, view } = mountEditorForTests({
        container,
        initialDoc,
        registry: buildPluginRegistry(plugins),
        placeholder: '',
        attributes: {},
        placeholderClassName: 'placeholder',
        onDocChange,
        onStateChange: () => {},
        onBlur: () => {},
        viewPortals: portals,
    });
    mounted.push(live);
    return { live, portals, view };
};

const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

const mount = (initialDoc: RteDocumentOf) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    let mountedEditor!: ReturnType<typeof mountInto>;
    act(() => {
        mountedEditor = mountInto(container, initialDoc);
    });
    return { container, ...mountedEditor };
};

let consoleError: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
    tagRenders.mockClear();
    onDocChange.mockClear();
    consoleError = vi.spyOn(console, 'error');
});

afterEach(async () => {
    await act(async () => {
        for (const live of mounted.splice(0)) {
            live.destroy();
        }
        for (const host of hosts.splice(0)) {
            host.unmount();
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
const mountBeforeReact = (
    initialDoc: RteDocumentOf,
    expectBeforeReact: (container: HTMLElement) => void,
): { container: HTMLElement; portals: ReturnType<typeof createViewPortals> } => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    let portals!: ReturnType<typeof createViewPortals>;
    act(() => {
        ({ portals } = mountInto(container, initialDoc));
        expectBeforeReact(container);
    });
    return { container, portals };
};

describe('a mark without editing UI', () => {
    it('is drawn by the engine at once, with no React', () => {
        const { portals } = mountBeforeReact(
            {
                version: 1,
                blocks: [{ type: PARAGRAPH, children: [{ text: 'plain ' }, { text: 'bold', bold: true }] }],
            },
            (container) => {
                expect(container.querySelector('strong')?.textContent).toBe('bold');
                expect(container.querySelector('p')?.innerHTML).toBe('plain <strong>bold</strong>');
            },
        );

        expect(portals.getSnapshot()).toHaveLength(0);
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
        const { container } = mountBeforeReact(checkListDoc(false), (beforeReact) => {
            text = beforeReact.querySelector('p')?.firstChild;
            // Only an editor holding focus has a caret to keep.
            beforeReact.querySelector<HTMLElement>('[contenteditable]')?.focus();
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
                const { live } = mountInto(ref.current, { version: 1, blocks: [] });
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

        await act(async () => {
            live.destroy();
            // The component is still mounted until React next renders the
            // portals, so its checkbox still calls `setValue`.
            expect(() => checkbox?.click()).not.toThrow();
            await Promise.resolve();
        });

        expect(checkbox?.isConnected).toBe(false);
    });
});

describe('an inline element with editing UI', () => {
    it('is focused while the caret sits right after it, and not once the caret moves away', () => {
        const { container, view } = mount({
            version: 1,
            blocks: [
                { type: PARAGRAPH, children: [{ text: 'ab' }, { type: 'tag', label: 'x' }, { text: 'cd' }] },
                { type: PARAGRAPH, children: [{ text: 'far away' }] },
            ],
        });
        const focused = (): string | null | undefined =>
            container.querySelector('[data-focused]')?.getAttribute('data-focused');
        const caretAt = (pos: number): void =>
            act(() => {
                view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, pos)));
            });

        caretAt(4);
        expect(focused()).toBe('true');

        caretAt(12);
        expect(focused()).toBe('false');
    });

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

describe('every view with editing UI', () => {
    it('is handed a working api on its very first render', () => {
        const seen: (EditorControlApi | undefined)[] = [];
        plugins.push({
            id: 'probe',
            blocks: {
                probe: defineBlock({
                    content: 'text',
                    toHtml: () => ({ tag: 'div', children: true }),
                    parse: [],
                    render: {
                        edit: ({ api, children }) => {
                            seen.push(api);
                            return <>{children}</>;
                        },
                    },
                }),
            },
        });
        try {
            mount({ version: 1, blocks: [{ type: 'probe', children: [{ text: 'x' }] }] });
        } finally {
            plugins.pop();
        }

        expect(seen.length).toBeGreaterThan(0);
        expect(seen[0]?.selection.get().block).toEqual({ type: 'probe' });
    });

    it("renders inside the shell, so it sees the shell's context providers", () => {
        const contexts: string[] = [];
        const ContextProbe = (): null => {
            contexts.push(useContext(ShellContext));
            return null;
        };
        plugins.push({
            id: 'probe',
            inlines: {
                probe: defineInline({
                    toHtml: () => ({ tag: 'span' }),
                    parse: [],
                    render: { edit: ContextProbe },
                }),
            },
        });
        try {
            mount({ version: 1, blocks: [{ type: PARAGRAPH, children: [{ type: 'probe' }] }] });
        } finally {
            plugins.pop();
        }

        expect(contexts).toContain('shell');
        expect(contexts).not.toContain('none');
    });

    it('keeps host element rules off the elements it wraps content in', () => {
        const { container } = mount(checkListDoc(false));

        const wrappers = container.querySelectorAll('li .rte-view-wrapper');
        expect(wrappers.length).toBeGreaterThan(0);
        for (const wrapper of wrappers) {
            expect(wrapper.getAttribute('style')).toBe('display: contents;');
        }
    });
});

describe('a mark with editing UI', () => {
    const linkLike: RtePlugin = {
        id: 'anchor',
        marks: {
            anchor: defineMark<{ href: string }>({
                inclusive: false,
                toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                parse: [{ tag: 'a[href]', value: (element) => ({ href: element.getAttribute('href') ?? '' }) }],
                render: {
                    edit: ({ value, children }) => <a href={value.href}>{children}</a>,
                },
            }),
        },
    };

    it('takes in text the browser typed beside its content rather than dropping it', async () => {
        plugins.push(linkLike);
        let container!: HTMLElement;
        try {
            ({ container } = mount({
                version: 1,
                blocks: [
                    {
                        type: PARAGRAPH,
                        children: [{ text: 'see ' }, { text: 'link', anchor: { href: 'https://e.com' } }],
                    },
                ],
            }));
        } finally {
            plugins.pop();
        }
        const anchor = container.querySelector('a');
        expect(anchor?.textContent).toBe('link');

        // What Chrome does with a character typed at the end of a link: it
        // lands after the component's `<a>`, beside the content.
        anchor?.after('Z');
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(onDocChange.mock.lastCall?.[0].blocks).toEqual([
            {
                type: PARAGRAPH,
                children: [{ text: 'see ' }, { text: 'link', anchor: { href: 'https://e.com' } }, { text: 'Z' }],
            },
        ]);
    });
});
