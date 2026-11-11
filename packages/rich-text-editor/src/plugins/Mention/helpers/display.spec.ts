/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type MentionResolve, type MentionValue } from '../types';

import { mentionDisplay } from './display';

const JANE: MentionValue = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const href = (mention: MentionValue): string => `/u/${mention.id}`;

describe('mentionDisplay', () => {
    it('shows the stored value with no resolver, or one that does not know', () => {
        const stored = { label: '@jane', title: 'Jane Doe', href: '/u/jane' };

        expect(mentionDisplay(JANE, { href, trigger: '@' })).toEqual(stored);
        expect(mentionDisplay(JANE, { href, trigger: '@', resolve: () => ({ status: 'unknown' }) })).toEqual(stored);
    });

    it('shows the current username and name, linking to the stored id', () => {
        const resolve = () => ({ status: 'current', username: 'jane.s', name: 'Jane Smith' }) as const;

        expect(mentionDisplay(JANE, { href, trigger: '#', resolve })).toEqual({
            label: '#jane.s',
            title: 'Jane Smith',
            href: '/u/jane',
        });
    });

    it('shows the stored username as unavailable, with its stored name and no link', () => {
        expect(mentionDisplay(JANE, { href, trigger: '@', resolve: () => ({ status: 'unavailable' }) })).toEqual({
            label: '@jane (unavailable)',
            title: 'Jane Doe',
            href: undefined,
        });
    });

    it('is text without a target, and leaves out a target that is not a safe link', () => {
        expect(mentionDisplay(JANE, { trigger: '@' }).href).toBeUndefined();
        expect(mentionDisplay(JANE, { trigger: '@', href: () => undefined }).href).toBeUndefined();
        expect(mentionDisplay(JANE, { trigger: '@', href: () => 'javascript:alert(1)' }).href).toBeUndefined();
    });

    it('removes control and bidirectional characters from what it shows, stored or resolved', () => {
        const dirty = { id: 'x', username: 'a\u202Eb\u001B', name: 'N\u2066ame\u200F' };

        expect(mentionDisplay(dirty, { trigger: '@' })).toMatchObject({ label: '@ab', title: 'Name' });
        expect(
            mentionDisplay(dirty, {
                trigger: '@',
                resolve: () => ({ status: 'current', username: 'c\u061Cd', name: 'E\u0007f' }),
            }),
        ).toMatchObject({ label: '@cd', title: 'Ef' });
    });

    it('keeps the stored value when the current username is empty once cleaned', () => {
        expect(
            mentionDisplay(JANE, {
                trigger: '@',
                resolve: () => ({ status: 'current', username: '\u202E', name: 'X' }),
            }),
        ).toMatchObject({ label: '@jane', title: 'Jane Doe' });
    });

    it('shows the stored value only for a mention whose resolver throws, and still resolves the others', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const john: MentionValue = { id: 'john', username: 'john', name: 'John Roe' };
        const resolve = (mention: MentionValue) => {
            if (mention.id === 'jane') {
                throw new Error('offline');
            }
            return { status: 'current', username: 'john.r', name: 'John Roe' } as const;
        };

        expect(mentionDisplay(JANE, { href, trigger: '@', resolve })).toEqual({
            label: '@jane',
            title: 'Jane Doe',
            href: '/u/jane',
        });
        expect(mentionDisplay(john, { href, trigger: '@', resolve }).label).toBe('@john.r');
        expect(warn).toHaveBeenCalledOnce();
        warn.mockRestore();
    });

    it('shows the stored value for a resolver answer with no known status', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        // A resolver written in JS can answer anything.
        const resolve = (() => ({ status: 'renamed' })) as unknown as MentionResolve;

        expect(mentionDisplay({ ...JANE, id: 'odd' }, { trigger: '@', resolve }).label).toBe('@jane');
        expect(warn).toHaveBeenCalledOnce();
        warn.mockRestore();
    });

    it('names an empty stored username by its kind instead of a bare trigger', () => {
        const empty: MentionValue = { id: 'x', username: '', name: '' };

        expect(mentionDisplay(empty, { trigger: '@' }).label).toBe('Unknown person');
        expect(mentionDisplay({ ...empty, kind: 'group' }, { trigger: '@' }).label).toBe('Unknown group');
        expect(mentionDisplay(empty, { trigger: '@', resolve: () => ({ status: 'unavailable' }) }).label).toBe(
            'Unknown person (unavailable)',
        );
    });
});
