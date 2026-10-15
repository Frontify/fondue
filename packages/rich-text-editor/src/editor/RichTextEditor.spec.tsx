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

    it('re-renders a control only when what it is handed changed', () => {
        let renders = 0;
        const CountingItem = (): ReactNode => {
            renders++;
            return null;
        };
        const countingPlugin: RtePlugin = { id: 'counting', toolbarItem: CountingItem };

        const { container, ready } = mount((onChange) => (
            <RichTextEditor plugins={[...defaultPlugins, countingPlugin]} onChange={onChange} toolbarPlacement="top" />
        ));
        ready();
        const settled = renders;

        // Plain text where there was none: a new document and a new caret, but
        // the same block and no marks — nothing a control shows.
        paste(container, '<p>plain</p>');
        expect(container.textContent).toContain('plain');
        expect(renders).toBe(settled);

        // Ending up in bold text is a different selection, so it does reach
        // the control.
        paste(container, '<p><strong>bold</strong></p>');
        expect(renders).toBeGreaterThan(settled);
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

    describe.each(['top', 'floating'] as const)('with the %s toolbar, asked for again', (placement) => {
        const start = (): { editable: HTMLElement; rerender: () => void } => {
            const element = (label: string): ReactNode => (
                <RichTextEditor plugins={plugins} toolbarPlacement={placement} aria-label={label} />
            );
            const { container, ready, rerender } = mount(() => element('One'));
            ready();
            const editable = editableIn(container);
            act(() => editable.focus());
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

    it('floats in after the text on Alt+F10, even over a caret', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="floating" />);
        ready();
        const editable = editableIn(container);
        act(() => editable.focus());
        expect(container.querySelector('[role="toolbar"]')).toBeNull();

        press(editable, 'F10', { altKey: true });

        const toolbar = toolbarIn(container);
        expect(toolbar.contains(window.document.activeElement)).toBe(true);
        // After the text, so Tab order and reading order agree.
        expect(editable.compareDocumentPosition(toolbar) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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

describe('the status region', () => {
    it('reads out a formatting change made from the toolbar, once it has settled', () => {
        vi.useFakeTimers();
        try {
            const { container, ready } = mount(() => (
                <RichTextEditor plugins={[boldPlugin()]} toolbarPlacement="top" />
            ));
            ready();
            paste(container, '<p>text</p>');
            const status = container.querySelector('[role="status"]');

            act(() => container.querySelector<HTMLElement>('[aria-label="Bold"]')?.click());
            expect(status?.textContent).toBe('');
            act(() => {
                vi.runAllTimers();
            });

            expect(status?.textContent).toBe('Bold on');
        } finally {
            vi.useRealTimers();
        }
    });

    // A browser runs microtasks between an event's listeners and happy-dom does
    // not, so this guards the behaviour but cannot fail the way a browser did.
    it('reads out a shortcut that only changes what the caret will type', () => {
        vi.useFakeTimers();
        try {
            const { container, ready } = mount(() => (
                <RichTextEditor plugins={[boldPlugin()]} toolbarPlacement="top" />
            ));
            ready();
            paste(container, '<p>text</p>');
            const status = container.querySelector('[role="status"]');
            const editable = editableIn(container);
            act(() => editable.focus());
            // A bare caret at the end of the text, so the shortcut changes no text.
            act(() => {
                const text = editable.querySelector('p')?.firstChild;
                if (text) {
                    window.getSelection()?.collapse(text, 4);
                }
                window.document.dispatchEvent(new Event('selectionchange'));
            });
            // Let the paste's own announcement settle, so only the shortcut is left to read out.
            act(() => {
                vi.runAllTimers();
            });

            const mod = /Mac|iP(hone|[oa]d)/.test(window.navigator.platform) ? { metaKey: true } : { ctrlKey: true };
            press(editable, 'b', { keyCode: 66, ...mod });
            act(() => {
                vi.runAllTimers();
            });

            expect(status?.textContent).toBe('Bold on');
        } finally {
            vi.useRealTimers();
        }
    });

    it('stays quiet while the caret only moves', () => {
        vi.useFakeTimers();
        try {
            const { container, ready } = mount(() => (
                <RichTextEditor plugins={[boldPlugin()]} toolbarPlacement="top" />
            ));
            ready();
            act(() => {
                vi.runAllTimers();
            });
            const status = container.querySelector('[role="status"]');
            const before = status?.textContent;

            act(() => editableIn(container).focus());
            act(() => {
                vi.runAllTimers();
            });

            expect(status?.textContent).toBe(before);
        } finally {
            vi.useRealTimers();
        }
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

    it('follows focus into a portal and out of the tree, without waiting', () => {
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
        expect(state()).toBe('false');

        focus(inside);
        expect(state()).toBe('true');
        act(() => {
            (inside as HTMLElement | null)?.blur();
        });
        expect(state()).toBe('false');
    });
});

describe('pasting', () => {
    describe('into a mounted editor', () => {
        it('turns a copied mention back into a mention, even where links are mounted', () => {
            // A mention is written as `<a href data-mention-id>`, which the link's
            // `a[href]` rule matches as well.
            const plugins = [
                ...defaultPlugins,
                mentionPlugin({ items: [], href: (mention) => `/people/${mention.id}` }),
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
