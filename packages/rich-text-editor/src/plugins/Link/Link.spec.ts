/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { linkPlugin } from './Link';

const link = linkPlugin().content?.marks?.link;

describe('the link mark', () => {
    it('writes a safe target', () => {
        expect(link?.toHtml({ href: 'https://example.com' }).attrs?.href).toBe('https://example.com');
    });

    it('writes no target for an unsafe or malformed one, without failing', () => {
        for (const value of [{ href: 'javascript:0/alert(1)' }, { href: 1 }, {}, true, null]) {
            const html = link?.toHtml(value as never);
            expect(html?.tag).toBe('a');
            expect(html?.attrs).not.toHaveProperty('href');
        }
    });

    it('writes no target the policy refuses, and no note for a same-tab link', () => {
        const restricted = linkPlugin({ allowedHosts: ['frontify.com'] }).content?.marks?.link;

        expect(restricted?.toHtml({ href: 'https://example.com' }).attrs).not.toHaveProperty('href');
        expect(restricted?.toHtml({ href: 'https://frontify.com' }).attrs?.href).toBe('https://frontify.com');
        expect(link?.toHtml({ href: 'https://example.com' }).children).toBe(true);
    });

    it('writes no new-tab attributes and no note for a target the policy refuses', () => {
        const restricted = linkPlugin({ allowedHosts: ['frontify.com'] }).content?.marks?.link;
        const html = restricted?.toHtml({ href: 'https://example.com', openInNewTab: true });

        expect(html?.attrs).not.toHaveProperty('href');
        expect(html?.attrs).not.toHaveProperty('target');
        expect(html?.attrs).not.toHaveProperty('rel');
        expect(html?.children).toBe(true);
    });

    it('puts a hidden note after the text of a link that opens a new tab', () => {
        const html = link?.toHtml({ href: 'https://example.com', openInNewTab: true });

        const children = html?.children;
        if (typeof children !== 'object') {
            throw new TypeError('expected the text and a note');
        }
        expect(children).toHaveLength(2);
        expect(children[0]).toBe(true);
        expect(children[1]).toMatchObject({ tag: 'span', children: ' (opens in new tab)' });
    });
});
