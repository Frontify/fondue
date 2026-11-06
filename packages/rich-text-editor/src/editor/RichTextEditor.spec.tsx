/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, Profiler, type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Driven through the package's public API, the way a host does: the props are
// the whole conversation between a host and a mounted editor.
import {
    alignPlugin,
    boldPlugin,
    checkListPlugin,
    defaultPlugins,
    linkPlugin,
    mentionPlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RtePlugin,
    serializeToHtml,
} from '../index';

import { useFocusWithin } from './hooks/useFocusWithin';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const paragraph = (text: string): RteDocument => ({
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text }] }],
});

const teardown: (() => void)[] = [];

/**
 * The engine mounts in an effect, which `act` flushes, so an editor is
 * editable as soon as `mount` or `rerender` returns. Tests driving it assert
 * that first, so a failure says where it went wrong.
 */
const expectEditable = (container: HTMLElement): void => {
    if (!container.querySelector('[contenteditable]')) {
        throw new Error('the editor never became editable');
    }
};

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

    return {
        container,
        onChange,
        /** Throws unless the engine has taken the content over. */
        ready: (): void => expectEditable(container),
        /** What the host would now be holding, or null if it was never told. */
        stored: (): RteDocument | null => {
            const { calls } = onChange.mock;
            return calls.length === 0 ? null : (calls[calls.length - 1]?.[0] ?? null);
        },
        rerender: (next: ReactNode): void => {
            act(() => {
                root.render(next);
            });
        },
    };
};

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

/** A paste, dispatched on the editable element the way a browser does. */
const paste = (container: HTMLElement, html: string): void => {
    const editable = container.querySelector('[contenteditable]');
    if (!editable) {
        throw new Error('the editor has no editable element');
    }
    const data = new DataTransfer();
    data.setData('text/html', html);
    act(() => {
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
};

/** The editable element, which a mounted editor always has. */
const editableIn = (container: HTMLElement): HTMLElement => {
    const editable = container.querySelector<HTMLElement>('[contenteditable]');
    if (!editable) {
        throw new Error('the editor has no editable element');
    }
    return editable;
};

const press = (target: Element, key: string, init: KeyboardEventInit = {}): void => {
    act(() => {
        target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }));
    });
};

/** The text of a block in what the host was handed, marks and all. */
const childrenOf = (doc: RteDocument | null, index = 0): unknown[] => {
    const block = doc?.blocks[index];
    return block && 'children' in block ? block.children : [];
};

const checkListPlugins = [checkListPlugin()];

const toDo: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'checkList',
            children: [
                {
                    type: 'checkItem',
                    checked: true,
                    children: [{ type: 'paragraph', children: [{ text: 'Done this' }] }],
                },
                {
                    type: 'checkItem',
                    checked: false,
                    children: [{ type: 'paragraph', children: [{ text: 'Not yet' }] }],
                },
            ],
        },
    ],
} as RteDocument;

/** Renders what is not an editor (the readonly renderer) the way `mount` renders an editor. */
const render = (element: ReactNode): HTMLElement => mount(() => element).container;

/** Each checkbox's state and the name it gets, from its own label or the text it points at. */
const checkboxes = (container: HTMLElement): string[] =>
    [...container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')].map((box) => {
        const labelledBy = box.getAttribute('aria-labelledby');
        const name = labelledBy
            ? container.ownerDocument.getElementById(labelledBy)?.textContent
            : box.getAttribute('aria-label');
        return `${box.checked ? 'checked' : 'unchecked'}: ${name ?? ''}`;
    });

describe('a `value` set from outside', () => {
    it('is shown, and is not reported back', () => {
        const { container, onChange, ready } = mount((change) => (
            <RichTextEditor value={paragraph('first')} onChange={change} plugins={defaultPlugins} />
        ));
        ready();

        expect(container.textContent).toContain('first');
        expect(onChange).not.toHaveBeenCalled();
    });

    it('replaces the content when it genuinely differs', () => {
        const onChange = vi.fn<(doc: RteDocument) => void>();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('before')} onChange={onChange} plugins={defaultPlugins} />
        ));
        ready();

        rerender(<RichTextEditor value={paragraph('after')} onChange={onChange} plugins={defaultPlugins} />);

        expect(container.textContent).toContain('after');
        expect(container.textContent).not.toContain('before');
    });

    it('is ignored when an equal document arrives as a new object', () => {
        const onChange = vi.fn<(doc: RteDocument) => void>();
        const doc = paragraph('settled');
        const { rerender, ready } = mount(() => (
            <RichTextEditor value={doc} onChange={onChange} plugins={defaultPlugins} />
        ));
        ready();

        // A host that normalizes what it stores, or whose value went through a
        // `JSON.parse`: the same content, a new object on every render.
        for (let round = 0; round < 5; round++) {
            rerender(<RichTextEditor value={structuredClone(doc)} onChange={onChange} plugins={defaultPlugins} />);
        }

        // Nothing to replace and nothing to report; reporting here is what
        // would make a controlled editor loop.
        expect(onChange).not.toHaveBeenCalled();
    });
});

describe('an editable editor', () => {
    it('shows the document once the view mounts, once', () => {
        const { container, ready } = mount((onChange) => (
            <RichTextEditor value={paragraph('already here')} onChange={onChange} plugins={defaultPlugins} />
        ));

        ready();

        const editable = editableIn(container);
        expect(editable.querySelectorAll('p')).toHaveLength(1);
        expect(editable.textContent).toBe('already here');
    });
});

describe('a readonly editor', () => {
    it('shows the document without ever becoming editable', () => {
        const { container } = mount(() => (
            <RichTextEditor value={paragraph('for reading')} plugins={defaultPlugins} readonly />
        ));

        expect(container.textContent).toContain('for reading');
        expect(container.querySelector('[contenteditable]')).toBeNull();
    });

    it('follows a changed document', () => {
        const { container, rerender } = mount(() => (
            <RichTextEditor value={paragraph('first')} plugins={defaultPlugins} readonly />
        ));

        rerender(<RichTextEditor value={paragraph('second')} plugins={defaultPlugins} readonly />);

        expect(container.textContent).toContain('second');
        expect(container.textContent).not.toContain('first');
    });

    it('starts editing from the document it was last given, not the first', () => {
        const second = paragraph('second');
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('first')} plugins={defaultPlugins} readonly />
        ));

        rerender(<RichTextEditor value={second} plugins={defaultPlugins} readonly />);
        rerender(<RichTextEditor value={second} plugins={defaultPlugins} />);
        ready();

        expect(container.textContent).toContain('second');
        expect(container.textContent).not.toContain('first');
    });

    it('keeps what was typed into an uncontrolled editor across a readonly toggle', () => {
        const { container, rerender, ready } = mount(() => <RichTextEditor plugins={defaultPlugins} />);
        ready();

        paste(container, '<p>typed</p>');
        rerender(<RichTextEditor plugins={defaultPlugins} readonly />);
        expect(container.textContent).toContain('typed');

        rerender(<RichTextEditor plugins={defaultPlugins} />);
        ready();
        expect(container.textContent).toContain('typed');
    });

    it('becomes editable once readonly is turned off', () => {
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('was readonly')} plugins={defaultPlugins} readonly />
        ));

        expect(container.querySelector('[contenteditable]')).toBeNull();

        rerender(<RichTextEditor value={paragraph('was readonly')} plugins={defaultPlugins} />);
        ready();

        expect(container.textContent).toContain('was readonly');
    });
});

describe('a page of editors', () => {
    const COUNT = 30;
    const KEYS = Array.from({ length: COUNT }, (_, index) => `editor-${index}`);

    it('mounts them all, and none of them talks when nothing changed', () => {
        const onChange = vi.fn<(doc: RteDocument) => void>();
        const docs = Array.from({ length: COUNT }, (_, index) => paragraph(`editor ${index}`));
        const page = (values: RteDocument[]): ReactNode => (
            <>
                {values.map((doc, index) => (
                    <RichTextEditor key={KEYS[index]} value={doc} onChange={onChange} plugins={defaultPlugins} />
                ))}
            </>
        );

        const { container, rerender, ready } = mount(() => page(docs));
        ready();

        expect(container.querySelectorAll('[contenteditable]')).toHaveLength(COUNT);
        expect(container.textContent).toContain('editor 0');
        expect(container.textContent).toContain(`editor ${COUNT - 1}`);

        // One editor's change re-renders the whole page, handing all thirty a
        // value again — twenty-nine of them what they already have.
        rerender(page(docs.map((doc, index) => (index === 0 ? paragraph('edited') : doc))));

        expect(container.textContent).toContain('edited');
        expect(onChange).not.toHaveBeenCalled();
    });
});

describe('the editable element', () => {
    it("follows a plugin's content class when the plugins change", () => {
        const columns = (className: string) => [...defaultPlugins, { id: 'columns', contentClassName: className }];
        const { container, rerender, ready } = mount(() => <RichTextEditor plugins={columns('two')} />);
        ready();
        expect(editableIn(container).classList.contains('two')).toBe(true);

        rerender(<RichTextEditor plugins={columns('three')} />);

        const editable = editableIn(container);
        expect(editable.classList.contains('three')).toBe(true);
        expect(editable.classList.contains('two')).toBe(false);
    });

    it('is a multi-line text box, named by the host', () => {
        const { container, ready } = mount(() => (
            <RichTextEditor
                plugins={defaultPlugins}
                aria-label="Comment"
                aria-describedby="help"
                placeholder="Say something"
            />
        ));
        ready();

        const editable = editableIn(container);
        expect(editable.getAttribute('role')).toBe('textbox');
        expect(editable.getAttribute('aria-multiline')).toBe('true');
        expect(editable.getAttribute('aria-label')).toBe('Comment');
        expect(editable.getAttribute('aria-describedby')).toBe('help');
        expect(editable.getAttribute('aria-placeholder')).toBe('Say something');
    });

    it('takes its name from a visible label when one is pointed at', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={defaultPlugins} aria-labelledby="label" />);
        ready();

        const editable = editableIn(container);
        expect(editable.getAttribute('aria-labelledby')).toBe('label');
        expect(editable.hasAttribute('aria-label')).toBe(false);
    });

    it('still has a name when the host gave it none', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={defaultPlugins} />);
        ready();

        expect(editableIn(container).getAttribute('aria-label')).toBe('Rich text editor');
        expect(editableIn(container).hasAttribute('aria-placeholder')).toBe(false);
    });

    it('follows a changed name without being rebuilt', () => {
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor plugins={defaultPlugins} aria-label="One" />
        ));
        ready();
        const editable = editableIn(container);

        rerender(<RichTextEditor plugins={defaultPlugins} aria-label="Two" />);

        expect(editableIn(container)).toBe(editable);
        expect(editable.getAttribute('aria-label')).toBe('Two');
    });

    it('keeps a labelled editor named when it turns readonly', () => {
        const { container } = mount(() => (
            <RichTextEditor value={paragraph('read me')} plugins={defaultPlugins} aria-label="Comment" readonly />
        ));

        const group = container.querySelector('[role="group"]');
        expect(group?.getAttribute('aria-label')).toBe('Comment');
        expect(group?.textContent).toContain('read me');
    });

    it('lets Escape take focus out of the text', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={defaultPlugins} />);
        ready();
        const editable = editableIn(container);
        act(() => editable.focus());

        // A browser's keydown carries `keyCode`, which ProseMirror reads to
        // prevent Escape's default.
        press(editable, 'Escape', { keyCode: 27 });

        expect(editable.contains(window.document.activeElement)).toBe(false);
    });

    it('keeps focus in the text when Escape closed the `/` menu', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={defaultPlugins} />);
        ready();
        const editable = editableIn(container);
        act(() => editable.focus());
        const data = new DataTransfer();
        data.setData('text/plain', '/');
        act(() => {
            editable.dispatchEvent(
                new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }),
            );
        });
        expect(window.document.querySelector('[role="listbox"]')).not.toBeNull();

        press(editable, 'Escape', { keyCode: 27 });

        expect(window.document.querySelector('[role="listbox"]')).toBeNull();
        expect(window.document.activeElement).toBe(editable);
    });

    it('does not re-render the editor around the text for an edit', () => {
        let commits = 0;
        // No toolbar, which follows the editor state by design.
        const { container, ready } = mount((onChange) => (
            <Profiler id="editor" onRender={() => commits++}>
                <RichTextEditor plugins={[]} onChange={onChange} />
            </Profiler>
        ));
        ready();
        paste(container, '<p>first</p>');
        const settled = commits;

        paste(container, '<p>second</p>');
        paste(container, '<p>third</p>');

        expect(container.textContent).toContain('third');
        expect(commits).toBe(settled);
    });
});

describe('the toolbar', () => {
    /** A control with state of its own, the way a flyout keeps whether it is open. */
    const ClickCounter = (): ReactNode => {
        const [clicks, setClicks] = useState(0);
        return (
            <button type="button" data-testid="clicks" onClick={() => setClicks((count) => count + 1)}>
                {clicks}
            </button>
        );
    };
    const statefulPlugin: RtePlugin = { id: 'stateful', toolbarItem: ClickCounter };

    /** A control using hooks of other kinds, so a shifted hook order would show. */
    const OtherHooks = (): ReactNode => {
        const [label] = useState(() => 'other');
        return <span>{label}</span>;
    };
    const otherPlugin: RtePlugin = { id: 'other', toolbarItem: OtherHooks };

    const clickCount = (container: HTMLElement): string | null | undefined =>
        container.querySelector('[data-testid="clicks"]')?.textContent;

    it("keeps a control's own state across edits and plugins added before it", () => {
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor plugins={[...defaultPlugins, statefulPlugin]} toolbarPlacement="top" />
        ));
        ready();

        const button = container.querySelector<HTMLButtonElement>('[data-testid="clicks"]');
        act(() => {
            button?.click();
            button?.click();
        });
        expect(clickCount(container)).toBe('2');

        paste(container, '<p>Some <strong>bold</strong> text</p>');
        expect(clickCount(container)).toBe('2');

        rerender(<RichTextEditor plugins={[otherPlugin, ...defaultPlugins, statefulPlugin]} toolbarPlacement="top" />);
        ready();
        expect(container.textContent).toContain('other');
        expect(clickCount(container)).toBe('2');
    });

    it('warns in development when two plugins share an id', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        // The duplicate toolbar key gets React's own complaint too.
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        try {
            const { ready } = mount(() => (
                <RichTextEditor plugins={[statefulPlugin, { ...statefulPlugin }]} toolbarPlacement="top" />
            ));
            ready();

            expect(warn).toHaveBeenCalledWith(expect.stringContaining('Two plugins share the id "stateful"'));
        } finally {
            warn.mockRestore();
            error.mockRestore();
        }
    });

    it('does not warn when every id is distinct', () => {
        const warn = vi.spyOn(console, 'warn');
        try {
            const { ready } = mount(() => <RichTextEditor plugins={defaultPlugins} />);
            ready();

            expect(warn).not.toHaveBeenCalled();
        } finally {
            warn.mockRestore();
        }
    });
});

describe('the toolbar from the keyboard', () => {
    const plugins = [boldPlugin(), alignPlugin(), linkPlugin()];

    const toolbarIn = (container: HTMLElement): HTMLElement => {
        const toolbar = container.querySelector<HTMLElement>('[role="toolbar"]');
        if (!toolbar) {
            throw new Error('no toolbar');
        }
        return toolbar;
    };

    const tabStops = (toolbar: HTMLElement): (string | null)[] =>
        [...toolbar.querySelectorAll('[tabindex="0"]')].map((stop) => stop.getAttribute('aria-label'));

    it('is one tab stop, named, and says which text it acts on', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
        ready();

        const toolbar = toolbarIn(container);
        expect(toolbar.getAttribute('aria-label')).toBe('Formatting');
        expect(toolbar.getAttribute('aria-controls')).toBe(editableIn(container).id);
        expect(tabStops(toolbar)).toEqual(['Bold']);
    });

    it('moves between its controls with the arrow keys, Home and End, passing over disabled ones', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
        ready();
        const toolbar = toolbarIn(container);
        const active = (): string | null | undefined => window.document.activeElement?.getAttribute('aria-label');
        act(() => toolbar.querySelector<HTMLElement>('[tabindex="0"]')?.focus());

        press(window.document.activeElement as Element, 'ArrowRight');
        expect(active()).toBe('Align left');
        press(window.document.activeElement as Element, 'ArrowLeft');
        expect(active()).toBe('Bold');
        press(window.document.activeElement as Element, 'ArrowLeft');
        // Wraps round — and "Add link" is disabled on a caret, so Justify is last.
        expect(active()).toBe('Justify');
        press(window.document.activeElement as Element, 'Home');
        expect(active()).toBe('Bold');
        press(window.document.activeElement as Element, 'End');
        expect(active()).toBe('Justify');
        // The stop moved with focus, so Tab comes back to where it was left.
        expect(tabStops(toolbar)).toEqual(['Justify']);
    });

    it('is reached from the text with Alt+F10, and left with Escape', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
        ready();
        const editable = editableIn(container);
        act(() => editable.focus());

        press(editable, 'F10', { altKey: true });
        expect(window.document.activeElement?.getAttribute('aria-label')).toBe('Bold');

        press(window.document.activeElement as Element, 'Escape');
        expect(editable.contains(window.document.activeElement)).toBe(true);
    });

    const focusedLabel = (): string | null | undefined => window.document.activeElement?.getAttribute('aria-label');

    const selectAll = (editable: HTMLElement): void => {
        const mod = /Mac|iP(hone|[oa]d)/.test(window.navigator.platform) ? { metaKey: true } : { ctrlKey: true };
        press(editable, 'a', mod);
    };

    describe.each(['top', 'floating'] as const)('with the %s toolbar, asked for again', (placement) => {
        const start = (): { editable: HTMLElement; rerender: () => void } => {
            const element = (label: string): ReactNode => (
                <RichTextEditor
                    value={paragraph('text')}
                    plugins={plugins}
                    toolbarPlacement={placement}
                    aria-label={label}
                />
            );
            const { container, ready, rerender } = mount(() => element('One'));
            ready();
            const editable = editableIn(container);
            act(() => editable.focus());
            // The floating bar only exists over selected text.
            selectAll(editable);
            return { editable, rerender: () => rerender(element('Two')) };
        };

        it('takes focus on every Alt+F10', () => {
            const { editable } = start();

            press(editable, 'F10', { altKey: true });
            expect(focusedLabel()).toBe('Bold');
            press(window.document.activeElement as Element, 'Escape');
            expect(window.document.activeElement).toBe(editable);

            press(editable, 'F10', { altKey: true });
            expect(focusedLabel()).toBe('Bold');
        });

        it('leaves no request pending to pull focus later', () => {
            const { editable, rerender } = start();
            press(editable, 'F10', { altKey: true });
            press(window.document.activeElement as Element, 'Escape');
            press(editable, 'F10', { altKey: true });
            press(window.document.activeElement as Element, 'Escape');
            expect(window.document.activeElement).toBe(editable);

            rerender();

            expect(window.document.activeElement).toBe(editable);
        });
    });

    it('floats over selected text only', () => {
        const { container, ready } = mount(() => (
            <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="floating" />
        ));
        ready();
        const editable = editableIn(container);
        act(() => editable.focus());
        expect(window.document.querySelector('[role="toolbar"]')).toBeNull();

        press(editable, 'F10', { altKey: true });
        expect(window.document.querySelector('[role="toolbar"]')).toBeNull();

        selectAll(editable);
        expect(window.document.querySelector('[role="toolbar"]')).not.toBeNull();
    });

    it('draws alignment as one choice of four, left until another is chosen', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
        ready();

        const radios = [...container.querySelectorAll('[role="radiogroup"] [role="radio"]')];
        expect(radios.map((radio) => radio.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false', 'false']);
    });

    it('names the shortcut a button has', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
        ready();

        const bold = container.querySelector('[aria-label="Bold"]');
        expect(bold?.getAttribute('aria-keyshortcuts')).toMatch(/^(Meta|Control)\+B$/);
        expect(bold?.getAttribute('title')).toMatch(/^Bold \((⌘B|Ctrl\+B)\)$/);
    });
});

describe('focus within', () => {
    /** A trigger inside, and a field it portals out of the subtree — a flyout. */
    const Probe = (): ReactNode => {
        const { focusWithin, focusProps } = useFocusWithin();
        return (
            <div {...focusProps} data-testid="probe" data-focus-within={String(focusWithin)}>
                <button type="button" data-testid="inside">
                    inside
                </button>
                {createPortal(<input data-testid="portalled" />, window.document.body)}
            </div>
        );
    };

    const focus = (element: Element | null): void => {
        act(() => {
            (element as HTMLElement | null)?.focus();
        });
    };

    it('follows focus into a portal and out of the tree', () => {
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const outside = window.document.createElement('input');
        window.document.body.append(outside);
        teardown.push(() => outside.remove());

        const { container } = mount(() => <Probe />);
        const state = (): string | null | undefined =>
            container.querySelector('[data-testid="probe"]')?.getAttribute('data-focus-within');
        const inside = container.querySelector('[data-testid="inside"]');
        const portalled = window.document.querySelector('[data-testid="portalled"]');

        expect(state()).toBe('false');

        focus(inside);
        expect(state()).toBe('true');

        // Out of the subtree in the DOM, but still inside in the component tree.
        focus(portalled);
        expect(state()).toBe('true');

        focus(outside);
        act(() => {
            vi.runAllTimers();
        });
        expect(state()).toBe('false');

        focus(inside);
        expect(state()).toBe('true');
        act(() => {
            (inside as HTMLElement | null)?.blur();
            vi.runAllTimers();
        });
        expect(state()).toBe('false');
    });
});

describe('content no mounted plugin knows', () => {
    it('is shown, not editable, and handed back unchanged after an edit elsewhere', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const callout = { type: 'callout', children: [{ type: 'paragraph', children: [{ text: 'kept' }] }] };
        const value = {
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'text' }] }, callout],
        } as unknown as RteDocument;

        const { container, ready, stored } = mount((onChange) => (
            <RichTextEditor value={value} onChange={onChange} plugins={[boldPlugin()]} />
        ));
        ready();
        const placeholder = container.querySelector('[data-rte-unknown]');
        expect(placeholder?.textContent).toBe('kept');
        expect(placeholder?.getAttribute('contenteditable')).toBe('false');

        paste(container, '<p>typed</p>');

        expect(stored()?.blocks.find((block) => (block.type as string) === 'callout')).toBe(callout);
    });
});

describe('an editor that crashes', () => {
    /** React logs every caught render error; the tests expect it and keep the output clean. */
    const silenceReact = (): void => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        teardown.push(() => error.mockRestore());
    };
    const throwingPlugin = (): RtePlugin => ({
        id: 'throws',
        toolbarItem: () => {
            throw new Error('toolbar broke');
        },
    });
    /** A toolbar item that throws once `state.crash` is set and the selection moves, as an edit makes it. */
    const lateCrashPlugin = (state: { crash: boolean }): RtePlugin => ({
        id: 'late',
        toolbarItem: ({ selection }) => {
            if (state.crash && selection) {
                throw new Error('after the edit');
            }
            return <span>fine</span>;
        },
    });
    /** A toolbar item under its own id, which throws when `crash` is set; new ids remount the engine. */
    const idPlugin = (id: string, crash = false): RtePlugin => ({
        id,
        toolbarItem: () => {
            if (crash) {
                throw new Error(`plugin ${id} broke`);
            }
            return <span>fine</span>;
        },
    });
    /** A toolbar item that throws while `state.broken` is set. */
    const flakyPlugin = (state: { broken: boolean }): RtePlugin => ({
        id: 'flaky',
        toolbarItem: () => {
            if (state.broken) {
                throw new Error('until fixed');
            }
            return <span>fine</span>;
        },
    });
    /** A block whose readonly view throws while `state.broken` is set. */
    const calloutPlugin = (state: { broken: boolean }): RtePlugin => {
        const Callout = ({ children }: { children?: ReactNode }): ReactNode => {
            if (state.broken) {
                throw new Error('readonly view broke');
            }
            return <p>{children}</p>;
        };
        return {
            id: 'callout',
            blocks: {
                callout: {
                    content: 'text',
                    toHtml: () => ({ tag: 'p', attrs: { 'data-callout': '' }, children: true }),
                    parse: [{ tag: 'p[data-callout]' }],
                    render: { component: Callout },
                },
            } as unknown as NonNullable<RtePlugin['blocks']>,
        };
    };
    const callout = (text: string): RteDocument =>
        ({ version: 1, blocks: [{ type: 'callout', children: [{ text }] }] }) as unknown as RteDocument;

    const retryButton = (container: HTMLElement): HTMLButtonElement => {
        const button = [...container.querySelectorAll('button')].find(
            (candidate) => candidate.textContent === 'Try again',
        );
        if (!button) {
            throw new Error('no Retry button');
        }
        return button;
    };
    /** Presses Retry as a keyboard, or a browser that focuses buttons on click, does. */
    const retry = (container: HTMLElement): void => {
        act(() => {
            const button = retryButton(container);
            button.focus();
            button.click();
        });
    };
    const errorSpy = () => vi.fn<(error: Error) => void>();

    it('shows the document read-only with a message and Retry, and reports nothing', () => {
        silenceReact();
        const { container, onChange } = mount((change) => (
            <RichTextEditor value={paragraph('still here')} onChange={change} plugins={[throwingPlugin()]} />
        ));

        expect(container.textContent).toContain('still here');
        expect(container.textContent).toContain('The editor stopped working. Try again to load it.');
        expect(container.querySelector('[contenteditable]')).toBeNull();
        expect(retryButton(container)).toBeDefined();
        expect(onChange).not.toHaveBeenCalled();
        // Unnamed by the host, it reads as text, as the readonly view does.
        expect(container.querySelector('[role="group"]')).toBeNull();
    });

    it('shows the fallback again when Retry meets the same failure, and reports it again', () => {
        silenceReact();
        const onError = errorSpy();
        const { container } = mount(() => (
            <RichTextEditor value={paragraph('still here')} plugins={[throwingPlugin()]} onError={onError} />
        ));

        retry(container);

        expect(container.textContent).toContain('still here');
        // The button that had focus was replaced: its successor takes the keyboard back.
        expect(window.document.activeElement).toBe(retryButton(container));
        expect(onError).toHaveBeenCalledTimes(2);
    });

    it('leaves focus alone after a Retry pressed without taking focus, as a mouse press may', () => {
        silenceReact();
        const state = { broken: true };
        const { container } = mount(() => (
            <RichTextEditor value={callout('read me')} plugins={[calloutPlugin(state)]} readonly />
        ));
        state.broken = false;

        act(() => {
            retryButton(container).click();
        });

        expect(container.textContent).toContain('read me');
        expect(window.document.activeElement).toBe(window.document.body);
        // Nothing to hand on, so the readonly view stays out of focus.
        expect(container.querySelector('[tabindex="-1"]')).toBeNull();
    });

    it('is editable again when Retry finds the cause gone', () => {
        silenceReact();
        const state = { broken: true };
        const flaky = flakyPlugin(state);
        const { container, ready } = mount(() => <RichTextEditor value={paragraph('back again')} plugins={[flaky]} />);
        expect(container.querySelector('[contenteditable]')).toBeNull();

        state.broken = false;
        retry(container);
        ready();

        expect(editableIn(container).textContent).toBe('back again');
        expect(container.textContent).not.toContain('Try again');
    });

    it('takes a value the host passes after Retry', () => {
        silenceReact();
        const state = { broken: true };
        const flaky = flakyPlugin(state);
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('before')} plugins={[flaky]} />
        ));
        state.broken = false;
        retry(container);
        ready();

        rerender(<RichTextEditor value={paragraph('after')} plugins={[flaky]} />);

        expect(editableIn(container).textContent).toBe('after');
    });

    it('keeps what was typed into an uncontrolled editor', () => {
        silenceReact();
        const state = { crash: false };
        const late = lateCrashPlugin(state);
        const { container, ready } = mount(() => <RichTextEditor plugins={[late, ...defaultPlugins]} />);
        ready();
        state.crash = true;

        paste(container, '<p>typed</p>');

        expect(container.querySelector('[contenteditable]')).toBeNull();
        expect(container.textContent).toContain('typed');
    });

    it('hands onError the error, shows the edits made before the crash, and saves nothing through onBlur', () => {
        silenceReact();
        const state = { crash: false };
        const late = lateCrashPlugin(state);
        const onBlur = vi.fn<(doc: RteDocument) => void>();
        const onError = errorSpy();
        const { container, ready } = mount(() => (
            <RichTextEditor plugins={[late, ...defaultPlugins]} onBlur={onBlur} onError={onError} />
        ));
        ready();
        state.crash = true;
        paste(container, '<p>typed</p>');

        expect(onError).toHaveBeenCalledOnce();
        expect(onError.mock.calls[0]?.[0].message).toBe('after the edit');
        expect(container.textContent).toContain('typed');
        expect(onBlur).not.toHaveBeenCalled();
    });

    it('shows the edits a controlled host holds', () => {
        silenceReact();
        const state = { crash: false };
        const late = lateCrashPlugin(state);
        const onError = errorSpy();
        const Host = (): ReactNode => {
            const [value, setValue] = useState<RteDocument>(() => paragraph('saved'));
            return (
                <RichTextEditor
                    value={value}
                    onChange={setValue}
                    onError={onError}
                    plugins={[late, ...defaultPlugins]}
                />
            );
        };
        const { container, ready } = mount(() => <Host />);
        ready();
        state.crash = true;
        paste(container, '<p>typed</p>');

        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toContain('typed');
    });

    it('mounts on Retry what the fallback showed, though the host value is older', () => {
        silenceReact();
        const state = { crash: false };
        const late = lateCrashPlugin(state);
        const { container, ready } = mount((change) => (
            <RichTextEditor value={paragraph('saved')} onChange={change} plugins={[late, ...defaultPlugins]} />
        ));
        ready();
        state.crash = true;
        paste(container, '<p>typed</p>');
        expect(container.textContent).toContain('typed');

        state.crash = false;
        retry(container);

        expect(container.querySelector('[contenteditable]')?.textContent).toContain('typed');
    });

    it('leaves focus where the user put it when the editor crashes again after a Retry', () => {
        silenceReact();
        const state = { broken: true };
        const flaky = flakyPlugin(state);
        const { container, rerender } = mount(() => (
            <>
                <input aria-label="elsewhere" />
                <RichTextEditor value={paragraph('one')} plugins={[flaky]} />
            </>
        ));
        state.broken = false;
        retry(container);
        const elsewhere = container.querySelector('input') as HTMLInputElement;
        act(() => elsewhere.focus());

        state.broken = true;
        rerender(
            <>
                <input aria-label="elsewhere" />
                <RichTextEditor value={paragraph('two')} plugins={[flaky]} />
            </>,
        );

        expect(retryButton(container)).toBeDefined();
        expect(window.document.activeElement).toBe(elsewhere);
    });

    it('hands the keyboard to Retry when the editor crashes while it has focus', () => {
        silenceReact();
        const state = { broken: false };
        const flaky = flakyPlugin(state);
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('one')} plugins={[flaky]} />
        ));
        ready();
        act(() => editableIn(container).focus());

        state.broken = true;
        rerender(<RichTextEditor value={paragraph('two')} plugins={[flaky]} />);

        expect(window.document.activeElement).toBe(retryButton(container));
    });

    it('does not take focus when it crashes after a Retry with focus already gone', () => {
        silenceReact();
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const state = { broken: true };
        const flaky = flakyPlugin(state);
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('one')} plugins={[flaky]} />
        ));
        state.broken = false;
        retry(container);
        ready();
        expect(editableIn(container).contains(window.document.activeElement)).toBe(true);
        act(() => {
            (window.document.activeElement as HTMLElement).blur();
            vi.runAllTimers();
        });
        expect(window.document.activeElement).toBe(window.document.body);

        state.broken = true;
        rerender(<RichTextEditor value={paragraph('two')} plugins={[flaky]} />);

        expect(retryButton(container)).toBeDefined();
        expect(window.document.activeElement).toBe(window.document.body);
    });

    it('puts the keyboard back in the text after Retry', () => {
        silenceReact();
        const state = { broken: true };
        const flaky = flakyPlugin(state);
        const { container, ready } = mount(() => <RichTextEditor value={paragraph('text')} plugins={[flaky]} />);
        retryButton(container).focus();
        expect(window.document.activeElement).toBe(retryButton(container));

        state.broken = false;
        retry(container);
        ready();

        expect(editableIn(container).contains(window.document.activeElement)).toBe(true);
        // The text has the focus: nothing around it is made focusable for a Retry.
        expect(editableIn(container).parentElement?.closest('[tabindex]')).toBeNull();
    });

    it('does not take focus later when it was retried readonly', () => {
        silenceReact();
        const state = { broken: true };
        const plugin = calloutPlugin(state);
        const value = callout('read me');
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={value} plugins={[plugin]} readonly />
        ));

        state.broken = false;
        retry(container);
        expect(container.textContent).toContain('read me');
        rerender(<RichTextEditor value={value} plugins={[plugin]} />);
        ready();

        expect(editableIn(container).contains(window.document.activeElement)).toBe(false);
    });

    it('shows the last edit when the host pushes a value in the render that crashes, and a value it passes after', () => {
        silenceReact();
        const fine = idPlugin('late');
        const bad = idPlugin('late', true);
        const onError = errorSpy();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('A')} plugins={[fine, ...defaultPlugins]} onError={onError} />
        ));
        ready();
        paste(container, '<p>B</p>');

        // The editor never applied C: it crashed in the render that brought it.
        const pushed = paragraph('C');
        rerender(<RichTextEditor value={pushed} plugins={[bad, ...defaultPlugins]} onError={onError} />);
        expect(container.textContent).toContain('The editor stopped working.');
        expect(container.textContent).toContain('B');
        expect(container.textContent).not.toContain('C');

        rerender(<RichTextEditor value={paragraph('D')} plugins={[bad, ...defaultPlugins]} onError={onError} />);
        expect(container.textContent).toContain('D');
    });

    it('shows a value the host pushed after the last edit', () => {
        silenceReact();
        const fine = idPlugin('late');
        const bad = idPlugin('late', true);
        const onError = errorSpy();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('A')} plugins={[fine, ...defaultPlugins]} onError={onError} />
        ));
        ready();
        paste(container, '<p>B</p>');
        const pushed = paragraph('C');
        rerender(<RichTextEditor value={pushed} plugins={[fine, ...defaultPlugins]} onError={onError} />);

        rerender(<RichTextEditor value={pushed} plugins={[bad, ...defaultPlugins]} onError={onError} />);

        expect(container.textContent).toContain('The editor stopped working.');
        expect(container.textContent).toContain('C');
        expect(container.textContent).not.toContain('B');
    });

    it('shows an edit made after a pushed value', () => {
        silenceReact();
        const state = { crash: false };
        const late = lateCrashPlugin(state);
        const onError = errorSpy();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('A')} plugins={[late, ...defaultPlugins]} onError={onError} />
        ));
        ready();
        rerender(<RichTextEditor value={paragraph('C')} plugins={[late, ...defaultPlugins]} onError={onError} />);
        state.crash = true;
        paste(container, '<p>D</p>');

        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toContain('D');
    });

    it('shows every edit when the host echoes an older one late', () => {
        silenceReact();
        const fine = idPlugin('late');
        const bad = idPlugin('late', true);
        const onError = errorSpy();
        const { container, onChange, rerender, ready } = mount((change) => (
            <RichTextEditor
                value={paragraph('V0')}
                onChange={change}
                plugins={[fine, ...defaultPlugins]}
                onError={onError}
            />
        ));
        ready();
        paste(container, '<p>one</p>');
        paste(container, '<p>two</p>');
        paste(container, '<p>three</p>');
        const first = onChange.mock.calls[0]?.[0];

        // The host (a debounce, an async normaliser) hands back the first edit, long after the third.
        rerender(<RichTextEditor value={first} plugins={[bad, ...defaultPlugins]} onError={onError} />);

        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toContain('three');
    });

    it('keeps an earlier edit the host restores while readonly', () => {
        silenceReact();
        const state = { broken: false };
        const plugins = [...defaultPlugins, calloutPlugin(state)];
        const onError = errorSpy();
        const { container, onChange, rerender, ready } = mount((change) => (
            <RichTextEditor value={callout('start')} onChange={change} plugins={plugins} onError={onError} />
        ));
        ready();
        paste(container, '<p>one</p>');
        paste(container, '<p>two</p>');
        const first = onChange.mock.calls[0]?.[0];
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
        rerender(<RichTextEditor value={last} onChange={onChange} plugins={plugins} onError={onError} />);

        // An undo in the host, made while the editor is readonly: the readonly view shows it.
        rerender(<RichTextEditor value={first} onChange={onChange} plugins={plugins} onError={onError} readonly />);
        state.broken = true;
        // A new plugin list draws the readonly view again.
        rerender(
            <RichTextEditor value={first} onChange={onChange} plugins={[...plugins]} onError={onError} readonly />,
        );

        // The fallback's read-only view is the one that crashed, so it is not reported twice.
        expect(onError).toHaveBeenCalledOnce();

        // The fallback cannot show it, so Retry with the cause gone does.
        state.broken = false;
        retry(container);
        expect(container.textContent).toContain('one');
        expect(container.textContent).not.toContain('two');
    });

    it('shows a document the host pushes after the fallback could not show the last one', () => {
        silenceReact();
        const state = { broken: true };
        const plugins = [throwingPlugin(), calloutPlugin(state)];
        const { container, rerender } = mount(() => <RichTextEditor value={callout('unshowable')} plugins={plugins} />);
        expect(retryButton(container)).toBeDefined();
        expect(container.textContent).not.toContain('unshowable');

        rerender(<RichTextEditor value={paragraph('replacement')} plugins={plugins} />);

        expect(container.textContent).toContain('replacement');
    });

    it('hands onError an Error when a plugin throws something else', () => {
        silenceReact();
        const throwsString: RtePlugin = {
            id: 'throws',
            toolbarItem: () => {
                // oxlint-disable-next-line typescript/only-throw-error -- what a careless plugin throws
                throw 'not an error';
            },
        };
        const onError = errorSpy();
        mount(() => <RichTextEditor value={paragraph('still here')} plugins={[throwsString]} onError={onError} />);

        const error = onError.mock.calls[0]?.[0];
        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toBe('not an error');
    });

    it('keeps the name the host gave the editor, and ties Retry to the message', () => {
        silenceReact();
        const { container } = mount(() => (
            <RichTextEditor
                value={paragraph('still here')}
                plugins={[throwingPlugin()]}
                aria-label="Comment"
                aria-describedby="comment-help"
            />
        ));

        const group = container.querySelector('[role="group"]');
        expect(group?.getAttribute('aria-label')).toBe('Comment');
        expect(group?.getAttribute('aria-describedby')).toBe('comment-help');
        expect(group?.contains(retryButton(container))).toBe(true);
        const messageId = retryButton(container).getAttribute('aria-describedby') ?? '';
        const message = window.document.getElementById(messageId);
        expect(message?.textContent).toBe('The editor stopped working. Try again to load it.');
        expect(message?.getAttribute('role')).toBe('alert');
    });

    it('says what the host translated its crash texts to', () => {
        silenceReact();
        const { container } = mount(() => (
            <RichTextEditor
                value={paragraph('still here')}
                plugins={[throwingPlugin()]}
                labels={{ editorFailed: 'Der Editor ist ausgefallen.', retry: 'Erneut versuchen' }}
            />
        ));

        const button = [...container.querySelectorAll('button')].find(
            (candidate) => candidate.textContent === 'Erneut versuchen',
        );
        const messageId = button?.getAttribute('aria-describedby') ?? '';
        expect(window.document.getElementById(messageId)?.textContent).toBe('Der Editor ist ausgefallen.');
    });

    it('names the fallback by a visible label, and only when the host named the editor', () => {
        silenceReact();
        const { container, rerender } = mount(() => (
            <RichTextEditor value={paragraph('still here')} plugins={[throwingPlugin()]} aria-labelledby="label" />
        ));
        expect(container.querySelector('[role="group"]')?.getAttribute('aria-labelledby')).toBe('label');

        rerender(
            <RichTextEditor value={paragraph('still here')} plugins={[throwingPlugin()]} aria-describedby="help" />,
        );

        expect(container.querySelector('[role="group"]')).toBeNull();
    });

    it('hands the focus of a pressed Retry to a readonly view', () => {
        silenceReact();
        const state = { broken: true };
        const { container } = mount(() => (
            <RichTextEditor value={callout('read me')} plugins={[calloutPlugin(state)]} readonly />
        ));
        state.broken = false;

        retry(container);

        expect(container.textContent).toContain('read me');
        expect(window.document.activeElement).not.toBe(window.document.body);
        expect(container.contains(window.document.activeElement)).toBe(true);
        // Focusable by script only, never a tab stop.
        expect(window.document.activeElement?.getAttribute('tabindex')).toBe('-1');
    });

    it('does not take focus when a readonly view retried earlier crashes with focus gone', () => {
        silenceReact();
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const state = { broken: true };
        const plugins = [calloutPlugin(state)];
        const { container, rerender } = mount(() => (
            <RichTextEditor value={callout('one')} plugins={plugins} readonly />
        ));
        state.broken = false;
        retry(container);
        act(() => {
            (window.document.activeElement as HTMLElement).blur();
            vi.runAllTimers();
        });
        expect(window.document.activeElement).toBe(window.document.body);

        state.broken = true;
        rerender(<RichTextEditor value={callout('two')} plugins={plugins} readonly />);

        expect(retryButton(container)).toBeDefined();
        expect(window.document.activeElement).toBe(window.document.body);
    });

    it('does not fire onBlur when it crashes while it has focus', () => {
        silenceReact();
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const state = { crash: false };
        const late = lateCrashPlugin(state);
        const onBlur = vi.fn<(doc: RteDocument) => void>();
        const { container, ready } = mount(() => (
            <RichTextEditor plugins={[late, ...defaultPlugins]} onBlur={onBlur} />
        ));
        ready();
        act(() => {
            editableIn(container).focus();
            vi.runAllTimers();
        });
        state.crash = true;
        paste(container, '<p>typed</p>');
        act(() => {
            vi.runAllTimers();
        });

        expect(container.textContent).toContain('The editor stopped working.');
        expect(onBlur).not.toHaveBeenCalled();
    });

    it('still shows the fallback when the host onError throws', () => {
        silenceReact();
        const reportError = vi.fn();
        vi.stubGlobal('reportError', reportError);
        teardown.push(() => vi.unstubAllGlobals());
        const failure = new Error('host onError broke');
        const { container } = mount(() => (
            <RichTextEditor
                value={paragraph('still here')}
                plugins={[throwingPlugin()]}
                onError={() => {
                    throw failure;
                }}
            />
        ));

        expect(container.textContent).toContain('The editor stopped working.');
        expect(reportError).toHaveBeenCalledWith(failure);
    });

    it('rethrows a throwing host onError on its own task where reportError is missing', () => {
        silenceReact();
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        vi.stubGlobal('reportError', undefined);
        teardown.push(() => vi.unstubAllGlobals());
        const failure = new Error('host onError broke');
        const { container } = mount(() => (
            <RichTextEditor
                value={paragraph('still here')}
                plugins={[throwingPlugin()]}
                onError={() => {
                    throw failure;
                }}
            />
        ));

        expect(container.textContent).toContain('The editor stopped working.');
        expect(() => vi.runAllTimers()).toThrow(failure);
    });

    it('reports a read-only view that cannot show the document after a crash', () => {
        silenceReact();
        const state = { broken: true };
        const onError = errorSpy();
        mount(() => (
            <RichTextEditor
                value={callout('unshowable')}
                plugins={[throwingPlugin(), calloutPlugin(state)]}
                onError={onError}
            />
        ));

        const messages = onError.mock.calls.map(([error]) => error.message);
        expect(messages).toHaveLength(2);
        expect(messages).toEqual(expect.arrayContaining(['toolbar broke', 'readonly view broke']));
    });

    it('reports a read-only view that cannot show the document once per crash, however often the host passes it', () => {
        silenceReact();
        const state = { broken: true };
        const plugins = [throwingPlugin(), calloutPlugin(state)];
        const onError = errorSpy();
        const { container, rerender } = mount(() => (
            <RichTextEditor value={callout('same')} plugins={plugins} onError={onError} />
        ));

        rerender(<RichTextEditor value={callout('same')} plugins={plugins} onError={onError} />);
        rerender(<RichTextEditor value={callout('same')} plugins={plugins} onError={onError} />);
        expect(onError.mock.calls.map(([error]) => error.message).sort()).toEqual([
            'readonly view broke',
            'toolbar broke',
        ]);

        retry(container);

        expect(onError).toHaveBeenCalledTimes(4);
    });

    it('reports a readonly view that crashes once, not again for the same view in the fallback', () => {
        silenceReact();
        const state = { broken: true };
        const plugins = [calloutPlugin(state)];
        const onError = errorSpy();
        const { container, rerender } = mount(() => (
            <RichTextEditor value={callout('same')} plugins={plugins} readonly onError={onError} />
        ));

        rerender(<RichTextEditor value={callout('same')} plugins={plugins} readonly onError={onError} />);
        rerender(<RichTextEditor value={callout('same')} plugins={plugins} readonly onError={onError} />);
        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toBe('The editor stopped working. Try again to load it.Try again');

        retry(container);

        expect(onError).toHaveBeenCalledTimes(2);
    });

    it('settles on the message and Retry when every document it gets cannot be shown', () => {
        silenceReact();
        const state = { broken: true };
        const plugins = [throwingPlugin(), calloutPlugin(state)];
        const { container, rerender } = mount(() => <RichTextEditor value={callout('first')} plugins={plugins} />);

        rerender(<RichTextEditor value={callout('second')} plugins={plugins} />);
        rerender(<RichTextEditor value={callout('third')} plugins={plugins} />);

        expect(container.textContent).toBe('The editor stopped working. Try again to load it.Try again');
    });

    it('shows a value the host passes again after leaving it out', () => {
        silenceReact();
        const saved = paragraph('saved');
        const onError = errorSpy();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={saved} plugins={[idPlugin('a'), ...defaultPlugins]} onError={onError} />
        ));
        ready();
        rerender(<RichTextEditor plugins={[idPlugin('a'), ...defaultPlugins]} onError={onError} />);
        paste(container, '<p>draft</p>');
        // New plugin ids remount the engine from the draft, so the saved value no longer matches what it holds.
        rerender(<RichTextEditor plugins={[idPlugin('b'), ...defaultPlugins]} onError={onError} />);
        rerender(<RichTextEditor value={saved} plugins={[idPlugin('b'), ...defaultPlugins]} onError={onError} />);

        rerender(<RichTextEditor value={saved} plugins={[idPlugin('b', true), ...defaultPlugins]} onError={onError} />);

        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toContain('saved');
        expect(container.textContent).not.toContain('draft');
    });

    it('shows edits made after a Retry, though the plugins change', () => {
        silenceReact();
        const state = { broken: true };
        const saved = paragraph('saved');
        const onError = errorSpy();
        // A host that commits on blur and never passes edits back as `value`.
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={saved} plugins={[flakyPlugin(state), ...defaultPlugins]} onError={onError} />
        ));
        state.broken = false;
        retry(container);
        ready();
        paste(container, '<p>typed</p>');

        // After a Retry the shell gets what the editor holds, not `value`, whatever the plugins.
        rerender(
            <RichTextEditor value={saved} plugins={[idPlugin('other', true), ...defaultPlugins]} onError={onError} />,
        );

        expect(container.textContent).toContain('The editor stopped working.');
        expect(container.textContent).toContain('typed');
    });

    it('shows an earlier edit the host restores after the plugins changed', () => {
        silenceReact();
        const onError = errorSpy();
        const { container, onChange, rerender, ready } = mount((change) => (
            <RichTextEditor
                value={paragraph('V0')}
                onChange={change}
                plugins={[idPlugin('a'), ...defaultPlugins]}
                onError={onError}
            />
        ));
        ready();
        paste(container, '<p>one</p>');
        paste(container, '<p>two</p>');
        const first = onChange.mock.calls[0]?.[0];
        // The remounted engine forgets it emitted `first`, and shows it when it comes back.
        rerender(
            <RichTextEditor value={paragraph('V0')} plugins={[idPlugin('b'), ...defaultPlugins]} onError={onError} />,
        );

        rerender(<RichTextEditor value={first} plugins={[idPlugin('b'), ...defaultPlugins]} onError={onError} />);

        rerender(<RichTextEditor value={first} plugins={[idPlugin('b', true), ...defaultPlugins]} onError={onError} />);

        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toContain('one');
        expect(container.textContent).not.toContain('two');
    });

    it('keeps the value a readonly view shows, though newer edits never reached the host', () => {
        silenceReact();
        const state = { broken: false };
        const plugins = [...defaultPlugins, calloutPlugin(state)];
        const saved = callout('saved');
        const onError = errorSpy();
        // A host that commits on blur and never passes edits back as `value`.
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={saved} plugins={plugins} onError={onError} />
        ));
        ready();
        paste(container, '<p>draft</p>');
        rerender(<RichTextEditor value={saved} plugins={plugins} onError={onError} readonly />);

        state.broken = true;
        // A new plugin list draws the readonly view again.
        rerender(<RichTextEditor value={saved} plugins={[...plugins]} onError={onError} readonly />);

        // The fallback's read-only view is the one that crashed, so it is not reported twice.
        expect(onError).toHaveBeenCalledOnce();

        // The fallback cannot show it, so Retry with the cause gone does.
        state.broken = false;
        retry(container);
        expect(container.textContent).toContain('saved');
        expect(container.textContent).not.toContain('draft');
    });

    it('shows an earlier edit the host restores along with other plugins', () => {
        silenceReact();
        const fine = idPlugin('late');
        const bad = idPlugin('other', true);
        const onError = errorSpy();
        const { container, onChange, rerender, ready } = mount((change) => (
            <RichTextEditor
                value={paragraph('V0')}
                onChange={change}
                plugins={[fine, ...defaultPlugins]}
                onError={onError}
            />
        ));
        ready();
        paste(container, '<p>one</p>');
        paste(container, '<p>two</p>');
        const first = onChange.mock.calls[0]?.[0];

        // New plugin ids remount the engine, which then shows `first` instead of ignoring it as an echo.
        rerender(<RichTextEditor value={first} plugins={[idPlugin('other'), ...defaultPlugins]} onError={onError} />);

        rerender(<RichTextEditor value={first} plugins={[bad, ...defaultPlugins]} onError={onError} />);

        expect(onError).toHaveBeenCalledOnce();
        expect(container.textContent).toContain('one');
        expect(container.textContent).not.toContain('two');
    });

    it('catches a node view that throws inside the view portals', () => {
        silenceReact();
        const Broken = (): ReactNode => {
            throw new Error('view broke');
        };
        const broken: RtePlugin = {
            id: 'broken',
            blocks: {
                broken: {
                    content: 'text',
                    toHtml: () => ({ tag: 'div', attrs: { 'data-broken': '' }, children: true }),
                    parse: [{ tag: 'div[data-broken]' }],
                    render: { edit: Broken },
                },
            } as unknown as NonNullable<RtePlugin['blocks']>,
        };
        const value = {
            version: 1,
            blocks: [{ type: 'broken', children: [{ text: 'in a view' }] }],
        } as unknown as RteDocument;

        const { container } = mount(() => <RichTextEditor value={value} plugins={[broken]} />);

        expect(container.textContent).toContain('The editor stopped working.');
        expect(retryButton(container)).toBeDefined();
    });
});

describe('onBlur', () => {
    it('fires once focus leaves the editor, not when it moves into the toolbar, with the document', () => {
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const outside = window.document.createElement('input');
        window.document.body.append(outside);
        teardown.push(() => outside.remove());
        const onBlur = vi.fn<(doc: RteDocument) => void>();

        const { container, ready } = mount(() => (
            <RichTextEditor value={paragraph('text')} onBlur={onBlur} plugins={[boldPlugin()]} />
        ));
        ready();
        const focus = (element: Element | null): void => {
            act(() => {
                (element as HTMLElement | null)?.focus();
                vi.runAllTimers();
            });
        };

        const bold = container.querySelector('[aria-label="Bold"]');
        expect(bold).not.toBeNull();
        focus(container.querySelector('[contenteditable]'));
        focus(bold);
        expect(onBlur).not.toHaveBeenCalled();

        focus(outside);
        expect(onBlur).toHaveBeenCalledExactlyOnceWith(paragraph('text'));
    });
});

describe('pasting', () => {
    describe('into a mounted editor', () => {
        it('turns a copied mention back into a mention, even where links are mounted', () => {
            // A mention is written as `<a href data-mention-id>`, which the link's
            // `a[href]` rule matches as well; one with no profile as a `<span>`.
            const plugins = [
                ...defaultPlugins,
                mentionPlugin({
                    items: [],
                    href: (mention) => (mention.kind === 'all' ? undefined : `/people/${mention.id}`),
                }),
            ];
            const copied = serializeToHtml(
                {
                    version: 1,
                    blocks: [
                        {
                            type: 'paragraph',
                            children: [
                                { text: 'Ask ' },
                                { type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' },
                                { type: 'mention', id: 'design', username: 'design', name: 'Design', kind: 'group' },
                                { type: 'mention', id: 'all', username: 'all', name: 'Everyone', kind: 'all' },
                            ],
                        },
                    ],
                },
                { plugins },
            );
            const { container, stored, ready } = mount((onChange) => (
                <RichTextEditor value={paragraph('')} onChange={onChange} plugins={plugins} />
            ));
            ready();

            paste(container, copied);

            const block = stored()?.blocks[0];
            const children = block && 'children' in block ? block.children : [];
            expect(children).toContainEqual({ type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' });
            expect(children).toContainEqual({
                type: 'mention',
                id: 'design',
                username: 'design',
                name: 'Design',
                kind: 'group',
            });
            expect(children).toContainEqual({
                type: 'mention',
                id: 'all',
                username: 'all',
                name: 'Everyone',
                kind: 'all',
            });
        });

        it('keeps the marks and blocks the pasted HTML carried', () => {
            const { container, stored, ready } = mount((onChange) => (
                <RichTextEditor value={paragraph('')} onChange={onChange} plugins={defaultPlugins} />
            ));
            ready();

            paste(
                container,
                '<h2>A heading</h2><p>Text with <strong>bold</strong> and ' +
                    '<a href="https://example.com">a link</a> in it.</p>',
            );

            const emitted = JSON.stringify(stored());
            expect(emitted).toContain('"style":"heading2"');
            expect(emitted).toContain('"bold":true');
            expect(emitted).toContain('"href":"https://example.com"');
            expect(emitted).toContain('A heading');
        });

        it('reads a colour only off a span that sets one', () => {
            const { container, stored, ready } = mount((onChange) => (
                <RichTextEditor value={paragraph('')} onChange={onChange} plugins={defaultPlugins} />
            ));
            ready();

            paste(container, '<p><span>plain</span> <span style="color: red">red</span></p>');

            const block = stored()?.blocks[0];
            const children = block && 'children' in block ? block.children : [];
            expect(children).toContainEqual({ text: 'plain ' });
            expect(children).toContainEqual({ text: 'red', fontColor: { color: 'red' } });
        });

        it('shows what was pasted', () => {
            const { container, ready } = mount((onChange) => (
                <RichTextEditor value={paragraph('')} onChange={onChange} plugins={defaultPlugins} />
            ));
            ready();

            paste(container, '<p>Pasted content.</p>');

            expect(container.textContent).toContain('Pasted content.');
        });
    });

    describe('from other applications', () => {
        const pasted = (html: string, plugins: readonly RtePlugin[] = defaultPlugins): RteDocument | null => {
            const { container, stored, ready } = mount((onChange) => (
                <RichTextEditor value={paragraph('')} onChange={onChange} plugins={plugins} />
            ));
            ready();
            paste(container, html);
            return stored();
        };

        it('never makes a link of a javascript: URL', () => {
            const doc = pasted(
                '<p><a href="javascript:alert(1)">click</a> and <a href="https://example.com">safe</a></p>',
            );

            const emitted = JSON.stringify(doc);
            expect(emitted).not.toContain('javascript:');
            expect(emitted).toContain('https://example.com');
            // The text stays, as text.
            expect(emitted).toContain('"text":"click and "');
        });

        it('reads Google Docs formatting by its styles, not its wrapper', () => {
            const doc = pasted(
                '<b style="font-weight:normal;" id="docs-internal-guid-abc"><p dir="ltr">' +
                    '<span style="color:#000000;font-weight:400;">plain </span>' +
                    '<span style="color:#000000;font-weight:700;">bold</span>' +
                    '<span style="color:#000000;font-style:italic;font-weight:400"> italic</span>' +
                    '<span style="text-decoration:underline;"> under</span>' +
                    '<span style="text-decoration:line-through;"> struck</span></p></b>',
            );

            expect(childrenOf(doc)).toEqual([
                { text: 'plain ' },
                { text: 'bold', bold: true },
                { text: ' italic', italic: true },
                { text: ' under', underline: true },
                { text: ' struck', strikethrough: true },
            ]);
        });

        it('keeps a colour as it was written, and leaves plain black alone', () => {
            const doc = pasted(
                '<p><span style="color: #f00">red</span><span style="color: rgb(0, 0, 0)">black</span></p>',
            );

            expect(childrenOf(doc)).toEqual([{ text: 'red', fontColor: { color: '#f00' } }, { text: 'black' }]);
        });

        it('reads only the alignments it offers', () => {
            const doc = pasted('<p style="text-align: start">start</p><p style="text-align: center">centre</p>');

            expect(doc?.blocks[0]).not.toHaveProperty('align');
            expect(doc?.blocks[1]).toHaveProperty('align', 'center');
        });
    });
});

describe('exported links', () => {
    it('drop a target that could run script', () => {
        const html = serializeToHtml(
            {
                version: 1,
                blocks: [
                    { type: 'paragraph', children: [{ text: 'bad', link: { href: 'javascript:alert(1)' } }] },
                    { type: 'paragraph', children: [{ text: 'good', link: { href: 'https://example.com' } }] },
                ],
            },
            { plugins: [linkPlugin()] },
        );

        expect(html).not.toContain('javascript:');
        expect(html).toContain('href="https://example.com"');
    });
});

describe('a to-do list', () => {
    it('exports checkboxes named by their state, the text in a block element', () => {
        const html = serializeToHtml(toDo, { plugins: checkListPlugins });

        expect(html).toContain('aria-label="Done"');
        expect(html).toContain('aria-label="Not done"');
        // A paragraph may sit in a div, not in a span.
        expect(html).not.toMatch(/<span[^>]*><p>/);
    });

    it('names each checkbox in the editor by its item’s text', () => {
        const container = render(<RichTextEditor value={toDo} plugins={checkListPlugins} />);

        expect(checkboxes(container)).toEqual(['checked: Done this', 'unchecked: Not yet']);
    });

    it('shows the readonly state on a checkbox that looks live but cannot be changed', () => {
        const container = render(<RichTextRenderer value={toDo} plugins={checkListPlugins} />);
        const box = container.querySelector<HTMLInputElement>('input[type="checkbox"]');

        expect(checkboxes(container)).toEqual(['checked: Done this', 'unchecked: Not yet']);
        expect(box?.disabled).toBe(false);
        expect(box?.getAttribute('aria-readonly')).toBe('true');
        act(() => box?.click());
        expect(box?.checked).toBe(true);
    });
});
