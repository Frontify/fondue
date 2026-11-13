/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { quoteContent, quotePlugin } from './Quote';

describe('the quote plugin look', () => {
    it('sets a custom property for each field the host looks', () => {
        const plugin = quotePlugin({ look: { color: 'red', fontSize: '18px' } });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-quote-color': 'red',
            '--rte-quote-font-size': '18px',
        });
    });

    it('sets nothing without a look', () => {
        expect(quoteContent().contentProperties).toEqual({});
        expect(quotePlugin().content?.contentProperties).toEqual({});
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => quotePlugin({ look: { color: 'red; display: none' } })).toThrow(/"color".*"quote"/);
    });

    it('registers next to the default content, which shares its block', () => {
        expect(() => buildPluginRegistry([quoteContent(), quotePlugin({ look: { color: 'red' } })])).not.toThrow();
    });

    it('writes its own margins, so the document leaves them alone', () => {
        const registry = buildPluginRegistry([quoteContent()]);
        const definition = registry.blocks.get('quote');

        expect(definition?.ownsMargins).toBe(true);
    });
});
