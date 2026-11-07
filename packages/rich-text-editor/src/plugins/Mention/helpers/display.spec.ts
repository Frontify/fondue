/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type MentionValue } from '../types';

import { mentionDisplay } from './display';

const JANE: MentionValue = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const href = (mention: MentionValue): string => `/u/${mention.id}`;

describe('mentionDisplay', () => {
    it('shows the stored value with no resolver, or one that does not know', () => {
        const stored = { label: '@jane', title: 'Jane Doe', href: '/u/jane', unavailable: false };

        expect(mentionDisplay(JANE, { href, trigger: '@' })).toEqual(stored);
        expect(mentionDisplay(JANE, { href, trigger: '@', resolve: () => ({ status: 'unknown' }) })).toEqual(stored);
    });

    it('shows the current username and name, linking to the stored id', () => {
        const resolve = () => ({ status: 'current', username: 'jane.s', name: 'Jane Smith' }) as const;

        expect(mentionDisplay(JANE, { href, trigger: '#', resolve })).toEqual({
            label: '#jane.s',
            title: 'Jane Smith',
            href: '/u/jane',
            unavailable: false,
        });
    });

    it('shows the stored username as unavailable, with its stored name and no link', () => {
        for (const reason of ['deleted', 'forbidden'] as const) {
            expect(
                mentionDisplay(JANE, { href, trigger: '@', resolve: () => ({ status: 'unavailable', reason }) }),
            ).toEqual({ label: '@jane (unavailable)', title: 'Jane Doe', href: undefined, unavailable: true });
        }
    });

    it('is text without a target, and leaves out a target that is not a safe link', () => {
        expect(mentionDisplay(JANE, { trigger: '@' }).href).toBeUndefined();
        expect(mentionDisplay(JANE, { trigger: '@', href: () => undefined }).href).toBeUndefined();
        expect(mentionDisplay(JANE, { trigger: '@', href: () => 'javascript:alert(1)' }).href).toBeUndefined();
    });

    it('removes control and bidirectional characters from what it shows, stored or resolved', () => {
        const dirty = { id: 'x', username: 'a‮b\u001B', name: 'N⁦ame‏' };

        expect(mentionDisplay(dirty, { trigger: '@' })).toMatchObject({ label: '@ab', title: 'Name' });
        expect(
            mentionDisplay(dirty, {
                trigger: '@',
                resolve: () => ({ status: 'current', username: 'c؜d', name: 'E\u0007f' }),
            }),
        ).toMatchObject({ label: '@cd', title: 'Ef' });
    });

    it('keeps the stored value when the current username is empty once cleaned', () => {
        expect(
            mentionDisplay(JANE, { trigger: '@', resolve: () => ({ status: 'current', username: '‮', name: 'X' }) }),
        ).toMatchObject({ label: '@jane', title: 'Jane Doe' });
    });

    it('keeps the stored value when the resolver throws', () => {
        const resolve = (): never => {
            throw new Error('offline');
        };

        expect(mentionDisplay(JANE, { href, trigger: '@', resolve })).toMatchObject({
            label: '@jane',
            unavailable: false,
        });
    });
});
