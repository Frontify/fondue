/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { type MentionResolve, type MentionValue } from '../types';

import { mentionAttributes, mentionDisplay } from './display';
import { DEFAULT_MENTION_CONTENT_LABELS } from './labels';

const JANE: MentionValue = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const href = (mention: MentionValue): string => `/u/${mention.id}`;

describe('mentionDisplay', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows the stored value with no resolver, or one that does not know', () => {
        const stored = { status: 'linked', label: '@jane', title: 'Jane Doe', href: '/u/jane' };

        expect(mentionDisplay(JANE, { href, trigger: '@' })).toEqual(stored);
        expect(mentionDisplay(JANE, { href, trigger: '@', resolve: () => ({ status: 'unknown' }) })).toEqual(stored);
    });

    it('shows the current username and name, linking to the stored id', () => {
        const resolve = () => ({ status: 'current', username: 'jane.s', name: 'Jane Smith' }) as const;

        expect(mentionDisplay(JANE, { href, trigger: '#', resolve })).toEqual({
            status: 'linked',
            label: '#jane.s',
            title: 'Jane Smith',
            href: '/u/jane',
        });
    });

    it('shows the stored username as unavailable, with its stored name and no link', () => {
        expect(mentionDisplay(JANE, { href, trigger: '@', resolve: () => ({ status: 'unavailable' }) })).toEqual({
            status: 'unavailable',
            label: '@jane',
            note: '(unavailable)',
            title: 'Jane Doe',
        });
    });

    it('is text without a target, and leaves out a target that is not a safe link', () => {
        expect(mentionDisplay(JANE, { trigger: '@' }).status).toBe('text');
        expect(mentionDisplay(JANE, { trigger: '@', href: () => undefined }).status).toBe('text');
        expect(mentionDisplay(JANE, { trigger: '@', href: () => 'javascript:alert(1)' }).status).toBe('text');
    });

    it('removes control and bidirectional characters from what it shows, stored or resolved', () => {
        const dirty = { id: 'x', username: 'a\u202Eb\u001B', name: 'N\u2066ame' };

        expect(mentionDisplay(dirty, { trigger: '@' })).toMatchObject({ label: '@ab', title: 'Name' });
        expect(
            mentionDisplay(dirty, {
                trigger: '@',
                resolve: () => ({ status: 'current', username: 'c\u202Ad', name: 'E\u0007f' }),
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

    it('does not catch a resolver that throws, so the error reaches the app', () => {
        const resolve = () => {
            throw new Error('offline');
        };

        expect(() => mentionDisplay(JANE, { href, trigger: '@', resolve })).toThrow('offline');
    });

    it('shows the stored value for a resolver answer with no known status', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        // A resolver written in JS can answer anything.
        const resolve = (() => ({ status: 'renamed' })) as unknown as MentionResolve;

        expect(mentionDisplay({ ...JANE, id: 'odd' }, { trigger: '@', resolve }).label).toBe('@jane');
        expect(warn).toHaveBeenCalledOnce();
    });

    it('says the note of an unavailable mention, and names an empty username, in the labels it is given', () => {
        const labels = {
            ...DEFAULT_MENTION_CONTENT_LABELS,
            unavailable: '(indisponible)',
            unknownPerson: 'Personne inconnue',
            unknownGroup: 'Groupe inconnu',
            unknownMention: 'Mention inconnue',
        };
        const empty: MentionValue = { id: 'x', username: '', name: '' };

        expect(
            mentionDisplay(JANE, { trigger: '@', labels, resolve: () => ({ status: 'unavailable' }) }),
        ).toMatchObject({
            status: 'unavailable',
            note: '(indisponible)',
        });
        expect(mentionDisplay(empty, { trigger: '@', labels }).label).toBe('Personne inconnue');
        expect(mentionDisplay({ ...empty, kind: 'group' }, { trigger: '@', labels }).label).toBe('Groupe inconnu');
        expect(mentionDisplay({ ...empty, kind: 'all' }, { trigger: '@', labels }).label).toBe('Mention inconnue');
    });

    it('names an empty stored username by its kind instead of a bare trigger', () => {
        const empty: MentionValue = { id: 'x', username: '', name: '' };

        expect(mentionDisplay(empty, { trigger: '@' }).label).toBe('Unknown person');
        expect(mentionDisplay({ ...empty, kind: 'group' }, { trigger: '@' }).label).toBe('Unknown group');
        expect(mentionDisplay(empty, { trigger: '@', resolve: () => ({ status: 'unavailable' }) }).label).toBe(
            'Unknown person',
        );
    });

    // Stored documents are not validated, so a field can be missing or the wrong type.
    it('shows the username alone when the stored mention has no name', () => {
        const noName = { id: 'x', username: 'x' } as unknown as MentionValue;

        expect(mentionDisplay(noName, { trigger: '@' })).toMatchObject({ label: '@x', title: '' });
    });

    it('names a stored username that is not text by its kind, without throwing', () => {
        const wrongType = { id: 'x', username: 7, name: 'X' } as unknown as MentionValue;

        expect(mentionDisplay(wrongType, { trigger: '@' }).label).toBe('Unknown person');
    });

    it('writes no kind attribute for a stored kind this version does not know', () => {
        const wrongKind = { ...JANE, kind: 7 } as unknown as MentionValue;

        expect(mentionAttributes(wrongKind)['data-mention-kind']).toBeUndefined();
        expect(mentionAttributes({ ...JANE, kind: 'group' })['data-mention-kind']).toBe('group');
    });
});
