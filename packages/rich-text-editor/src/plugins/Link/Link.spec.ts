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

    it('exports a link that opens a new tab with its target and rel and no text of its own', () => {
        const html = link?.toHtml({ href: 'https://example.com', openInNewTab: true });

        expect(html?.attrs).toMatchObject({ target: '_blank', rel: 'noopener noreferrer' });
        expect(html?.children).toBe(true);
    });
});
