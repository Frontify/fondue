/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

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

const CHILD_TEST_ID = 'child';

/** Mounts the hook on an element with a child, handing back what a test needs to drive and read it. */
const mountKeyboardFocus = (): { child: Element; isKeyboardFocused: () => boolean } => {
    const Probe = (): ReactNode => {
        const keyboardFocusProps = useKeyboardFocus();
        return (
            <div {...keyboardFocusProps}>
                <span data-test-id={CHILD_TEST_ID} />
            </div>
        );
    };
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    act(() => root.render(<Probe />));
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });

    const child = container.querySelector(`[data-test-id="${CHILD_TEST_ID}"]`);
    if (child === null) {
        throw new Error('the probe never rendered');
    }
    return {
        child,
        isKeyboardFocused: () => container.firstElementChild?.getAttribute('data-keyboard-focus') === 'true',
    };
};

const focusIn = (target: Element): void => {
    act(() => {
        target.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    });
};

const focusOut = (target: Element): void => {
    act(() => {
        target.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    });
};

/** Focus leaving `target` for another element inside the same mark, as it does into a node view's field. */
const focusOutWithin = (target: Element): void => {
    act(() => {
        target.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: target }));
    });
};

const pressMouse = (target: Element): void => {
    act(() => {
        target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
};

describe('the keyboard focus mark', () => {
    it('is off before any focus', () => {
        const { isKeyboardFocused } = mountKeyboardFocus();

        expect(isKeyboardFocused()).toBe(false);
    });

    it('is on when a descendant takes focus without a press', () => {
        const { child, isKeyboardFocused } = mountKeyboardFocus();

        focusIn(child);

        expect(isKeyboardFocused()).toBe(true);
    });

    it('stays off when a press comes before the focus', () => {
        const { child, isKeyboardFocused } = mountKeyboardFocus();

        pressMouse(child);
        focusIn(child);

        expect(isKeyboardFocused()).toBe(false);
    });

    it('goes off when a press lands while focused', () => {
        const { child, isKeyboardFocused } = mountKeyboardFocus();
        focusIn(child);

        pressMouse(child);

        expect(isKeyboardFocused()).toBe(false);
    });

    it('goes off on blur and forgets the press, so the next focus by keyboard shows it again', () => {
        const { child, isKeyboardFocused } = mountKeyboardFocus();
        pressMouse(child);
        focusIn(child);
        focusOut(child);

        focusIn(child);

        expect(isKeyboardFocused()).toBe(true);
    });

    it('keeps a press when focus moves to another element inside', () => {
        const { child, isKeyboardFocused } = mountKeyboardFocus();
        pressMouse(child);
        focusIn(child);

        focusOutWithin(child);
        focusIn(child);

        expect(isKeyboardFocused()).toBe(false);
    });
});
