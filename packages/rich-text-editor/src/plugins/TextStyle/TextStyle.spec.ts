/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { blockHtml, buildPluginRegistry, LOOK_MARGIN_FALLBACKS } from '#/core';

import { UNKNOWN_STYLE_CLASS_NAME } from './helpers/presets';
import { textStyleContent, textStylePlugin } from './TextStyle';

/** A style a newer version of the editor may write, which no preset here names. */
const NEWER_STYLE = 'heading9';

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
        expect(textStylePlugin().content).toBe(textStyleContent);
    });

    it('refuses a value that could break out of its declaration', () => {
        expect(() => textStylePlugin({ presets: { heading1: { color: 'red; display: none' } } })).toThrow(
            /"color".*"heading1"/,
        );
    });

    it('keeps the shared block when only presets differ, so it registers next to the default content', () => {
        const plugin = textStylePlugin({ presets: { heading1: { color: 'red' } } });

        expect(plugin.content?.blocks?.textStyle).toBe(textStyleContent.blocks?.textStyle);
        expect(() => buildPluginRegistry([textStyleContent, plugin])).not.toThrow();
    });
});

describe('a text style no preset names', () => {
    const registry = buildPluginRegistry([textStyleContent]);

    it('draws a paragraph with the class that spaces it like body text', () => {
        const definition = registry.blocks.get('textStyle');
        if (definition === undefined) {
            throw new Error('The text style content declares no textStyle block');
        }

        expect(blockHtml(registry, definition, { style: NEWER_STYLE })).toMatchObject({
            tag: 'p',
            attrs: { class: UNKNOWN_STYLE_CLASS_NAME },
        });
    });

    it('writes the margins every look falls back to for the inline export, and no other look', () => {
        if (UNKNOWN_STYLE_CLASS_NAME === undefined) {
            throw new Error('The text style stylesheet has no class for an unknown style');
        }

        expect(registry.contentStyles().classes[UNKNOWN_STYLE_CLASS_NAME]).toEqual(LOOK_MARGIN_FALLBACKS);
    });
});
