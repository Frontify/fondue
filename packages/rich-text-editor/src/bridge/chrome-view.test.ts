/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';
import { describe, expect, it, vi } from 'vitest';

import { createChromeView } from './chrome-view';

interface Insets {
    top: number;
    bottom: number;
}

/** A view stand-in that keeps the props chrome sets, which ProseMirror reads on each scroll. */
const attach = () => {
    const chrome = createChromeView();
    // Replaced by the objects chrome sets when the view is taken.
    const props: { scrollMargin: Insets; scrollThreshold: Insets } = {
        scrollMargin: { top: 0, bottom: 0 },
        scrollThreshold: { top: 0, bottom: 0 },
    };
    const view = {
        dom: { style: { setProperty: vi.fn(), removeProperty: vi.fn() } },
        setProps: vi.fn((next: typeof props) => Object.assign(props, next)),
    } as unknown as EditorView;
    chrome.take(view);
    return { chrome, props };
};

describe('the chrome view insets', () => {
    it('SPEC-rich-text-accessibility/AC-024 keeps 5 px beyond a 300 px bottom inset in the margin and the inset itself in the threshold', () => {
        const { chrome, props } = attach();

        chrome.setBottomInset(300);

        expect(props.scrollMargin.bottom).toBe(305);
        expect(props.scrollThreshold.bottom).toBe(300);
    });

    it('SPEC-rich-text-accessibility/AC-024 does the same for a top inset and resets both when the inset is zero', () => {
        const { chrome, props } = attach();

        chrome.setTopInset(48);
        const covered = [props.scrollMargin.top, props.scrollThreshold.top];
        chrome.setTopInset(0);

        expect(covered).toEqual([53, 48]);
        expect([props.scrollMargin.top, props.scrollThreshold.top]).toEqual([5, 0]);
    });
});
