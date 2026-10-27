/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { mentionPlugin, mentionValueOf } from './Mention';

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const DESIGN = { id: 'design', username: 'design', name: 'Design team', kind: 'group' } as const;
const ALL = { id: 'all', username: 'all', name: 'Everyone', kind: 'all' } as const;

const mentionFor = (href?: string) =>
    mentionPlugin({ items: [JANE], href: href === undefined ? undefined : () => href }).inlines?.mention;

const parse = (html: string): unknown => {
    const element = document.createElement('div');
    element.innerHTML = html;
    return mentionFor('/u')?.parse[0]?.value?.(element.firstElementChild as HTMLElement);
};

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
        expect(noProfile.inlines?.mention?.toHtml(ALL).tag).toBe('span');
        expect(noProfile.inlines?.mention?.toHtml(JANE).tag).toBe('a');
    });

    it('marks a group or everyone, and leaves a person as before kinds existed', () => {
        expect(mentionFor('/u')?.toHtml(DESIGN).attrs?.['data-mention-kind']).toBe('group');
        expect(mentionFor('/u')?.toHtml(JANE).attrs?.['data-mention-kind']).toBeUndefined();
    });

    it('keeps no avatar and no person kind in the document', () => {
        expect(mentionValueOf({ ...JANE, kind: 'user', image: '/jane.png' })).toEqual(JANE);
        expect(mentionValueOf({ ...DESIGN, image: '/design.png' })).toEqual(DESIGN);
    });

    it('reads a pasted mention back', () => {
        expect(
            parse('<a href="/u" title="Jane Doe" data-mention-id="jane" data-mention-username="jane">@jane</a>'),
        ).toEqual(JANE);
    });

    it('reads a pasted mention with no link, and its kind', () => {
        expect(
            parse(
                '<span title="Everyone" data-mention-id="all" data-mention-username="all" data-mention-kind="all">@all</span>',
            ),
        ).toEqual(ALL);
        expect(
            parse(
                '<a href="/u" title="Design team" data-mention-id="design" data-mention-username="design" data-mention-kind="group">@design</a>',
            ),
        ).toEqual(DESIGN);
    });

    it('reads a kind it does not know as a person', () => {
        expect(
            parse(
                '<a href="/u" title="Jane Doe" data-mention-id="jane" data-mention-username="jane" data-mention-kind="robot">@jane</a>',
            ),
        ).toEqual(JANE);
    });

    it('does not read a link without an id or a username as a mention', () => {
        expect(parse('<a href="/u" data-mention-id="" data-mention-username="jane">@jane</a>')).toBeNull();
        expect(parse('<a href="/u" data-mention-id="jane" data-mention-username="">@</a>')).toBeNull();
        expect(parse('<a href="/u" data-mention-id="jane">@</a>')).toBeNull();
    });
});
