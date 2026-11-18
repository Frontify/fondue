/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { textStyleContent, textStylePlugin } from './TextStyle';

describe('the text style plugin presets', () => {
    it('sets a custom property for each field of a preset the host looks', () => {
        const plugin = textStylePlugin({ presets: { heading1: { fontSize: 'var(--f-h1)' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-heading1-font-size': 'var(--f-h1)' });
    });

    it('names the properties of every preset it is given', () => {
        const plugin = textStylePlugin({
            presets: { heading1: { color: 'red' }, imageCaption: { color: 'blue' } },
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-heading1-color': 'red',
            '--rte-image-caption-color': 'blue',
        });
    });

    it('shares the default content when there are no presets', () => {
        expect(textStylePlugin().content).toBe(textStyleContent());
    });

    it('sets a custom property for the body, quote and link looks', () => {
        const plugin = textStylePlugin({
            presets: {
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
        expect(() => textStylePlugin({ presets: { link: { color: 'red; display: none' } } })).toThrow(
            /"color".*"link"/,
        );
    });

    it('carries the body look of a plugin that offers no styles, and adds nothing else', () => {
        const plugin = textStylePlugin({ styles: [], presets: { body: { fontSize: '16px' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-body-font-size': '16px' });
        expect(plugin.content?.blocks?.textStyle?.parse).toEqual([]);
        expect(plugin.toolbar).toEqual([]);
        expect(plugin.commands).toEqual([]);
        expect(plugin.hotkeys).toEqual({});
        expect(plugin.inputRules).toEqual([]);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => textStylePlugin({ presets: { heading1: { color: 'red; display: none' } } })).toThrow(
            /"color".*"heading1"/,
        );
    });

    it('keeps the shared block when only presets differ, so it registers next to the default content', () => {
        const plugin = textStylePlugin({ presets: { heading1: { color: 'red' } } });

        expect(plugin.content?.blocks?.textStyle).toBe(textStyleContent().blocks?.textStyle);
        expect(() => buildPluginRegistry([textStyleContent(), plugin])).not.toThrow();
    });
});

describe('the text style content', () => {
    it('hands out one shared content when given no presets', () => {
        expect(textStyleContent()).toBe(textStyleContent({}));
    });

    it('carries the same looks as the plugin given the same presets', () => {
        const presets = { body: { fontSize: '16px' }, link: { color: 'blue' } };

        expect(textStyleContent({ presets })).toEqual(textStylePlugin({ presets }).content);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => textStyleContent({ presets: { quote: { color: 'red; display: none' } } })).toThrow(
            /"color".*"quote"/,
        );
    });
});
