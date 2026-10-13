/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Driven through the package's public API, the way a host does: the props are
// the whole conversation between a host and a mounted editor.
import { defaultPlugins, RichTextEditor, type RteDocument, type RtePlugin } from '../index';

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

describe('pasting', () => {
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

        expect(container.querySelectorAll('p')).toHaveLength(1);
        expect(container.textContent).toBe('already here');
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
