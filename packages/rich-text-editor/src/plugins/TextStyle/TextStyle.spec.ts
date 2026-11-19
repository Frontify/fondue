/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry } from '#/core';

import { textStyleContent, textStylePlugin } from './TextStyle';

describe('the text style plugin looks', () => {
    it('sets a custom property for each field of a look the host sets', () => {
        const plugin = textStylePlugin({ look: { heading1: { fontSize: 'var(--f-h1)' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-heading1-font-size': 'var(--f-h1)' });
    });

    it('names the properties of every look it is given', () => {
        const plugin = textStylePlugin({
            look: { heading1: { color: 'red' }, imageCaption: { color: 'blue' } },
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-heading1-color': 'red',
            '--rte-image-caption-color': 'blue',
        });
    });

    it('shares the default content when there are no looks', () => {
        expect(textStylePlugin().content).toBe(textStyleContent());
    });

    it('sets a custom property for the body and quote looks', () => {
        const plugin = textStylePlugin({
            look: {
                body: { fontSize: 'var(--f-body)' },
                quote: { color: 'blue' },
            },
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-body-font-size': 'var(--f-body)',
            '--rte-quote-color': 'blue',
        });
    });

    it('carries the body look of a plugin that offers no styles, and adds nothing else', () => {
        const plugin = textStylePlugin({ styles: [], look: { body: { fontSize: '16px' } } });

        expect(plugin.content?.contentProperties).toEqual({ '--rte-body-font-size': '16px' });
        expect(plugin.content?.blocks?.textStyle?.parse).toEqual([]);
        expect(plugin.toolbar).toEqual([]);
        expect(plugin.commands).toEqual([]);
        expect(plugin.hotkeys).toEqual({});
        expect(plugin.inputRules).toEqual([]);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => textStylePlugin({ look: { heading1: { color: 'red; display: none' } } })).toThrow(
            /"color".*"heading1"/,
        );
    });

    it('keeps the shared block when only looks differ, so it registers next to the default content', () => {
        const plugin = textStylePlugin({ look: { heading1: { color: 'red' } } });

        expect(plugin.content?.blocks?.textStyle).toBe(textStyleContent().blocks?.textStyle);
        expect(() => buildPluginRegistry([textStyleContent(), plugin])).not.toThrow();
    });
});

describe('the text style content', () => {
    it('hands out one shared content when given no looks', () => {
        expect(textStyleContent()).toBe(textStyleContent({}));
    });

    it('carries the same looks as the plugin given the same looks', () => {
        const look = { body: { fontSize: '16px' }, quote: { color: 'blue' } };

        expect(textStyleContent({ look })).toEqual(textStylePlugin({ look }).content);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => textStyleContent({ look: { quote: { color: 'red; display: none' } } })).toThrow(
            /"color".*"quote"/,
        );
    });
});
