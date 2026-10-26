/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatClear } from '#/features/formatClear/feature';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection } from '#/testing';

const model = textModel([...textFeatures(), formatClear()]);

const onPlatform = (apple: boolean) => {
    let platform = 'Win32';
    if (apple) {
        platform = 'MacIntel';
    }

    vi.spyOn(navigator, 'platform', 'get').mockReturnValue(platform);
};

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('clear formatting shortcut', () => {
    for (const apple of [true, false]) {
        let platform = 'other';
        if (apple) {
            platform = 'Apple';
        }

        it(`runs format.inline.clear with the ${platform} keys, and not with the other platform's`, () => {
            onPlatform(apple);
            const run = (meta: boolean, ctrl: boolean) => {
                const mounted = mountText({ model, blocks: [para(text('one', 'bold'))] });
                setSelection(mounted.handle, { text: 'one' });
                mounted.view.dom.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: '\\',
                        metaKey: meta,
                        ctrlKey: ctrl,
                        bubbles: true,
                        cancelable: true,
                    }),
                );
                const block = mounted.handle.getSnapshot().document.content.content?.[0];
                const children = block?.content;
                const run = children?.[0];
                const marks = run?.marks;
                const ran = mounted.changes.map(({ commandId }) => commandId);
                mounted.unmount();

                return { marks, ran };
            };

            const own = run(apple, !apple);
            const foreign = run(!apple, apple);

            expect(own).toEqual({ marks: undefined, ran: ['format.inline.clear'] });
            expect(foreign.ran).toEqual([]);
        });
    }
});
