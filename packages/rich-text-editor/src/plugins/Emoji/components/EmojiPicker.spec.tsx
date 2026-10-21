/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EmojiItem } from '../types';

import { EmojiPicker } from './EmojiPicker';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const EMOJIS: EmojiItem[] = [
    { emoji: '😄', shortcodes: ['smile'], name: 'Grinning face with smiling eyes', category: 'Smileys' },
    { emoji: '🐶', shortcodes: ['dog'], name: 'Dog face', category: 'Animals' },
    { emoji: '😏', shortcodes: ['smirk'], name: 'Smirking face', category: 'Smileys' },
];

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const mountPicker = () => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onPick = vi.fn();
    act(() => {
        root.render(<EmojiPicker emojis={EMOJIS} onPick={onPick} />);
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    const search = container.querySelector('input');
    if (!search) {
        throw new Error('no search field');
    }
    const type = (text: string): void => {
        act(() => {
            const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
            setValue?.call(search, text);
            search.dispatchEvent(new Event('input', { bubbles: true }));
        });
    };
    const buttons = (): string[] =>
        [...container.querySelectorAll('button[aria-label]')].map((button) => button.textContent ?? '');
    return { container, search, type, buttons, onPick };
};

describe('the emoji picker', () => {
    it('shows every emoji by section, sections in list order', () => {
        const { container, buttons } = mountPicker();

        expect([...container.querySelectorAll('section')].map((section) => section.getAttribute('aria-label'))).toEqual(
            ['Smileys', 'Animals'],
        );
        expect(buttons()).toEqual(['😄', '😏', '🐶']);
    });

    it('narrows to the matches as the search is typed, and Enter picks the first', () => {
        const { search, type, buttons, onPick } = mountPicker();

        type('dog');
        expect(buttons()).toEqual(['🐶']);

        act(() => {
            search.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
        });
        expect(onPick).toHaveBeenCalledWith(EMOJIS[1]);
    });

    it('says when nothing matches', () => {
        const { container, type, buttons } = mountPicker();

        type('zz');

        expect(buttons()).toEqual([]);
        expect(container.textContent).toContain('No matches');
    });

    it('picks an emoji on a click', () => {
        const { container, onPick } = mountPicker();

        act(() => {
            container.querySelector<HTMLButtonElement>('button[aria-label="Smirking face"]')?.click();
        });

        expect(onPick).toHaveBeenCalledWith(EMOJIS[2]);
    });
});
