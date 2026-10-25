/* (c) Copyright Frontify Ltd., all rights reserved. */

import { screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { mountProfile } from './fixtures/profiles';

const coarse = (matches: boolean) =>
    vi.spyOn(window, 'matchMedia').mockImplementation(
        (query: string) =>
            ({
                matches: matches && query === '(pointer: coarse)',
                addEventListener: () => undefined,
                removeEventListener: () => undefined,
            }) as unknown as MediaQueryList,
    );

/** The labels of the fixed toolbar's first two buttons. */
const firstButtons = () =>
    within(screen.getByRole('toolbar', { name: 'Text formatting' }))
        .getAllByRole('button')
        .slice(0, 2)
        .map((button) => button.getAttribute('aria-label'));

afterEach(() => {
    vi.restoreAllMocks();
});

describe('the Inline and Comment toolbars on a touch device', () => {
    it.each(['inline', 'comment'] as const)('start the %s toolbar with undo and redo', async (profile) => {
        coarse(true);
        await mountProfile(profile);

        expect(firstButtons()).toEqual(['Undo', 'Redo']);
    });

    it.each(['inline', 'comment'] as const)('leave undo and redo out of the %s toolbar elsewhere', async (profile) => {
        coarse(false);
        await mountProfile(profile);

        expect(firstButtons()).toEqual(['Bold', 'Italic']);
    });
});
