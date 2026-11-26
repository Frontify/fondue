/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { mentionValueOf } from './helpers/mention';
import { mentionContent, mentionPlugin } from './Mention';
import { type MentionKind } from './types';

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const DESIGN = { id: 'design', username: 'design', name: 'Design team', kind: 'group' } as const;
const ALL = { id: 'all', username: 'all', name: 'Everyone', kind: 'all' } as const;

const ENGLISH_LABELS = { user: 'Unknown person', group: 'Unknown group', all: 'Unknown mention' } as const;
const GERMAN_LABELS = { user: 'Unbekannte Person', group: 'Unbekannte Gruppe', all: 'Unbekannte Erwähnung' } as const;

const RIGHT_TO_LEFT_OVERRIDE = String.fromCodePoint(0x202e);
const LEFT_TO_RIGHT_MARK = String.fromCodePoint(0x200e);

const mentionFor = (href?: string) =>
    mentionPlugin({ items: [JANE], href: href === undefined ? undefined : () => href }).content?.inlines?.mention;

describe('the mention inline', () => {
    it('links to the target the app gives', () => {
        expect(mentionFor('/users/jane')?.toHtml(JANE).attrs?.href).toBe('/users/jane');
    });

    it('leaves out a target that is not a safe link', () => {
        expect(mentionFor('javascript:alert(1)')?.toHtml(JANE).attrs?.href).toBeUndefined();
    });

    it('is text, not a link, with nowhere to link to', () => {
        const spec = mentionFor()?.toHtml(ALL);
        expect(spec?.tag).toBe('span');
        expect(spec?.attrs?.href).toBeUndefined();
        expect(spec?.children).toEqual([{ tag: 'bdi', children: '@all' }]);
        const noProfile = mentionPlugin({ items: [], href: (m) => (m.kind === 'all' ? undefined : `/u/${m.id}`) });
        expect(noProfile.content?.inlines?.mention?.toHtml(ALL).tag).toBe('span');
        expect(noProfile.content?.inlines?.mention?.toHtml(JANE).tag).toBe('a');
    });

    it('marks a group or everyone, and leaves a person as before kinds existed', () => {
        expect(mentionFor('/u')?.toHtml(DESIGN).attrs?.['data-mention-kind']).toBe('group');
        expect(mentionFor('/u')?.toHtml(JANE).attrs?.['data-mention-kind']).toBeUndefined();
    });

    it('keeps no avatar and no person kind in the document', () => {
        expect(mentionValueOf({ ...JANE, kind: 'user', image: '/jane.png' })).toEqual(JANE);
        expect(mentionValueOf({ ...DESIGN, image: '/design.png' })).toEqual(DESIGN);
    });

    it('refuses a trigger that is not one character, in the content too', () => {
        expect(() => mentionContent({ trigger: '@@' })).toThrow(/exactly one character/);
    });

    it('isolates the label so a right-to-left name cannot reorder the text around it', () => {
        expect(mentionFor('/u')?.toHtml(JANE).children).toEqual([{ tag: 'bdi', children: '@jane' }]);
    });
});

describe('a stored mention that is missing a field', () => {
    // Stored documents are not validated, so a field can be missing or the wrong type.
    const wrongType = { id: 'x', username: 7, name: 'X', kind: 7 } as unknown as typeof JANE;

    it('is exported without throwing, named by its kind and with no kind attribute', () => {
        const mention = mentionFor();

        expect(() => mention?.toHtml(wrongType)).not.toThrow();
        expect(mention?.toHtml(wrongType).children).toEqual([{ tag: 'bdi', children: 'Unknown person' }]);
        expect(mention?.toHtml(wrongType).attrs?.['data-mention-kind']).toBeUndefined();
    });
});

describe('the labels for a stored mention with no username', () => {
    const emptyOf = (kind: MentionKind) => ({ id: 'x', username: '', name: '', kind });
    const labelsIn = (mention: ReturnType<typeof mentionFor>) => ({
        user: mention?.toHtml(emptyOf('user')).children,
        group: mention?.toHtml(emptyOf('group')).children,
        all: mention?.toHtml(emptyOf('all')).children,
    });
    const shown = (label: string) => [{ tag: 'bdi', children: label }];

    it('are the ones the host gave to mentionContent, one per kind', () => {
        const labels = labelsIn(mentionContent({ unknownLabels: GERMAN_LABELS }).inlines?.mention);

        expect(labels).toEqual({
            user: shown(GERMAN_LABELS.user),
            group: shown(GERMAN_LABELS.group),
            all: shown(GERMAN_LABELS.all),
        });
    });

    it('keep their English label for a kind the host left out', () => {
        const labels = labelsIn(mentionContent({ unknownLabels: { group: GERMAN_LABELS.group } }).inlines?.mention);

        expect(labels).toEqual({
            user: shown(ENGLISH_LABELS.user),
            group: shown(GERMAN_LABELS.group),
            all: shown(ENGLISH_LABELS.all),
        });
    });

    it('refuse a blank label, in the content too', () => {
        expect(() => mentionContent({ unknownLabels: { group: '' } })).toThrow(/unknownLabels\.group/);
        expect(() => mentionPlugin({ items: [JANE], unknownLabels: { user: '   ' } })).toThrow(/unknownLabels\.user/);
        expect(() => mentionContent({ unknownLabels: { all: RIGHT_TO_LEFT_OVERRIDE } })).toThrow(/unknownLabels\.all/);
        expect(() => mentionContent({ unknownLabels: { user: LEFT_TO_RIGHT_MARK } })).toThrow(/unknownLabels\.user/);
    });

    it('are the ones the host gave to mentionPlugin', () => {
        const labels = labelsIn(
            mentionPlugin({ items: [JANE], unknownLabels: GERMAN_LABELS }).content?.inlines?.mention,
        );

        expect(labels).toEqual({
            user: shown(GERMAN_LABELS.user),
            group: shown(GERMAN_LABELS.group),
            all: shown(GERMAN_LABELS.all),
        });
    });
});
