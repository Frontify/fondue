/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { linkContent, linkPlugin } from './Link';

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
});

describe('the link plugin look', () => {
    it('sets a custom property for each field the host looks', () => {
        const plugin = linkPlugin({ look: { fontWeight: '600', color: 'red' } });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-link-font-weight': '600',
            '--rte-link-color': 'red',
        });
    });

    it('sets nothing without a look', () => {
        expect(linkContent().contentProperties).toEqual({});
        expect(linkPlugin().content?.contentProperties).toEqual({});
    });

    it('registers next to the default content, which shares its mark', () => {
        expect(() => buildPluginRegistry([linkContent(), linkPlugin({ look: { color: 'red' } })])).not.toThrow();
    });
});
