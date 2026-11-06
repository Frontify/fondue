/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock, defineContent, type RteContent } from '#/core';

import {
    ALL_TEXT_STYLES,
    findPreset,
    FIRST_PRESET,
    parseRuleFor,
    presetsFor,
    type TextStyleOption,
} from './helpers/presets';

// The block this plugin contributes; the package root assembles it into the
// official document union.
export type { TextStyleBlock } from './helpers/presets';

export type TextStylePluginOptions = {
    /** The styles the dropdown offers, in order. Include `'paragraph'` for the option that clears one. */
    styles?: readonly TextStyleOption[];
};

/**
 * The text block carrying a style. `styles` is also what pasted HTML may become:
 * an editor that does not offer `heading3` turns a pasted `h3` into a paragraph.
 * Rendering is not restricted the same way, so a document written by a
 * differently configured editor still displays as it was authored.
 */
export const textStyleContent = ({ styles: options = ALL_TEXT_STYLES }: TextStylePluginOptions = {}): RteContent => {
    const offered = presetsFor(options);

    return defineContent({
        blocks: {
            textStyle: defineBlock<{ style: string }>({
                content: 'text',
                // Only reached by a node that arrives without one; every
                // path that sets the attribute names a style.
                defaults: { style: offered[0]?.name ?? FIRST_PRESET },
                toHtml: ({ style }) => {
                    const preset = findPreset(style);
                    if (preset === undefined) {
                        return { tag: 'p', children: true };
                    }
                    return {
                        tag: preset.tag,
                        attrs: {
                            class: preset.className,
                            ...(preset.tag === 'p' ? { 'data-text-style': preset.name } : {}),
                        },
                        children: true,
                    };
                },
                parse: offered.map(parseRuleFor),
            }),
        },
    });
};
