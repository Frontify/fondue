/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { paragraphContent, paragraphPlugin } from './Paragraph';

describe('the paragraph plugin look', () => {
    it('sets a custom property for each field the host looks', () => {
        const plugin = paragraphPlugin({ look: { fontSize: '18px', lineHeight: '1.6' } });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-body-font-size': '18px',
            '--rte-body-line-height': '1.6',
        });
    });

    it('sets nothing without a look', () => {
        expect(paragraphContent().contentProperties).toEqual({});
        expect(paragraphPlugin().content?.contentProperties).toEqual({});
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => paragraphPlugin({ look: { color: 'red; display: none' } })).toThrow(/"color".*"body"/);
    });

    it('registers next to the default content', () => {
        expect(() =>
            buildPluginRegistry([paragraphContent(), paragraphPlugin({ look: { color: 'red' } })]),
        ).not.toThrow();
    });
});
