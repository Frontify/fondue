/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/core';

import { TextStyleSelect } from './components/TextStyleSelect';
import {
    ALL_TEXT_STYLES,
    findPreset,
    FIRST_PRESET,
    markdownRuleFor,
    parseRuleFor,
    presetsFor,
    type TextStyleBlock,
    type TextStyleOption,
} from './helpers/presets';

// The block this plugin contributes; the package root assembles it into the
// official document union. Its options type stays local: the object literal at
// the call site is contextually typed, so nothing outside needs to name it.
export type { TextStyleBlock } from './helpers/presets';

type TextStylePluginOptions = {
    /** The styles the dropdown offers, in order. Include `'paragraph'` for the option that clears one. */
    styles?: readonly TextStyleOption[];
};

/**
 * Which styles an editor offers is a product decision — a comment box wants
 * none, a page editor wants all — so it is an option. `styles` is the dropdown,
 * in the order given, and it is also what pasted HTML may become: an editor
 * that does not offer `heading3` turns a pasted `h3` into a paragraph.
 *
 * Rendering is not restricted the same way, so a document written by a
 * differently configured editor still displays as it was authored.
 */
export const textStylePlugin = ({ styles: options = ALL_TEXT_STYLES }: TextStylePluginOptions = {}): RtePlugin => {
    const offered = presetsFor(options);

    return {
        id: 'text-style',
        schema: [
            {
                kind: 'block',
                type: 'textStyle',
                children: 'text',
                // Only reached by a node that arrives without one; every
                // path that sets the attribute names a style.
                attributes: { style: { default: offered[0]?.name ?? FIRST_PRESET } },
                toDom: (attrs) => {
                    const style = typeof attrs.style === 'string' ? attrs.style : '';
                    const preset = findPreset(style);
                    if (preset === undefined) {
                        return { tag: 'p', children: true };
                    }
                    return {
                        tag: preset.tag,
                        attrs: {
                            class: preset.className ?? '',
                            ...(preset.tag === 'p' ? { 'data-text-style': preset.name } : {}),
                        },
                        children: true,
                    };
                },
                renderComponent: ({ node, children }) => {
                    const { style } = node as TextStyleBlock;
                    const preset = findPreset(style);
                    if (preset === undefined) {
                        return <p>{children}</p>;
                    }
                    const Tag = preset.tag;
                    return (
                        <Tag className={preset.className} {...(Tag === 'p' ? { 'data-text-style': style } : {})}>
                            {children}
                        </Tag>
                    );
                },
                parseRules: offered.map(parseRuleFor),
            },
        ],
        toolbar: (api) => <TextStyleSelect api={api} options={options} />,
        // `# ` through `#### `, for the headings this editor offers.
        inputRules: offered.flatMap(markdownRuleFor),
    };
};
