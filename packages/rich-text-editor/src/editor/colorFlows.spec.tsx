/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { RichTextEditor, type RteDocument } from '../index';
import { fontColorPlugin } from '../plugins';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/** Driven through the public editor, as a host mounts it. */

const teardown: (() => void)[] = [];

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const RED = '#ff0000';
const BLUE = '#0000ff';
const COLOR_CONTROL = 'button[aria-label^="Text color"]';

/** Red text followed directly by blue text. */
const RED_THEN_BLUE: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'paragraph',
            children: [
                { text: 'red', fontColor: { color: RED } },
                { text: 'blue', fontColor: { color: BLUE } },
            ],
        },
    ],
};

const mount = (value: RteDocument): HTMLElement => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    act(() => {
        root.render(<RichTextEditor value={value} plugins={[fontColorPlugin()]} toolbarPlacement="top" />);
    });
    teardown.push(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
    });
    return container;
};

/** Puts the caret at the end of the first text node, the way a click there would. */
const caretAfterFirstText = (container: HTMLElement): void => {
    const editable = container.querySelector<HTMLElement>('[contenteditable]');
    if (!editable) {
        throw new Error('the editor never became editable');
    }
    act(() => editable.focus());
    const text = window.document.createTreeWalker(editable, NodeFilter.SHOW_TEXT).nextNode();
    act(() => {
        if (text) {
            const end = text.textContent?.length ?? 0;
            window.getSelection()?.setBaseAndExtent(text, end, text, end);
        }
        window.document.dispatchEvent(new Event('selectionchange'));
    });
};

describe('the colour control', () => {
    it('shows the colour picked at the caret, not the colour of the text after it', () => {
        const container = mount(RED_THEN_BLUE);
        caretAfterFirstText(container);
        act(() => container.querySelector<HTMLButtonElement>(COLOR_CONTROL)?.click());
        act(() => window.document.querySelector<HTMLButtonElement>('button[aria-label="Purple"]')?.click());

        expect(container.querySelector(COLOR_CONTROL)?.getAttribute('aria-label')).toBe('Text color: #8430CE');
    });
});
