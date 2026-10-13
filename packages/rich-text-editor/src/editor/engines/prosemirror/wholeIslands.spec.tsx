/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from 'vitest';

import { defineInline, PARAGRAPH, type RteDocumentOf, type RtePlugin } from '#/core';

import { mountDocument } from './editing';

/**
 * The plugin reacts to `selectionchange` a microtask later, so the editor can
 * be gone by the time it runs — a host that unmounts on the same event, say.
 */
const plugins: RtePlugin[] = [
    {
        id: 'tag',
        inlines: {
            tag: defineInline<{ label: string }>({
                toHtml: ({ label }) => ({ tag: 'span', attrs: { 'data-tag': label }, children: label }),
                parse: [{ tag: 'span[data-tag]', value: (element) => ({ label: element.dataset.tag ?? '' }) }],
                renderComponent: ({ value }) => <span>{value.label}</span>,
            }),
        },
    },
];

const doc: RteDocumentOf = {
    version: 1,
    blocks: [{ type: PARAGRAPH, children: [{ text: 'before ' }, { type: 'tag', label: 'tag' }, { text: ' after' }] }],
};

const mount = () => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    return mountDocument({
        container,
        initialDoc: doc,
        plugins,
        readOnly: false,
        placeholder: '',
        contentClassName: 'content',
        placeholderClassName: 'placeholder',
        onDocChange: () => {},
        onStateChange: () => {},
        onBlur: () => {},
    });
};

/** Records what the plugin's queued callbacks throw, instead of letting it escape the test. */
const catchQueuedErrors = (): unknown[] => {
    const errors: unknown[] = [];
    const queue = globalThis.queueMicrotask.bind(globalThis);
    vi.spyOn(globalThis, 'queueMicrotask').mockImplementation((callback) =>
        queue(() => {
            try {
                callback();
            } catch (error) {
                errors.push(error);
            }
        }),
    );
    return errors;
};

afterEach(() => {
    vi.restoreAllMocks();
    window.document.body.replaceChildren();
});

describe('a selection change the editor no longer sees', () => {
    it('does nothing once the editor is destroyed', async () => {
        const errors = catchQueuedErrors();
        const live = mount();

        const island = window.document.querySelector('[contenteditable="false"]');
        const text = island?.previousSibling;
        expect(island).not.toBeNull();
        expect(text).toBeTruthy();

        // A drag from the text before into the island.
        const selection = window.document.getSelection();
        selection?.setBaseAndExtent(text as Node, 2, island as Node, 0);
        window.document.dispatchEvent(new Event('selectionchange'));
        live.destroy();

        await Promise.resolve();

        expect(errors).toEqual([]);
    });
});
