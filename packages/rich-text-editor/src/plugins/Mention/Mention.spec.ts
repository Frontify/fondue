/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { mentionPlugin } from './Mention';

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };

const mentionFor = (href: string) => mentionPlugin({ items: [JANE], href: () => href }).inlines?.mention;

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

    it('reads a pasted mention back', () => {
        expect(
            parse('<a href="/u" title="Jane Doe" data-mention-id="jane" data-mention-username="jane">@jane</a>'),
        ).toEqual(JANE);
    });

    it('does not read a link without an id or a username as a mention', () => {
        expect(parse('<a href="/u" data-mention-id="" data-mention-username="jane">@jane</a>')).toBeNull();
        expect(parse('<a href="/u" data-mention-id="jane" data-mention-username="">@</a>')).toBeNull();
        expect(parse('<a href="/u" data-mention-id="jane">@</a>')).toBeNull();
    });
});
