/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EmojiItem } from '../types';

import { EmojiDraft } from './EmojiDraft';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const EMOJIS: EmojiItem[] = [
    { emoji: '😄', shortcodes: ['smile'], name: 'Grinning face with smiling eyes', category: 'Smileys' },
    { emoji: '😏', shortcodes: ['smirk'], name: 'Smirking face', category: 'Smileys' },
    { emoji: '👍', shortcodes: ['+1', 'thumbsup'], name: 'Thumbs up', category: 'People' },
];

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

/** Lets the list's first placement (a frame later) land. */
const settle = async (): Promise<void> => {
    await act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
    });
};

const mountDraft = () => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onChoose = vi.fn();
    const onCancel = vi.fn();
    const onRemove = vi.fn();
    act(() => {
        root.render(<EmojiDraft emojis={EMOJIS} focused onChoose={onChoose} onCancel={onCancel} onRemove={onRemove} />);
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    const input = container.querySelector('input');
    if (!input) {
        throw new Error('no query input');
    }
    const type = async (text: string): Promise<void> => {
        act(() => {
            const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
            setValue?.call(input, text);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await settle();
    };
    const press = (key: string): void => {
        act(() => {
            input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        });
    };
    const status = (): string | null | undefined => container.querySelector('[role="status"]')?.textContent;
    return { input, type, press, status, onChoose, onCancel, onRemove };
};

describe('a shortcode being typed', () => {
    it('opens no list until two characters are typed', async () => {
        const { input, type, status } = mountDraft();

        await type('s');

        expect(input.getAttribute('aria-expanded')).toBe('false');
        expect(window.document.querySelector('[role="listbox"]')).toBeNull();
        expect(status()).toBe('');
    });

    it('drives a listbox of matches from its combobox, and says how many there are', async () => {
        const { input, type, status } = mountDraft();

        await type('sm');

        const listbox = window.document.getElementById(input.getAttribute('aria-controls') ?? '');
        expect(listbox?.getAttribute('role')).toBe('listbox');
        const options = [...(listbox?.querySelectorAll('[role="option"]') ?? [])];
        expect(options.map((option) => option.getAttribute('aria-label'))).toEqual([
            'Grinning face with smiling eyes',
            'Smirking face',
        ]);
        expect(input.getAttribute('aria-activedescendant')).toBe(options[0]?.id);
        expect(status()).toBe('2 emoji');
    });

    it('chooses the highlighted emoji with Enter', async () => {
        const { type, press, onChoose } = mountDraft();

        await type('sm');
        press('ArrowDown');
        press('Enter');

        expect(onChoose).toHaveBeenCalledWith(EMOJIS[1]);
    });

    it('chooses on a closing colon after a whole shortcode', async () => {
        const { type, onChoose } = mountDraft();

        await type('+1:');

        expect(onChoose).toHaveBeenCalledWith(EMOJIS[2]);
    });

    it('turns back into text as soon as it cannot be a shortcode', async () => {
        const { type, onCancel, onChoose } = mountDraft();

        await type('sm ');

        expect(onCancel).toHaveBeenCalledWith(':sm ');
        expect(onChoose).not.toHaveBeenCalled();
    });

    it('turns back into text on a closing colon that names nothing', async () => {
        const { type, onCancel } = mountDraft();

        await type('smi:');

        expect(onCancel).toHaveBeenCalledWith(':smi:');
    });

    it('turns back into text on Enter when nothing matches, and on Escape', async () => {
        const first = mountDraft();
        await first.type('zz');
        first.press('Enter');
        expect(first.status()).toBe('No matches');
        expect(first.onCancel).toHaveBeenCalledWith(':zz');

        const second = mountDraft();
        await second.type('sm');
        second.press('Escape');
        expect(second.onCancel).toHaveBeenCalledWith(':sm');
    });

    it('takes the colon away on Backspace with nothing typed', () => {
        const { press, onRemove, onCancel } = mountDraft();

        press('Backspace');

        expect(onRemove).toHaveBeenCalledOnce();
        expect(onCancel).not.toHaveBeenCalled();
    });
});
