/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { mentionValueOf } from './helpers/mention';
import { mentionContent, mentionPlugin } from './Mention';

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const DESIGN = { id: 'design', username: 'design', name: 'Design team', kind: 'group' } as const;
const ALL = { id: 'all', username: 'all', name: 'Everyone', kind: 'all' } as const;

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
        expect(spec?.children).toBe('@all');
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
});
