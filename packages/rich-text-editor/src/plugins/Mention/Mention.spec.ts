/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { mentionContent, mentionPlugin, mentionValueOf } from './Mention';

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const DESIGN = { id: 'design', username: 'design', name: 'Design team', kind: 'group' } as const;
const ALL = { id: 'all', username: 'all', name: 'Everyone', kind: 'all' } as const;

const mentionFor = (href?: string) =>
    mentionPlugin({ items: [JANE], href: href === undefined ? undefined : () => href }).content?.inlines?.mention;

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

    it('shows the current username and name where the app resolves one, and stores the old ones in the data', () => {
        const content = mentionContent({
            href: (mention) => `/u/${mention.id}`,
            resolve: () => ({ status: 'current', username: 'jane.s', name: 'Jane Smith' }),
        });
        const spec = content.inlines?.mention?.toHtml(JANE);

        expect(spec).toMatchObject({
            tag: 'a',
            attrs: { href: '/u/jane', title: 'Jane Smith', 'data-mention-username': 'jane' },
            children: [{ tag: 'bdi', children: '@jane.s' }],
        });
    });

    it('pastes back the stored name, never the one shown', () => {
        const content = mentionContent({
            href: (mention) => `/u/${mention.id}`,
            resolve: () => ({ status: 'current', username: 'jane', name: 'Jane Smith' }),
        });
        const attrs = content.inlines?.mention?.toHtml(JANE).attrs;

        expect(attrs).toMatchObject({ title: 'Jane Smith', 'data-mention-name': 'Jane Doe' });
        expect(
            parse(
                `<a href="/u/jane" title="${attrs?.title}" data-mention-id="jane" data-mention-username="jane" data-mention-name="${attrs?.['data-mention-name']}">@jane</a>`,
            ),
        ).toEqual(JANE);
    });

    it('marks a deleted or forbidden person unavailable, with the stored name and no link', () => {
        const content = mentionContent({
            href: (mention) => `/u/${mention.id}`,
            resolve: () => ({ status: 'unavailable', reason: 'deleted' }),
        });
        const spec = content.inlines?.mention?.toHtml(JANE);

        expect(spec?.tag).toBe('span');
        expect(spec?.attrs).toMatchObject({ href: undefined, title: 'Jane Doe', 'data-mention-id': 'jane' });
        expect(spec?.children).toEqual([{ tag: 'bdi', children: '@jane (unavailable)' }]);
    });

    it('shows the stored value where the app does not know the person', () => {
        const unknown = mentionContent({ href: () => '/u', resolve: () => ({ status: 'unknown' }) });
        const none = mentionContent({ href: () => '/u' });

        expect(unknown.inlines?.mention?.toHtml(JANE)).toEqual(none.inlines?.mention?.toHtml(JANE));
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
