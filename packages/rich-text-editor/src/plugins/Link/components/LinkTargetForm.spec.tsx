/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { LinkTargetForm } from './LinkTargetForm';

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

const dispatchEnter = (input: HTMLInputElement, init: KeyboardEventInit & { keyCode?: number }): KeyboardEvent => {
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true, ...init });
    if (init.keyCode === 229 && event.keyCode === 0) {
        Object.defineProperty(event, 'keyCode', { value: 229 });
    }
    act(() => {
        input.dispatchEvent(event);
    });
    return event;
};

const mountForm = () => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onSave = vi.fn();
    act(() => {
        root.render(
            <LinkTargetForm initial={{ href: 'https://example.com' }} onSave={onSave} onCancel={() => undefined} />,
        );
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    const input = container.querySelector('input');
    if (!input) {
        throw new Error('no url field');
    }
    return { input, onSave };
};

describe('LinkTargetForm', () => {
    it('saves and prevents default on plain Enter', () => {
        const { input, onSave } = mountForm();

        const event = dispatchEnter(input, {});
        expect(onSave).toHaveBeenCalledOnce();
        expect(onSave).toHaveBeenCalledWith({ href: 'https://example.com' });
        expect(event.defaultPrevented).toBe(true);
    });

    it('does not save or prevent default on Enter while composing', () => {
        const { input, onSave } = mountForm();

        const event = dispatchEnter(input, { isComposing: true });
        expect(onSave).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(false);
    });

    it('does not save or prevent default on Enter with IME keyCode', () => {
        const { input, onSave } = mountForm();

        const event = dispatchEnter(input, { keyCode: 229 });
        expect(onSave).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(false);
    });
});