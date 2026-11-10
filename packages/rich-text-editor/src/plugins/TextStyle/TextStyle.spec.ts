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
