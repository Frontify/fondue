/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';
import { describe, expect, it, vi } from 'vitest';

import { createChromeView } from '../chromeView';

type Insets = {
    top: number;
    bottom: number;
};

/** A view stand-in built with the props chrome gives, which ProseMirror reads on each scroll. */
const attach = () => {
    const chrome = createChromeView();
    const dom = { style: { setProperty: vi.fn(), removeProperty: vi.fn() } };
    const props = chrome.props(dom as unknown as HTMLElement, {}, () => 'dom') as {
        scrollMargin: Insets;
        scrollThreshold: Insets;
    };
    const view = { dom, setProps: vi.fn() } as unknown as EditorView;
    chrome.take(view);
    return { chrome, props };
};

describe('the chrome view insets', () => {
    it('keeps 5 px beyond a 300 px bottom inset in the margin and the inset itself in the threshold', () => {
        const { chrome, props } = attach();

        chrome.setKeyboardInset(300);

        expect(props.scrollMargin.bottom).toBe(305);
        expect(props.scrollThreshold.bottom).toBe(300);
    });

    it('adds a docked toolbar to the keyboard inset, keeps it through a new keyboard measure and drops it at 0', () => {
        const { chrome, props } = attach();

        chrome.setKeyboardInset(300);
        chrome.setDockedInset(60);
        chrome.setKeyboardInset(300);
        const docked = [props.scrollMargin.bottom, props.scrollThreshold.bottom];
        chrome.setDockedInset(0);

        expect(docked).toEqual([365, 360]);
        expect([props.scrollMargin.bottom, props.scrollThreshold.bottom]).toEqual([305, 300]);
    });

    it('does the same for a top inset and resets both when the inset is zero', () => {
        const { chrome, props } = attach();

        chrome.setTopInset(48);
        const covered = [props.scrollMargin.top, props.scrollThreshold.top];
        chrome.setTopInset(0);

        expect(covered).toEqual([53, 48]);
        expect([props.scrollMargin.top, props.scrollThreshold.top]).toEqual([5, 0]);
    });
});
