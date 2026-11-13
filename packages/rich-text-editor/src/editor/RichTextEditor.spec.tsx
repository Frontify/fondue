/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { Dialog } from '@frontify/fondue-components';
import { act, Profiler, type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type RteToolbarGroup } from '#/core';

// Driven through the package's public API, the way a host does: the props are
// the whole conversation between a host and a mounted editor.
import {
    alignPlugin,
    boldPlugin,
    checkListPlugin,
    defaultPlugins,
    defineBlock,
    defineContent,
    defineInline,
    definePlugin,
    linkPlugin,
    mentionPlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RtePlugin,
    serializeToHtml,
    textStylePlugin,
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

const checkListPlugins = [checkListPlugin];

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

describe('a document from a newer format version', () => {
    // A version of its own per test: the warning is given once per version for the whole page.
    // Far above any real version, so raising the format's version leaves these documents newer.
    let version = 1000;
    let newer: RteDocument;
    beforeEach(() => {
        version += 1;
        newer = { ...paragraph('from the future'), version } as unknown as RteDocument;
    });

    it('is shown read-only and warns once', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container, onChange } = mount((handler) => (
            <RichTextEditor value={newer} onChange={handler} plugins={defaultPlugins} />
        ));

        expect(container.textContent).toContain('from the future');
        expect(container.querySelector('[contenteditable]')).toBeNull();
        expect(container.querySelector('[role="toolbar"]')).toBeNull();
        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(expect.stringContaining(`version ${version}`));
        expect(container.querySelector('[role="status"]')?.textContent).toBe(
            'This content was saved with a newer version of the editor. Try reloading the page to edit it.',
        );
        expect(onChange).not.toHaveBeenCalled();
    });

    it('shows the notice when only the content is drawn', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container } = mount(() => <RichTextEditor value={newer} plugins={defaultPlugins} showEditor={false} />);

        expect(container.querySelector('[contenteditable]')).toBeNull();
        expect(container.querySelector('[role="status"]')).not.toBeNull();
    });

    it('says so in the words the host gives', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container } = mount(() => (
            <RichTextEditor value={newer} plugins={defaultPlugins} labels={{ newerVersion: 'Nur lesbar' }} />
        ));

        expect(container.querySelector('[role="status"]')?.textContent).toBe('Nur lesbar');
    });

    it('shows no notice when the host already shows it read-only', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container } = mount(() => <RichTextEditor value={newer} plugins={defaultPlugins} readonly />);

        expect(container.textContent).toContain('from the future');
        expect(container.querySelector('[role="status"]')).toBeNull();
    });

    it('warns once for several editors showing the same version', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        mount(() => (
            <>
                <RichTextEditor value={newer} plugins={defaultPlugins} />
                <RichTextEditor value={newer} plugins={defaultPlugins} />
            </>
        ));

        expect(warn).toHaveBeenCalledTimes(1);
    });

    it('does not repeat the warning on re-render', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { rerender } = mount(() => <RichTextEditor value={newer} plugins={defaultPlugins} />);

        rerender(<RichTextEditor value={newer} plugins={defaultPlugins} placeholder="again" />);

        expect(warn).toHaveBeenCalledTimes(1);
    });

    it('stops reporting once the host switches to a newer document mid-edit', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const onChange = vi.fn<(doc: RteDocument) => void>();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('current')} onChange={onChange} plugins={defaultPlugins} />
        ));
        ready();
        paste(container, '<p>typed</p>');
        expect(onChange).toHaveBeenCalledTimes(1);

        rerender(<RichTextEditor value={newer} onChange={onChange} plugins={defaultPlugins} />);

        expect(container.querySelector('[contenteditable]')).toBeNull();
        expect(container.textContent).toContain('from the future');
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not hand the older document to onBlur when focus leaves as a newer one arrives', () => {
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const outside = window.document.createElement('input');
        window.document.body.append(outside);
        teardown.push(() => outside.remove());
        const onBlur = vi.fn<(doc: RteDocument) => void>();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('current')} onBlur={onBlur} plugins={defaultPlugins} />
        ));
        ready();
        act(() => editableIn(container).focus());

        // Focus leaving and the newer document land in one render.
        act(() => {
            outside.focus();
            rerender(<RichTextEditor value={newer} onBlur={onBlur} plugins={defaultPlugins} />);
            vi.runAllTimers();
        });

        expect(container.querySelector('[contenteditable]')).toBeNull();
        expect(onBlur).not.toHaveBeenCalled();
    });

    it('moves focus to the notice when the text being edited goes away', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('current')} plugins={defaultPlugins} />
        ));
        ready();
        act(() => editableIn(container).focus());

        rerender(<RichTextEditor value={newer} plugins={defaultPlugins} />);

        const focused = window.document.activeElement;
        expect(focused?.getAttribute('tabindex')).toBe('-1');
        expect(focused?.firstElementChild).toBe(container.querySelector('[role="status"]'));
    });

    it('leaves focus where the user just moved it when a newer document arrives', () => {
        vi.useFakeTimers();
        teardown.push(() => vi.useRealTimers());
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const outside = window.document.createElement('input');
        window.document.body.append(outside);
        teardown.push(() => outside.remove());
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('current')} plugins={defaultPlugins} />
        ));
        ready();
        act(() => editableIn(container).focus());

        // The host updates in the same task as the blur, before the editor hears that focus left.
        act(() => {
            outside.focus();
            rerender(<RichTextEditor value={newer} plugins={defaultPlugins} />);
        });

        expect(window.document.activeElement).toBe(outside);
    });

    it('leaves focus alone when a newer document arrives in an editor nobody is in', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('current')} plugins={defaultPlugins} />
        ));
        ready();

        rerender(<RichTextEditor value={newer} plugins={defaultPlugins} />);

        expect(container.contains(window.document.activeElement)).toBe(false);
    });

    it('becomes editable once given a document of the current version', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container, rerender, ready } = mount(() => <RichTextEditor value={newer} plugins={defaultPlugins} />);
        expect(container.querySelector('[contenteditable]')).toBeNull();

        rerender(<RichTextEditor value={paragraph('now current')} plugins={defaultPlugins} />);
        ready();

        expect(container.textContent).toContain('now current');
    });

    it.each([
        ['the current version', paragraph('current')],
        ['no version', { blocks: paragraph('missing').blocks } as unknown as RteDocument],
        ['a version that is not a number', { ...paragraph('text'), version: '3' } as unknown as RteDocument],
    ])('stays editable, without a warning, with %s', (_name, value) => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        teardown.push(() => warn.mockRestore());
        const { container, ready } = mount(() => <RichTextEditor value={value} plugins={defaultPlugins} />);
        ready();

        expect(warn).not.toHaveBeenCalled();
        expect(container.querySelector('[role="status"]')).toBeNull();
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
        const columns = (className: string) => [
            ...defaultPlugins,
            definePlugin({ id: 'columns', content: defineContent({ contentClassName: className }) }),
        ];
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

    // The drop cursor is drawn in the editable's offset parent: positioned, that is the editor's own element.
    it('mounts in a positioned element, so the drop cursor stays inside the host', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={defaultPlugins} />);
        ready();

        const mountPoint = editableIn(container).parentElement;
        if (!mountPoint) {
            throw new Error('the editable element has no parent');
        }
        expect(window.getComputedStyle(mountPoint).position).toBe('relative');
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
    const statefulPlugin: RtePlugin = definePlugin({
        id: 'stateful',
        toolbar: [{ label: 'Clicks', render: ClickCounter }],
    });

    /** A control using hooks of other kinds, so a shifted hook order would show. */
    const OtherHooks = (): ReactNode => {
        const [label] = useState(() => 'other');
        return <span>{label}</span>;
    };
    const otherPlugin: RtePlugin = definePlugin({ id: 'other', toolbar: [{ label: 'Other', render: OtherHooks }] });

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

    it("keeps a control's own state when the host rebuilds a plugin that builds its control in the factory", () => {
        const buildPlugin = (): RtePlugin => {
            const Built = (): ReactNode => {
                const [clicks, setClicks] = useState(0);
                return (
                    <button type="button" data-testid="clicks" onClick={() => setClicks((count) => count + 1)}>
                        {clicks}
                    </button>
                );
            };
            return definePlugin({ id: 'built', toolbar: [{ label: 'Built', render: Built }] });
        };
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor plugins={[...defaultPlugins, buildPlugin()]} toolbarPlacement="top" />
        ));
        ready();

        const button = container.querySelector<HTMLButtonElement>('[data-testid="clicks"]');
        act(() => {
            button?.click();
            button?.click();
        });
        expect(clickCount(container)).toBe('2');

        rerender(<RichTextEditor plugins={[...defaultPlugins, buildPlugin()]} toolbarPlacement="top" />);
        ready();
        expect(clickCount(container)).toBe('2');
    });

    it('draws the control of a plugin with an unknown group last', () => {
        // The test passes a group outside RteToolbarGroup on purpose.
        const unknownGroupPlugin = definePlugin({
            id: 'unknown-group',
            toolbarGroup: 'not-a-group' as RteToolbarGroup,
            toolbar: [{ label: 'Unknown', render: () => <span data-testid="unknown-group">unknown</span> }],
        });
        const { container, ready } = mount(() => (
            <RichTextEditor plugins={[unknownGroupPlugin, ...defaultPlugins]} toolbarPlacement="top" />
        ));
        ready();

        const group = container.querySelector('[data-testid="unknown-group"]')?.parentElement;
        expect(group).toBeTruthy();
        expect(group?.parentElement?.lastElementChild).toBe(group);
    });

    it('keeps Undo and Redo current as edits are made and taken back', () => {
        const { container, ready, stored } = mount((onChange) => (
            <RichTextEditor plugins={defaultPlugins} toolbarPlacement="top" onChange={onChange} />
        ));
        ready();
        const undo = (): HTMLButtonElement | null => container.querySelector('[aria-label="Undo"]');
        const redo = (): HTMLButtonElement | null => container.querySelector('[aria-label="Redo"]');
        expect(undo()?.disabled).toBe(true);
        expect(redo()?.disabled).toBe(true);

        // Pasting is how this spec edits: the paste handler is the input the engine takes from the DOM here.
        paste(container, '<p>one</p>');
        expect(undo()?.disabled).toBe(false);
        expect(redo()?.disabled).toBe(true);

        // Edits close together share one undo step, so the count of presses is the history's to decide.
        for (let presses = 0; undo()?.disabled === false; presses++) {
            expect(presses).toBeLessThan(10);
            act(() => undo()?.click());
        }
        expect(childrenOf(stored())).toEqual([]);
        expect(redo()?.disabled).toBe(false);

        act(() => redo()?.click());
        expect(undo()?.disabled).toBe(false);
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
    /** A control that is off on a caret, last in the bar, so the arrow keys have one to pass over. */
    const NeedsText = ({ selection }: RtePlugin.ToolbarItemProps): ReactNode => (
        <button type="button" aria-label="Needs text" disabled={selection.isCollapsed}>
            N
        </button>
    );
    const needsTextPlugin: RtePlugin = definePlugin({
        id: 'needs-text',
        toolbar: [{ label: 'Needs text', render: NeedsText }],
    });
    const plugins = [boldPlugin, alignPlugin, linkPlugin(), needsTextPlugin];

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

        // Link sits in its group after the marks, and can add a link at a caret.
        press(window.document.activeElement as Element, 'ArrowRight');
        expect(active()).toBe('Add link');
        press(window.document.activeElement as Element, 'ArrowLeft');
        expect(active()).toBe('Bold');
        press(window.document.activeElement as Element, 'ArrowLeft');
        // Wraps round, passing over the disabled control at the end.
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

        // The first Escape belongs to the tooltip the focus opened.
        press(window.document.activeElement as Element, 'Escape');
        expect(window.document.querySelector('[role="tooltip"]')).toBeNull();
        expect(window.document.activeElement?.getAttribute('aria-label')).toBe('Bold');

        press(window.document.activeElement as Element, 'Escape');
        expect(editable.contains(window.document.activeElement)).toBe(true);
    });

    const focusedLabel = (): string | null | undefined => window.document.activeElement?.getAttribute('aria-label');

    const selectAll = (editable: HTMLElement): void => {
        const mod = /Mac|iP(hone|[oa]d)/.test(window.navigator.platform) ? { metaKey: true } : { ctrlKey: true };
        press(editable, 'a', mod);
    };

    // The focus opened a tooltip, which takes the first Escape.
    const leaveToolbar = (): void => {
        press(window.document.activeElement as Element, 'Escape');
        press(window.document.activeElement as Element, 'Escape');
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
            leaveToolbar();
            expect(window.document.activeElement).toBe(editable);

            press(editable, 'F10', { altKey: true });
            expect(focusedLabel()).toBe('Bold');
        });

        it('leaves no request pending to pull focus later', () => {
            const { editable, rerender } = start();
            press(editable, 'F10', { altKey: true });
            leaveToolbar();
            press(editable, 'F10', { altKey: true });
            leaveToolbar();
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

    describe('in a narrow top row', () => {
        // Every slot and More are 30 wide; the row is as wide as `rowWidth`.
        let rowWidth = 200;
        const observers: ResizeObserverCallback[] = [];

        beforeEach(() => {
            rowWidth = 200;
            vi.stubGlobal(
                'ResizeObserver',
                class {
                    constructor(callback: ResizeObserverCallback) {
                        observers.push(callback);
                    }
                    observe(): void {}
                    unobserve(): void {}
                    disconnect(): void {}
                },
            );
            vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
                let width = 0;
                if (this.getAttribute('role') === 'toolbar') {
                    width = rowWidth;
                }
                if (this.hasAttribute('data-toolbar-slot') || this.hasAttribute('data-toolbar-more')) {
                    width = 30;
                }
                return new DOMRect(0, 0, width, 24);
            });
        });

        afterEach(() => {
            vi.unstubAllGlobals();
            vi.restoreAllMocks();
            observers.splice(0);
        });

        const resize = (width: number): void => {
            rowWidth = width;
            act(() => {
                for (const observer of observers) {
                    observer([], {} as ResizeObserver);
                }
            });
        };

        const more = (container: HTMLElement): HTMLButtonElement | null =>
            container.querySelector<HTMLButtonElement>('[aria-label="More"]');

        it('moves what does not fit behind More, whose panel the arrow keys move through', () => {
            const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
            ready();
            const toolbar = toolbarIn(container);
            expect(more(container)).toBeNull();

            // Bold, More and the gap: Link and Align no longer fit.
            resize(70);
            expect(toolbar.querySelector('[aria-label="Bold"]')).not.toBeNull();
            // Parked out of sight beside More, not drawn in the row.
            expect(toolbar.querySelector('[aria-label="Align left"]')?.closest('[aria-hidden="true"]')).not.toBeNull();
            expect(more(container)?.getAttribute('aria-haspopup')).toBe('dialog');

            // A click with no pointer behind it is the keyboard's: focus moves into the panel.
            act(() => more(container)?.click());
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            const panel = window.document.querySelector<HTMLElement>('[role="toolbar"][aria-label="More"]');
            expect(panel?.querySelector('[aria-label="Add link"]')).not.toBeNull();
            // Link comes first in the panel, and can add a link at a caret.
            expect(focusedLabel()).toBe('Add link');

            press(window.document.activeElement as Element, 'ArrowRight');
            expect(focusedLabel()).toBe('Align left');
            press(window.document.activeElement as Element, 'End');
            expect(focusedLabel()).toBe('Justify');
            press(window.document.activeElement as Element, 'Home');
            expect(focusedLabel()).toBe('Add link');

            // The first Escape belongs to the tooltip the focus opened.
            press(window.document.activeElement as Element, 'Escape');
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            press(window.document.activeElement as Element, 'Escape');
            expect(window.document.activeElement).toBe(more(container));
            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');

            resize(200);
            expect(more(container)).toBeNull();
            expect(toolbar.querySelector('[aria-label="Align left"]')).not.toBeNull();
        });

        it("hangs a hidden control's flyout from More when a hotkey opens it, with the panel closed", async () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            resize(70);
            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
            const editable = editableIn(container);
            act(() => editable.focus());
            selectAll(editable);

            const mod = /Mac|iP(hone|[oa]d)/.test(window.navigator.platform) ? { metaKey: true } : { ctrlKey: true };
            press(editable, 'k', mod);
            await act(async () => {});

            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
            const dialogs = [...window.document.querySelectorAll('[role="dialog"]')];
            expect(dialogs.some((dialog) => dialog.textContent?.includes('Add link'))).toBe(true);
        });

        it('closes the link form on one Escape, the panel never opened, focus never on the page', async () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            resize(70);
            const editable = editableIn(container);
            const linkForm = (): Element | undefined =>
                [...window.document.querySelectorAll('[role="dialog"]')].find((dialog) =>
                    dialog.textContent?.includes('Add link'),
                );
            // Radix hands focus back a task after a flyout closes.
            const settle = (): Promise<void> => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));
            const mod = /Mac|iP(hone|[oa]d)/.test(window.navigator.platform) ? { metaKey: true } : { ctrlKey: true };

            // Twice over: the second round starts from what the first left behind, with the pointer resting on
            // the link button, whose tooltip must not come back as the form closes.
            for (let round = 0; round < 2; round++) {
                act(() => editable.focus());
                selectAll(editable);
                press(editable, 'k', mod);
                await act(async () => {});
                expect(linkForm()).not.toBeUndefined();
                expect(linkForm()?.contains(window.document.activeElement)).toBe(true);
                if (round === 1) {
                    act(() => {
                        window.document
                            .querySelector('[aria-label="Add link"]')
                            ?.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }));
                    });
                    // Past the tooltip's delay.
                    await act(() => new Promise<void>((resolve) => setTimeout(resolve, 800)));
                }

                press(window.document.activeElement as Element, 'Escape');
                await settle();
                expect(linkForm()).toBeUndefined();
                expect(window.document.activeElement).toBe(editable);
                expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
                expect(window.document.querySelector('[role="tooltip"]')).toBeNull();
            }
        });

        it('closes a panel opened with a click on Escape in the text, leaving the caret there', () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            resize(70);
            const editable = editableIn(container);
            act(() => editable.focus());

            act(() => {
                more(container)?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
            });
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            expect(window.document.activeElement).toBe(editable);

            press(editable, 'Escape');
            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
            expect(window.document.activeElement).toBe(editable);
        });

        it('closes only the host dialog on Escape, with More shown inside it', () => {
            const onOpenChange = vi.fn<(open: boolean) => void>();
            mount(() => (
                <Dialog.Root open onOpenChange={onOpenChange}>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Root>
            ));
            resize(70);
            const dialogMore = window.document.querySelector<HTMLElement>('[aria-label="More"]');
            expect(dialogMore?.getAttribute('aria-expanded')).toBe('false');
            const editable = window.document.querySelector<HTMLElement>('[contenteditable]');
            act(() => editable?.focus());

            press(editable as Element, 'Escape');

            expect(onOpenChange).toHaveBeenCalledWith(false);
        });

        it('leaves Escape to a suggestion list open in the text before the panel takes it', () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            resize(70);
            const editable = editableIn(container);
            act(() => editable.focus());
            act(() => {
                more(container)?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
            });
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');

            // What the focused element of an open mention or emoji draft says.
            editable.setAttribute('aria-expanded', 'true');
            press(editable, 'Escape');
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');

            editable.removeAttribute('aria-expanded');
            press(editable, 'Escape');
            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
        });

        // Radix hands focus back a task after a flyout closes.
        const settle = (): Promise<void> => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

        /** Where focus may not rest after a flyout closes: the page, or what the open panel hides. */
        const expectFocusSomewhereReal = (): void => {
            const { activeElement, body } = window.document;
            expect(activeElement).not.toBe(body);
            expect(activeElement?.closest('[aria-hidden="true"]')).toBeNull();
        };

        const panelOf = (): HTMLElement | null =>
            window.document.querySelector<HTMLElement>('[role="toolbar"][aria-label="More"]');

        const linkForm = (): Element | undefined =>
            [...window.document.querySelectorAll('[role="dialog"]')].find((dialog) =>
                dialog.textContent?.includes('Add link'),
            );

        /** Overflows the toolbar, opens More from the keyboard and the link form from the panel. */
        const openLinkFormFromPanel = async (container: HTMLElement): Promise<HTMLElement> => {
            resize(70);
            const editable = editableIn(container);
            act(() => editable.focus());
            selectAll(editable);

            press(editable, 'F10', { altKey: true });
            expect(focusedLabel()).toBe('Bold');
            press(window.document.activeElement as Element, 'End');
            expect(window.document.activeElement).toBe(more(container));
            press(window.document.activeElement as Element, 'Enter');
            act(() => more(container)?.click());
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            expect(panelOf()?.contains(window.document.activeElement)).toBe(true);

            while (focusedLabel() !== 'Add link') {
                press(window.document.activeElement as Element, 'ArrowRight');
            }
            press(window.document.activeElement as Element, 'Enter');
            act(() => (window.document.activeElement as HTMLElement).click());
            await settle();

            expect(linkForm()).not.toBeUndefined();
            expect(linkForm()?.contains(window.document.activeElement)).toBe(true);
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            return editable;
        };

        /** A press Radix reads as outside the panel: the pointer's event first, then the mouse's own. */
        const pressOn = (target: Element): void => {
            act(() => {
                target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
                target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            });
        };

        it('keeps the panel open under the link form opened from it, and Escape closes the form before the panel', async () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            const editable = await openLinkFormFromPanel(container);

            press(window.document.activeElement as Element, 'Escape');
            await settle();
            expect(linkForm()).toBeUndefined();
            expectFocusSomewhereReal();
            const rested = window.document.activeElement;
            expect(rested === editable || panelOf()?.contains(rested) === true).toBe(true);

            if (panelOf()?.contains(rested) === true) {
                expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
                // The first Escape belongs to the tooltip the focus opened, if any.
                press(rested as Element, 'Escape');
                if (more(container)?.getAttribute('aria-expanded') === 'true') {
                    press(window.document.activeElement as Element, 'Escape');
                }
                expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
                expect(window.document.activeElement).toBe(more(container));
            }
        });

        it('keeps the panel open on a press inside the link form opened from it', async () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            await openLinkFormFromPanel(container);
            const input = linkForm()?.querySelector('input');
            expect(input).not.toBeNull();

            pressOn(input as Element);
            await settle();

            expect(linkForm()).not.toBeUndefined();
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
        });

        it('closes the panel on a press outside once the link form opened from it is closed', async () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            await openLinkFormFromPanel(container);
            const outside = window.document.createElement('div');
            window.document.body.append(outside);
            teardown.push(() => outside.remove());
            press(window.document.activeElement as Element, 'Escape');
            await settle();
            expect(linkForm()).toBeUndefined();
            // The form hands focus back to the text, which may have closed the panel; open it again.
            if (more(container)?.getAttribute('aria-expanded') === 'false') {
                act(() => {
                    more(container)?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }),
                    );
                });
                await settle();
            }
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');

            pressOn(outside);
            await settle();

            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
        });

        it('closes the panel on a press inside a popper layer that is not a flyout of its controls', async () => {
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            resize(70);
            const layer = window.document.createElement('div');
            layer.setAttribute('data-radix-popper-content-wrapper', '');
            window.document.body.append(layer);
            teardown.push(() => layer.remove());
            act(() => more(container)?.click());
            await settle();
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');

            pressOn(layer);
            await settle();

            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
        });

        it('keeps the panel usable after a text style menu opened from it is closed with Escape', async () => {
            const withSelect = [boldPlugin, linkPlugin(), alignPlugin, textStylePlugin()];
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} plugins={withSelect} toolbarPlacement="top" />
            ));
            ready();
            resize(40);
            const editable = editableIn(container);
            act(() => editable.focus());
            selectAll(editable);

            act(() => more(container)?.click());
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            const select = panelOf()?.querySelector<HTMLElement>('[aria-label="Text style"]');
            expect(select).not.toBeNull();
            act(() => select?.focus());
            press(select as Element, 'Enter');
            await settle();
            expect(select?.getAttribute('aria-expanded')).toBe('true');
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');

            // A press in the menu is outside the panel to Radix, yet the menu is the panel's own.
            const option = window.document.querySelector('[role="option"]');
            expect(option).not.toBeNull();
            act(() => {
                option?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
            });
            await settle();
            expect(select?.getAttribute('aria-expanded')).toBe('true');
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');

            press(window.document.activeElement as Element, 'Escape');
            await settle();
            expect(select?.getAttribute('aria-expanded')).toBe('false');
            expectFocusSomewhereReal();
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            // Still a toolbar: an arrow key moves focus between its controls.
            act(() => select?.focus());
            const before = window.document.activeElement;
            press(before as Element, 'ArrowLeft');
            expect(window.document.activeElement).not.toBe(before);
            expect(panelOf()?.contains(window.document.activeElement)).toBe(true);
        });

        it('closes a click-opened panel on a press outside without moving focus onto More, onBlur as with no panel', () => {
            vi.useFakeTimers();
            teardown.push(() => vi.useRealTimers());
            const onBlur = vi.fn<(doc: RteDocument) => void>();
            const { container, ready } = mount(() => (
                <RichTextEditor value={paragraph('text')} onBlur={onBlur} plugins={plugins} toolbarPlacement="top" />
            ));
            ready();
            resize(70);
            const editable = editableIn(container);
            const outside = window.document.createElement('div');
            window.document.body.append(outside);
            teardown.push(() => outside.remove());
            act(() => {
                editable.focus();
                vi.runAllTimers();
            });
            act(() => {
                more(container)?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
            });
            // The panel starts listening for outside presses a task after it opens.
            act(() => {
                vi.runAllTimers();
            });
            expect(more(container)?.getAttribute('aria-expanded')).toBe('true');
            expect(window.document.activeElement).toBe(editable);

            act(() => {
                outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
                outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                outside.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                vi.runAllTimers();
            });

            expect(more(container)?.getAttribute('aria-expanded')).toBe('false');
            expect(window.document.activeElement).not.toBe(more(container));
            expect(onBlur).not.toHaveBeenCalled();
        });

        it('keeps focus in the toolbar when a refit takes the focused control away', () => {
            const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
            ready();
            act(() => container.querySelector<HTMLElement>('[aria-label="Align left"]')?.focus());

            resize(70);

            expect(window.document.activeElement).toBe(more(container));
        });
    });

    it('names the shortcut a button has', () => {
        const { container, ready } = mount(() => <RichTextEditor plugins={plugins} toolbarPlacement="top" />);
        ready();

        const bold = container.querySelector<HTMLElement>('[aria-label="Bold"]');
        expect(bold?.getAttribute('aria-keyshortcuts')).toMatch(/^(Meta|Control)\+B$/);

        act(() => bold?.focus());
        expect(window.document.querySelector('[role="tooltip"]')?.textContent).toMatch(/^Bold(⌘B|Ctrl\+B)$/);
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
            <RichTextEditor value={value} onChange={onChange} plugins={[boldPlugin]} />
        ));
        ready();
        const placeholder = container.querySelector('[data-rte-unknown]');
        expect(placeholder?.textContent).toBe('kept');
        expect(placeholder?.getAttribute('contenteditable')).toBe('false');

        paste(container, '<p>typed</p>');

        expect(stored()?.blocks.find((block) => (block.type as string) === 'callout')).toBe(callout);
    });
});

/** A switch a test flips to make a toolbar item throw. */
type CrashSwitch = { crash: boolean };

/** A switch a test flips to make a plugin throw until it is fixed. */
type BrokenSwitch = { broken: boolean };

type CalloutProps = { children?: ReactNode };

/** Read by `Callout`, which the editor renders with block props only. */
const calloutState: BrokenSwitch = { broken: false };

const Callout = ({ children }: CalloutProps): ReactNode => {
    if (calloutState.broken) {
        throw new Error('readonly view broke');
    }
    return <p>{children}</p>;
};

describe('an editor that crashes', () => {
    beforeEach(() => {
        calloutState.broken = false;
    });

    /** React logs every caught render error; the tests expect it and keep the output clean. */
    const silenceReact = (): void => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        teardown.push(() => error.mockRestore());
    };
    /** Blurs the focused element; fails when nothing is focused, since the test expects focus to leave. */
    const blurActiveElement = (): void => {
        const active = window.document.activeElement;
        if (!(active instanceof HTMLElement)) {
            throw new TypeError('No element has focus to blur');
        }
        active.blur();
    };
    const throwingPlugin = (): RtePlugin =>
        definePlugin({
            id: 'throws',
            toolbar: [
                {
                    label: 'Throws',
                    render: () => {
                        throw new Error('toolbar broke');
                    },
                },
            ],
        });
    /** A toolbar item that throws once `state.crash` is set and the selection moves, as an edit makes it. */
    const lateCrashPlugin = (state: CrashSwitch): RtePlugin =>
        definePlugin({
            id: 'late',
            toolbar: [
                {
                    label: 'Late',
                    render: ({ selection }) => {
                        if (state.crash && selection) {
                            throw new Error('after the edit');
                        }
                        return <span>fine</span>;
                    },
                },
            ],
        });
    /** A toolbar item under its own id, which throws when `crash` is set; new ids remount the engine. */
    const idPlugin = (id: string, crash = false): RtePlugin =>
        definePlugin({
            id,
            toolbar: [
                {
                    label: 'Fine',
                    render: () => {
                        if (crash) {
                            throw new Error(`plugin ${id} broke`);
                        }
                        return <span>fine</span>;
                    },
                },
            ],
        });
    /** A toolbar item that throws while `state.broken` is set. */
    const flakyPlugin = (state: BrokenSwitch): RtePlugin =>
        definePlugin({
            id: 'flaky',
            toolbar: [
                {
                    label: 'Flaky',
                    render: () => {
                        if (state.broken) {
                            throw new Error('until fixed');
                        }
                        return <span>fine</span>;
                    },
                },
            ],
        });
    /** A block whose readonly view throws while `calloutState.broken` is set. */
    const calloutPlugin = (): RtePlugin =>
        definePlugin({
            id: 'callout',
            content: defineContent({
                blocks: {
                    callout: defineBlock({
                        content: 'text',
                        toHtml: () => ({ tag: 'p', attrs: { 'data-callout': '' }, children: true }),
                        parse: [{ tag: 'p[data-callout]' }],
                        render: { component: Callout },
                    }),
                },
            }),
        });
    // A test-only block type outside the `RteBlock` union.
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

    it('hands onError the error a mention resolver throws while the editor draws the mention', () => {
        silenceReact();
        const onError = errorSpy();
        const plugins = [
            ...defaultPlugins,
            mentionPlugin({
                items: [],
                resolve: () => {
                    throw new Error('resolver offline');
                },
            }),
        ];
        const value: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' }],
                },
            ],
        };

        mount(() => <RichTextEditor value={value} plugins={plugins} onError={onError} />);

        expect(onError).toHaveBeenCalled();
        expect(onError.mock.calls[0]?.[0].message).toBe('resolver offline');
    });

    it('leaves focus alone after a Retry pressed without taking focus, as a mouse press may', () => {
        silenceReact();
        calloutState.broken = true;
        const { container } = mount(() => (
            <RichTextEditor value={callout('read me')} plugins={[calloutPlugin()]} readonly />
        ));
        calloutState.broken = false;

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
        const elsewhere = container.querySelector('input');
        if (!(elsewhere instanceof HTMLInputElement)) {
            throw new TypeError('The test input is missing');
        }
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
            blurActiveElement();
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
        // Typing goes on after the text, not before it.
        const caret = window.getSelection();
        expect(caret?.isCollapsed).toBe(true);
        expect(caret?.anchorNode?.textContent).toBe('text');
        expect(caret?.anchorOffset).toBe('text'.length);
    });

    it('does not take focus later when it was retried readonly', () => {
        silenceReact();
        calloutState.broken = true;
        const plugin = calloutPlugin();
        const value = callout('read me');
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={value} plugins={[plugin]} readonly />
        ));

        calloutState.broken = false;
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
        calloutState.broken = false;
        const plugins = [...defaultPlugins, calloutPlugin()];
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
        calloutState.broken = true;
        // A new plugin list draws the readonly view again.
        rerender(
            <RichTextEditor value={first} onChange={onChange} plugins={[...plugins]} onError={onError} readonly />,
        );

        // The fallback's read-only view is the one that crashed, so it is not reported twice.
        expect(onError).toHaveBeenCalledOnce();

        // The fallback cannot show it, so Retry with the cause gone does.
        calloutState.broken = false;
        retry(container);
        expect(container.textContent).toContain('one');
        expect(container.textContent).not.toContain('two');
    });

    it('shows a document the host pushes after the fallback could not show the last one', () => {
        silenceReact();
        calloutState.broken = true;
        const plugins = [throwingPlugin(), calloutPlugin()];
        const { container, rerender } = mount(() => <RichTextEditor value={callout('unshowable')} plugins={plugins} />);
        expect(retryButton(container)).toBeDefined();
        expect(container.textContent).not.toContain('unshowable');

        rerender(<RichTextEditor value={paragraph('replacement')} plugins={plugins} />);

        expect(container.textContent).toContain('replacement');
    });

    it('hands onError an Error when a plugin throws something else', () => {
        silenceReact();
        const throwsString: RtePlugin = definePlugin({
            id: 'throws',
            toolbar: [
                {
                    label: 'Throws',
                    render: () => {
                        // oxlint-disable-next-line typescript/only-throw-error -- what a careless plugin throws
                        throw 'not an error';
                    },
                },
            ],
        });
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
        calloutState.broken = true;
        const { container } = mount(() => (
            <RichTextEditor value={callout('read me')} plugins={[calloutPlugin()]} readonly />
        ));
        calloutState.broken = false;

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
        calloutState.broken = true;
        const plugins = [calloutPlugin()];
        const { container, rerender } = mount(() => (
            <RichTextEditor value={callout('one')} plugins={plugins} readonly />
        ));
        calloutState.broken = false;
        retry(container);
        act(() => {
            blurActiveElement();
            vi.runAllTimers();
        });
        expect(window.document.activeElement).toBe(window.document.body);

        calloutState.broken = true;
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
        calloutState.broken = true;
        const onError = errorSpy();
        mount(() => (
            <RichTextEditor
                value={callout('unshowable')}
                plugins={[throwingPlugin(), calloutPlugin()]}
                onError={onError}
            />
        ));

        const messages = onError.mock.calls.map(([error]) => error.message);
        expect(messages).toHaveLength(2);
        expect(messages).toEqual(expect.arrayContaining(['toolbar broke', 'readonly view broke']));
    });

    it('reports a read-only view that cannot show the document once per crash, however often the host passes it', () => {
        silenceReact();
        calloutState.broken = true;
        const plugins = [throwingPlugin(), calloutPlugin()];
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
        calloutState.broken = true;
        const plugins = [calloutPlugin()];
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

    it('reports once when a document from a newer version, shown read-only, crashes its view', () => {
        silenceReact();
        calloutState.broken = true;
        const onError = errorSpy();
        // A version this editor does not write, which `RteDocument` does not allow.
        const newer = { ...callout('newer'), version: 2 } as unknown as RteDocument;
        mount(() => <RichTextEditor value={newer} plugins={[calloutPlugin()]} onError={onError} />);

        expect(onError).toHaveBeenCalledOnce();
    });

    it('settles on the message and Retry when every document it gets cannot be shown', () => {
        silenceReact();
        calloutState.broken = true;
        const plugins = [throwingPlugin(), calloutPlugin()];
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
        calloutState.broken = false;
        const plugins = [...defaultPlugins, calloutPlugin()];
        const saved = callout('saved');
        const onError = errorSpy();
        // A host that commits on blur and never passes edits back as `value`.
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={saved} plugins={plugins} onError={onError} />
        ));
        ready();
        paste(container, '<p>draft</p>');
        rerender(<RichTextEditor value={saved} plugins={plugins} onError={onError} readonly />);

        calloutState.broken = true;
        // A new plugin list draws the readonly view again.
        rerender(<RichTextEditor value={saved} plugins={[...plugins]} onError={onError} readonly />);

        // The fallback's read-only view is the one that crashed, so it is not reported twice.
        expect(onError).toHaveBeenCalledOnce();

        // The fallback cannot show it, so Retry with the cause gone does.
        calloutState.broken = false;
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
        const broken: RtePlugin = definePlugin({
            id: 'broken',
            content: defineContent({
                blocks: {
                    broken: defineBlock({
                        content: 'text',
                        toHtml: () => ({ tag: 'div', attrs: { 'data-broken': '' }, children: true }),
                        parse: [{ tag: 'div[data-broken]' }],
                    }),
                },
            }),
            edit: { broken: Broken },
        });
        // A test-only block type outside the `RteBlock` union.
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
            <RichTextEditor value={paragraph('text')} onBlur={onBlur} plugins={[boldPlugin]} />
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

describe('an inline whose view shows something other than its stored value', () => {
    type Badge = { id: string; label: string };
    const badgePlugin = definePlugin({
        id: 'badge',
        content: defineContent({
            inlines: {
                badge: defineInline<Badge>({
                    toHtml: (value) => ({ tag: 'span', attrs: { 'data-badge-id': value.id }, children: value.label }),
                    parse: [],
                }),
            },
        }),
        edit: { badge: ({ value }) => <span data-badge>{value.label.toUpperCase()}</span> },
    });
    // `RteDocument` names no plugin inline, so the badge needs the cast.
    const value = {
        version: 1,
        blocks: [
            {
                type: 'paragraph',
                children: [{ text: 'Ask ' }, { type: 'badge', id: 'b1', label: 'Jane' }, { text: '' }],
            },
        ],
    } as RteDocument;

    it('keeps the stored value in the document after an unrelated edit', () => {
        const { container, stored, ready } = mount((onChange) => (
            <RichTextEditor value={value} onChange={onChange} plugins={[...defaultPlugins, badgePlugin]} />
        ));
        ready();

        expect(container.querySelector('[data-badge]')?.textContent).toBe('JANE');

        paste(container, '<p>x</p>');

        expect(childrenOf(stored())).toContainEqual({ type: 'badge', id: 'b1', label: 'Jane' });
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
            expect(children).toContainEqual({ text: 'red', fontColor: { color: '#ff0000' } });
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

        it('stores a colour as hex, and leaves plain black alone', () => {
            const doc = pasted(
                '<p><span style="color: #f00">red</span><span style="color: rgb(0, 0, 0)">black</span></p>',
            );

            expect(childrenOf(doc)).toEqual([{ text: 'red', fontColor: { color: '#ff0000' } }, { text: 'black' }]);
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

describe('a new-tab link in the editor', () => {
    it('is drawn by its own view, so the hidden note of the reading view is not added to it', () => {
        const value: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'docs', link: { href: 'https://example.com', openInNewTab: true } }],
                },
            ],
        };
        const container = render(<RichTextEditor value={value} plugins={[linkPlugin()]} />);
        const anchor = editableIn(container).querySelector('a');

        expect(anchor?.textContent).toBe('docs');
        expect(anchor?.getAttribute('aria-description')).toBe('Opens in a new tab');
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

    // `RteDocument` names no plugin block, so the check list needs the cast.
    const started = (checked: boolean | 'inProgress'): RteDocument =>
        ({
            version: 1,
            blocks: [
                {
                    type: 'checkList',
                    children: [
                        {
                            type: 'checkItem',
                            checked,
                            children: [{ type: 'paragraph', children: [{ text: 'Started' }] }],
                        },
                    ],
                },
            ],
        }) as RteDocument;

    it('shows an item in progress as a mixed checkbox, in the editor and the readonly view', () => {
        for (const element of [
            <RichTextEditor key="editor" value={started('inProgress')} plugins={checkListPlugins} />,
            <RichTextRenderer key="renderer" value={started('inProgress')} plugins={checkListPlugins} />,
        ]) {
            const box = render(element).querySelector<HTMLInputElement>('input[type="checkbox"]');

            expect(box?.indeterminate).toBe(true);
            expect(box?.checked).toBe(false);
        }
    });

    it('marks an item in progress done on a click', () => {
        const { container, ready, stored } = mount((onChange) => (
            <RichTextEditor value={started('inProgress')} onChange={onChange} plugins={checkListPlugins} />
        ));
        ready();

        act(() => container.querySelector<HTMLInputElement>('input[type="checkbox"]')?.click());

        expect(stored()).toEqual(started(true));
    });

    it('exports an item in progress named by its state, and reads it back', () => {
        const html = serializeToHtml(started('inProgress'), { plugins: checkListPlugins });

        expect(html).toContain('aria-label="In progress"');
        expect(html).toContain('data-checked="inProgress"');

        const { container, ready, stored } = mount((onChange) => (
            <RichTextEditor onChange={onChange} plugins={checkListPlugins} />
        ));
        ready();
        paste(container, html);

        expect(stored()?.blocks).toContainEqual(started('inProgress').blocks[0]);
    });
});
