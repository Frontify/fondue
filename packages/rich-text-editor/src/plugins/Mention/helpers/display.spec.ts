/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type MentionValue } from '../types';

import { mentionAttributes, mentionDisplay, resolvedUnknownLabels } from './display';

const RIGHT_TO_LEFT_OVERRIDE = String.fromCodePoint(0x202e);
const JANE: MentionValue = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const href = (mention: MentionValue): string => `/u/${mention.id}`;
const ENGLISH_LABELS = { user: 'Unknown person', group: 'Unknown group', all: 'Unknown mention' } as const;
const GERMAN_LABELS = { user: 'Unbekannte Person', group: 'Unbekannte Gruppe', all: 'Unbekannte Erwähnung' } as const;

describe('mentionDisplay', () => {
    it('shows the stored username after the trigger, linking to the stored id', () => {
        expect(mentionDisplay(JANE, { href, trigger: '#', unknownLabels: ENGLISH_LABELS })).toEqual({
            label: '#jane',
            title: 'Jane Doe',
            href: '/u/jane',
        });
    });

    it('has no target without one, and leaves out a target that is not a safe link', () => {
        expect(mentionDisplay(JANE, { trigger: '@', unknownLabels: ENGLISH_LABELS }).href).toBeUndefined();
        expect(
            mentionDisplay(JANE, { trigger: '@', unknownLabels: ENGLISH_LABELS, href: () => undefined }).href,
        ).toBeUndefined();
        expect(
            mentionDisplay(JANE, { trigger: '@', unknownLabels: ENGLISH_LABELS, href: () => 'javascript:alert(1)' })
                .href,
        ).toBeUndefined();
    });

    it('removes control and bidirectional characters from what it shows', () => {
        const dirty = { id: 'x', username: 'a\u202Eb\u001B', name: 'N\u2066ame' };

        expect(mentionDisplay(dirty, { trigger: '@', unknownLabels: ENGLISH_LABELS })).toMatchObject({
            label: '@ab',
            title: 'Name',
        });
    });

    it('names an empty stored username by its kind instead of a bare trigger', () => {
        const empty: MentionValue = { id: 'x', username: '', name: '' };

        expect(mentionDisplay(empty, { trigger: '@', unknownLabels: ENGLISH_LABELS }).label).toBe('Unknown person');
        expect(mentionDisplay({ ...empty, kind: 'group' }, { trigger: '@', unknownLabels: ENGLISH_LABELS }).label).toBe(
            'Unknown group',
        );
        expect(mentionDisplay({ ...empty, kind: 'all' }, { trigger: '@', unknownLabels: ENGLISH_LABELS }).label).toBe(
            'Unknown mention',
        );
    });

    it('shows the label given for the kind of a mention with an empty username', () => {
        const empty: MentionValue = { id: 'x', username: '', name: '' };
        const labelOf = (mention: MentionValue): string =>
            mentionDisplay(mention, { trigger: '@', unknownLabels: GERMAN_LABELS }).label;

        expect(labelOf({ ...empty, kind: 'user' })).toBe(GERMAN_LABELS.user);
        expect(labelOf({ ...empty, kind: 'group' })).toBe(GERMAN_LABELS.group);
        expect(labelOf({ ...empty, kind: 'all' })).toBe(GERMAN_LABELS.all);
        expect(labelOf(empty)).toBe(GERMAN_LABELS.user);
    });

    // Stored documents are not validated, so a field can be missing or the wrong type.
    it('shows the username alone when the stored mention has no name', () => {
        const noName = { id: 'x', username: 'x' } as unknown as MentionValue;

        expect(mentionDisplay(noName, { trigger: '@', unknownLabels: ENGLISH_LABELS })).toMatchObject({
            label: '@x',
            title: '',
        });
    });

    it('names a stored username that is not text by its kind, without throwing', () => {
        const wrongType = { id: 'x', username: 7, name: 'X' } as unknown as MentionValue;

        expect(mentionDisplay(wrongType, { trigger: '@', unknownLabels: ENGLISH_LABELS }).label).toBe('Unknown person');
    });

    it('writes no kind attribute for a stored kind this version does not know', () => {
        const wrongKind = { ...JANE, kind: 7 } as unknown as MentionValue;

        expect(mentionAttributes(wrongKind)['data-mention-kind']).toBeUndefined();
        expect(mentionAttributes({ ...JANE, kind: 'group' })['data-mention-kind']).toBe('group');
    });

    it('strips control characters from a label the host gave', () => {
        expect(resolvedUnknownLabels({ user: `Unbekannt${RIGHT_TO_LEFT_OVERRIDE}` }).user).toBe('Unbekannt');
    });
});
