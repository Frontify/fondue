/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { textStyleContent, textStylePlugin } from './TextStyle';

describe('the text style plugin looks', () => {
    it('sets a custom property for each field of a look the host sets', () => {
        const plugin = textStylePlugin({ looks: { heading1: { fontSize: 'var(--f-h1)' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-heading1-font-size': 'var(--f-h1)' });
    });

    it('names the properties of every look it is given', () => {
        const plugin = textStylePlugin({
            looks: { heading1: { color: 'red' }, imageCaption: { color: 'blue' } },
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-heading1-color': 'red',
            '--rte-image-caption-color': 'blue',
        });
    });

    it('shares the default content when there are no looks', () => {
        expect(textStylePlugin().content).toBe(textStyleContent);
    });

    it('sets a custom property for the body, quote and link looks', () => {
        const plugin = textStylePlugin({
            looks: {
                body: { fontSize: 'var(--f-body)' },
                quote: { color: 'blue' },
                link: { fontWeight: '600' },
            },
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-body-font-size': 'var(--f-body)',
            '--rte-quote-color': 'blue',
            '--rte-link-font-weight': '600',
        });
    });

    it('refuses a link value that could break out of its declaration', () => {
        expect(() => textStylePlugin({ looks: { link: { color: 'red; display: none' } } })).toThrow(/"color".*"link"/);
    });

    it('carries the body look of a plugin that offers no styles, and adds nothing else', () => {
        const plugin = textStylePlugin({ styles: [], looks: { body: { fontSize: '16px' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-body-font-size': '16px' });
        expect(plugin.content?.blocks?.textStyle?.parse).toEqual([]);
        expect(plugin.toolbar).toEqual([]);
        expect(plugin.commands).toEqual([]);
        expect(plugin.hotkeys).toEqual({});
        expect(plugin.inputRules).toEqual([]);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => textStylePlugin({ looks: { heading1: { color: 'red; display: none' } } })).toThrow(
            /"color".*"heading1"/,
        );
    });

    it('keeps the shared block when only looks differ, so it registers next to the default content', () => {
        const plugin = textStylePlugin({ looks: { heading1: { color: 'red' } } });

        expect(plugin.content?.blocks?.textStyle).toBe(textStyleContent.blocks?.textStyle);
        expect(() => buildPluginRegistry([textStyleContent, plugin])).not.toThrow();
    });
});
