/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { align } from '#/features/blocksAlign/feature';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection } from '#/testing';

const model = textModel([...textFeatures(), align()]);

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

// The Shortcuts table: Mod+Shift+L, E, R and J. A browser reports the shifted letter in upper case with its key code.
const ROWS = [
    { value: 'left', key: 'L', keyCode: 76 },
    { value: 'center', key: 'E', keyCode: 69 },
    { value: 'right', key: 'R', keyCode: 82 },
    { value: 'justify', key: 'J', keyCode: 74 },
] as const;

describe('alignment shortcuts', () => {
    for (const apple of [true, false]) {
        let platform = 'other';
        if (apple) {
            platform = 'Apple';
        }
        for (const { value, key, keyCode } of ROWS) {
            it(`runs block.align.set ${value} with the ${platform} keys, and not with the other platform's`, () => {
                onPlatform(apple);
                const run = (meta: boolean, ctrl: boolean) => {
                    const mounted = mountText({ model, blocks: [para(text('one'))] });
                    setSelection(mounted.handle, { text: 'one', from: 1, to: 1 });
                    mounted.view.dom.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key,
                            keyCode,
                            metaKey: meta,
                            ctrlKey: ctrl,
                            shiftKey: true,
                            bubbles: true,
                            cancelable: true,
                        }),
                    );
                    const first = mounted.handle.getSnapshot().document.content.content?.[0];
                    const attrs = first?.attrs;
                    const aligned = attrs?.align;
                    const ran = mounted.changes.map(({ commandId }) => commandId);
                    mounted.unmount();
                    return { aligned, ran };
                };

                const own = run(apple, !apple);
                const foreign = run(!apple, apple);

                expect(own).toEqual({ aligned: value, ran: ['block.align.set'] });
                expect(foreign.ran).toEqual([]);
            });
        }
    }
});
