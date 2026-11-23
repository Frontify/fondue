/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useKeyboardFocus } from './useKeyboardFocus';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const INSIDE_TEST_ID = 'inside';
const OTHER_INSIDE_TEST_ID = 'other-inside';
const OUTSIDE_TEST_ID = 'outside';

type MountedKeyboardFocus = {
    inside: HTMLElement;
    otherInside: HTMLElement;
    outside: HTMLElement;
    isKeyboardFocused: () => boolean;
    unmount: () => void;
};

const find = (container: Element, testId: string): HTMLElement => {
    const found = container.querySelector<HTMLElement>(`[data-test-id="${testId}"]`);
    if (found === null) {
        throw new Error(`the probe never rendered ${testId}`);
    }
    return found;
};

type MountKeyboardFocusOptions = {
    /** Focuses a button inside from a passive effect declared before the hook, as the editor's Retry does. */
    focusInsideOnMount: boolean;
};

/** Mounts the hook on an element with two buttons inside and one outside it. */
const mountKeyboardFocus = (
    { focusInsideOnMount }: MountKeyboardFocusOptions = { focusInsideOnMount: false },
): MountedKeyboardFocus => {
    const Probe = (): ReactNode => {
        const elementRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            if (focusInsideOnMount) {
                elementRef.current?.querySelector('button')?.focus();
            }
        }, []);
        useKeyboardFocus({ elementRef, isMounted: true });
        return (
            <>
                <div ref={elementRef} data-test-id="marked">
                    <button type="button" data-test-id={INSIDE_TEST_ID} />
                    <button type="button" data-test-id={OTHER_INSIDE_TEST_ID} />
                </div>
                <button type="button" data-test-id={OUTSIDE_TEST_ID} />
            </>
        );
    };
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    act(() => root.render(<Probe />));
    let isUnmounted = false;
    const unmount = (): void => {
        if (isUnmounted) {
            return;
        }
        isUnmounted = true;
        act(() => root.unmount());
    };
    teardown.push(() => {
        unmount();
        container.remove();
    });

    const marked = find(container, 'marked');
    return {
        inside: find(container, INSIDE_TEST_ID),
        otherInside: find(container, OTHER_INSIDE_TEST_ID),
        outside: find(container, OUTSIDE_TEST_ID),
        isKeyboardFocused: () => marked.dataset.keyboardFocus === 'true',
        unmount,
    };
};

const focus = (target: HTMLElement): void => {
    act(() => target.focus());
};

const press = (target: HTMLElement, type: 'keydown' | 'pointerdown'): void => {
    act(() => {
        target.dispatchEvent(new Event(type, { bubbles: true }));
    });
};

describe('the keyboard focus mark', () => {
    it('is off before any focus', () => {
        const { isKeyboardFocused } = mountKeyboardFocus();

        expect(isKeyboardFocused()).toBe(false);
    });

    it('is on when focus comes after a key', () => {
        const { inside, outside, isKeyboardFocused } = mountKeyboardFocus();

        press(outside, 'keydown');
        focus(inside);

        expect(isKeyboardFocused()).toBe(true);
    });

    it('is on for focus a passive effect gives the element on mount', () => {
        const { isKeyboardFocused } = mountKeyboardFocus({ focusInsideOnMount: true });

        expect(isKeyboardFocused()).toBe(true);
    });

    it('is on when focus comes before any input, as :focus-visible has it', () => {
        const { inside, isKeyboardFocused } = mountKeyboardFocus();

        focus(inside);

        expect(isKeyboardFocused()).toBe(true);
    });

    it('is off when focus comes after a pointer press', () => {
        const { inside, outside, isKeyboardFocused } = mountKeyboardFocus();

        press(outside, 'pointerdown');
        focus(inside);

        expect(isKeyboardFocused()).toBe(false);
    });

    it('goes off when a pointer press lands while focus is inside', () => {
        const { inside, isKeyboardFocused } = mountKeyboardFocus();
        press(inside, 'keydown');
        focus(inside);

        press(inside, 'pointerdown');

        expect(isKeyboardFocused()).toBe(false);
    });

    it('stays on when focus moves to another element inside', () => {
        const { inside, otherInside, isKeyboardFocused } = mountKeyboardFocus();
        press(inside, 'keydown');
        focus(inside);

        focus(otherInside);

        expect(isKeyboardFocused()).toBe(true);
    });

    it('goes off when focus moves to an element outside', () => {
        const { inside, outside, isKeyboardFocused } = mountKeyboardFocus();
        press(inside, 'keydown');
        focus(inside);

        focus(outside);

        expect(isKeyboardFocused()).toBe(false);
    });

    it('stops listening to the document on unmount', () => {
        const removeListener = vi.spyOn(window.document, 'removeEventListener');
        const { unmount } = mountKeyboardFocus();

        unmount();

        const removed = removeListener.mock.calls.map(([type]) => type);
        expect(removed).toContain('keydown');
        expect(removed).toContain('pointerdown');
        removeListener.mockRestore();
    });
});
