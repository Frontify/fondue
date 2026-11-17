/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type MentionValue } from '../types';

import { mentionAttributes, mentionDisplay } from './display';

const JANE: MentionValue = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const href = (mention: MentionValue): string => `/u/${mention.id}`;

describe('mentionDisplay', () => {
    it('shows the stored username after the trigger, linking to the stored id', () => {
        expect(mentionDisplay(JANE, { href, trigger: '#' })).toEqual({
            status: 'linked',
            label: '#jane',
            title: 'Jane Doe',
            href: '/u/jane',
        });
    });

    it('is text without a target, and leaves out a target that is not a safe link', () => {
        expect(mentionDisplay(JANE, { trigger: '@' }).status).toBe('text');
        expect(mentionDisplay(JANE, { trigger: '@', href: () => undefined }).status).toBe('text');
        expect(mentionDisplay(JANE, { trigger: '@', href: () => 'javascript:alert(1)' }).status).toBe('text');
    });

    it('removes control and bidirectional characters from what it shows', () => {
        const dirty = { id: 'x', username: 'a\u202Eb\u001B', name: 'N\u2066ame' };

        expect(mentionDisplay(dirty, { trigger: '@' })).toMatchObject({ label: '@ab', title: 'Name' });
    });

    it('names an empty stored username by its kind instead of a bare trigger', () => {
        const empty: MentionValue = { id: 'x', username: '', name: '' };

        expect(mentionDisplay(empty, { trigger: '@' }).label).toBe('Unknown person');
        expect(mentionDisplay({ ...empty, kind: 'group' }, { trigger: '@' }).label).toBe('Unknown group');
        expect(mentionDisplay({ ...empty, kind: 'all' }, { trigger: '@' }).label).toBe('Unknown mention');
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
