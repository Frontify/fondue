/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

// Driven through the package's public API, the way a host does: the props are
// the whole conversation between a host and a mounted editor.
import { defaultPlugins, RichTextEditor, type RteDocument } from '../index';

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
 * The engine is fetched rather than imported, so an editor is not editable the
 * moment it is mounted — the document is drawn as content first. Every test
 * driving the editor waits here for the editable element to take over.
 *
 * Rounds rather than one flush: the first fetch has a module to evaluate, which
 * takes a turn of the event loop that a microtask drain would not cover. Once it
 * is loaded, later mounts are ready on the first round.
 */
const editorReady = async (container: HTMLElement): Promise<void> => {
    for (let round = 0; round < 20; round++) {
        if (container.querySelector('[contenteditable]')) {
            return;
        }
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    }
    throw new Error('the editor never became editable');
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
        /** Resolves once the engine has arrived and taken the content over. */
        ready: (): Promise<void> => editorReady(container),
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
    it('keeps the marks and blocks the pasted HTML carried', async () => {
        const { container, stored, ready } = mount((onChange) => (
            <RichTextEditor value={paragraph('')} onChange={onChange} plugins={defaultPlugins} />
        ));
        await ready();

        paste(
            container,
            '<h2>A heading</h2><p>Text with <strong>bold</strong> and ' +
                '<a href="https://example.com">a link</a> in it.</p>',
        );

        // The rules that recognized all of this are built the first time the
        // engine has HTML to read rather than at mount (see setup/schema.ts);
        // this says they are still the right rules by then.
        const emitted = JSON.stringify(stored());
        expect(emitted).toContain('"style":"heading2"');
        expect(emitted).toContain('"bold":true');
        expect(emitted).toContain('"href":"https://example.com"');
        expect(emitted).toContain('A heading');
    });

    it('shows what was pasted', async () => {
        const { container, ready } = mount((onChange) => (
            <RichTextEditor value={paragraph('')} onChange={onChange} plugins={defaultPlugins} />
        ));
        await ready();

        paste(container, '<p>Pasted content.</p>');

        expect(container.textContent).toContain('Pasted content.');
    });
});

describe('a `value` set from outside', () => {
    it('is shown, and is not reported back', async () => {
        const { container, onChange, ready } = mount((change) => (
            <RichTextEditor value={paragraph('first')} onChange={change} plugins={defaultPlugins} />
        ));
        await ready();

        expect(container.textContent).toContain('first');
        expect(onChange).not.toHaveBeenCalled();
    });

    it('replaces the content when it genuinely differs', async () => {
        const onChange = vi.fn<(doc: RteDocument) => void>();
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('before')} onChange={onChange} plugins={defaultPlugins} />
        ));
        await ready();

        rerender(<RichTextEditor value={paragraph('after')} onChange={onChange} plugins={defaultPlugins} />);

        expect(container.textContent).toContain('after');
        expect(container.textContent).not.toContain('before');
    });

    it('is ignored when an equal document arrives as a new object', async () => {
        const onChange = vi.fn<(doc: RteDocument) => void>();
        const doc = paragraph('settled');
        const { rerender, ready } = mount(() => (
            <RichTextEditor value={doc} onChange={onChange} plugins={defaultPlugins} />
        ));
        await ready();

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

describe('while the engine is still loading', () => {
    it('shows the document, and hands it over exactly once', async () => {
        const { container, ready } = mount((onChange) => (
            <RichTextEditor value={paragraph('already here')} onChange={onChange} plugins={defaultPlugins} />
        ));

        // Whatever the reader gets to read before an engine exists, they read
        // straight away.
        expect(container.textContent).toContain('already here');

        await ready();

        // And once the editor takes over, there is one of it — not the drawn
        // copy and the edited one side by side.
        expect(container.querySelectorAll('p')).toHaveLength(1);
        expect(container.textContent).toBe('already here');
    });
});

describe('a readonly editor', () => {
    it('shows the document without ever becoming editable', async () => {
        const { container } = mount(() => (
            <RichTextEditor value={paragraph('for reading')} plugins={defaultPlugins} readonly />
        ));

        // Long enough for a load to have finished, had one been started.
        for (let round = 0; round < 5; round++) {
            await act(async () => {
                await new Promise((resolve) => setTimeout(resolve, 0));
            });
        }

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

    it('fetches the engine once it is allowed to be edited', async () => {
        const { container, rerender, ready } = mount(() => (
            <RichTextEditor value={paragraph('was readonly')} plugins={defaultPlugins} readonly />
        ));

        expect(container.querySelector('[contenteditable]')).toBeNull();

        rerender(<RichTextEditor value={paragraph('was readonly')} plugins={defaultPlugins} />);
        await ready();

        expect(container.textContent).toContain('was readonly');
    });
});

describe('a page of editors', () => {
    const COUNT = 30;
    const KEYS = Array.from({ length: COUNT }, (_, index) => `editor-${index}`);

    it('mounts them all, and none of them talks when nothing changed', async () => {
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
        await ready();

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
