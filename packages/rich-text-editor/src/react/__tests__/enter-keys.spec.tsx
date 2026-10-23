/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { type Snapshot } from '#/persistence/types';
import { runtimeOf } from '#/runtime/runtime';
import { typeText } from '#/testing';

import { mountProfile } from './fixtures/profiles';

type Mounted = Awaited<ReturnType<typeof mountProfile>>;

const MAC = /Mac|iP(hone|[oa]d)/.test(navigator.platform);
const KEYS = {
    Enter: {},
    'Shift+Enter': { shiftKey: true },
    'Mod+Enter': { ctrlKey: !MAC, metaKey: MAC },
} as const;

/** Presses `key` at the surface and returns the event, as a host `keydown` listener on the document reads it. */
const press = ({ view }: Mounted, key: keyof typeof KEYS, init: KeyboardEventInit = {}) => {
    const eventInit: KeyboardEventInit = { key: 'Enter', bubbles: true, cancelable: true, ...KEYS[key] };
    Object.assign(eventInit, init);
    const event = new KeyboardEvent('keydown', eventInit);
    let reached: boolean | undefined;
    const host = (heard: KeyboardEvent) => {
        reached = heard.defaultPrevented;
    };
    document.addEventListener('keydown', host);
    act(() => {
        view.dom.dispatchEvent(event);
    });
    document.removeEventListener('keydown', host);
    return { event, prevented: reached };
};

/** A `profile` editor whose policy is then set to `enterBehavior`, holding `hi`. */
const withEnter = async (profile: 'inline' | 'comment', enterBehavior: 'none' | 'submit') => {
    const mounted = await mountProfile(profile);
    const runtime = runtimeOf(mounted.handle);
    if (runtime === undefined) {
        throw new Error('no session');
    }
    act(() => {
        mounted.handle.updatePolicy({ ...runtime.policy, enterBehavior });
        typeText(mounted.handle, 'hi');
    });
    return mounted;
};

describe('Enter in the Inline profile with enterBehavior none', () => {
    it.each(Object.keys(KEYS) as (keyof typeof KEYS)[])(
        'lets %s reach the host unprevented and keeps the document',
        async (key) => {
            const mounted = await withEnter('inline', 'none');
            const before = mounted.content();

            const { prevented } = press(mounted, key);

            expect(prevented).toBe(false);
            expect(mounted.content()).toEqual(before);
        },
    );

    it.each(['insertParagraph', 'insertLineBreak'])('cancels the %s input that follows the key', async (inputType) => {
        const mounted = await withEnter('inline', 'none');
        const before = mounted.content();
        const event = new InputEvent('beforeinput', { inputType, bubbles: true, cancelable: true });

        act(() => {
            mounted.view.dom.dispatchEvent(event);
        });

        expect(event.defaultPrevented).toBe(true);
        expect(mounted.content()).toEqual(before);
    });

    it('swallows the untrusted Enter that ProseMirror sends to handleKeyDown, so no command runs', async () => {
        const mounted = await withEnter('inline', 'none');
        const changes = vi.fn();
        mounted.handle.subscribe('documentChange', changes);
        const synthetic = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });

        let taken: unknown;
        act(() => {
            taken = mounted.view.someProp('handleKeyDown', (handle) => handle(mounted.view, synthetic));
        });

        expect(synthetic.isTrusted).not.toBe(true);
        expect(taken).toBe(true);
        expect(changes).not.toHaveBeenCalled();
        expect(mounted.view.state.doc.textContent).toBe('hi');
    });
});

describe('the submit keys', () => {
    it.each(Object.keys(KEYS) as (keyof typeof KEYS)[])(
        'submits the committed snapshot of an Inline field with %s and prevents the key',
        async (key) => {
            const onSubmit = vi.fn<(snapshot: Snapshot) => void>();
            const mounted = await mountProfile('inline', { onSubmit });
            act(() => typeText(mounted.handle, 'hi'));

            const { prevented } = press(mounted, key);

            expect(prevented).toBe(true);
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0]?.[0]).toEqual(mounted.handle.getSnapshot());
        },
    );

    it('links a typed URL that the submitting Enter ends before the snapshot is submitted', async () => {
        const onSubmit = vi.fn<(snapshot: Snapshot) => void>();
        const mounted = await mountProfile('inline', { onSubmit });
        act(() => typeText(mounted.handle, 'https://frontify.com'));

        press(mounted, 'Enter');

        expect(onSubmit.mock.calls[0]?.[0].document.content.content).toMatchObject([
            {
                type: 'paragraph',
                content: [
                    {
                        text: 'https://frontify.com',
                        marks: [{ type: 'link', attrs: { href: 'https://frontify.com' } }],
                    },
                ],
            },
        ]);
    });

    it('announces why a required empty field does not submit', async () => {
        const onSubmit = vi.fn();
        const mounted = await mountProfile('inline', { onSubmit, required: true });

        press(mounted, 'Enter');

        expect(onSubmit).not.toHaveBeenCalled();
        expect(mounted.announced()).toBe('Enter some text before you submit.');
    });

    it('submits a comment with Mod+Enter, while Enter adds a paragraph', async () => {
        const onSubmit = vi.fn();
        const mounted = await mountProfile('comment', { onSubmit });
        act(() => typeText(mounted.handle, 'hi'));

        press(mounted, 'Enter');

        expect(onSubmit).not.toHaveBeenCalled();
        expect(mounted.content()).toHaveLength(2);

        press(mounted, 'Mod+Enter');

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('runs Shift+Enter as Enter in a comment whose policy makes Enter submit, with no onSubmit too', async () => {
        const mounted = await withEnter('comment', 'submit');

        press(mounted, 'Shift+Enter');

        expect(mounted.content()).toHaveLength(2);
    });

    it('submits a comment whose policy makes Enter submit from an Enter that reaches only handleDOMEvents, as Chrome on Android sends it', async () => {
        const onSubmit = vi.fn();
        const mounted = await mountProfile('comment', { onSubmit });
        const runtime = runtimeOf(mounted.handle);
        if (runtime === undefined) {
            throw new Error('no session');
        }
        act(() => {
            mounted.handle.updatePolicy({ ...runtime.policy, enterBehavior: 'submit' });
            typeText(mounted.handle, 'hi');
        });
        const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true, cancelable: true });

        act(() => {
            mounted.view.someProp('handleDOMEvents', (handlers) => handlers.keydown?.(mounted.view, event));
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(event.defaultPrevented).toBe(true);
        expect(mounted.content()).toHaveLength(1);
    });

    it('leaves a submit key to the browser while a composition runs', async () => {
        const onSubmit = vi.fn();
        const mounted = await mountProfile('comment', { onSubmit });

        press(mounted, 'Mod+Enter', { isComposing: true });

        expect(onSubmit).not.toHaveBeenCalled();
    });
});
