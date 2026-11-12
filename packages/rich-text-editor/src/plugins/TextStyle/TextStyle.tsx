/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DefaultStyle,
    defineBlock,
    defineContent,
    definePlugin,
    type HotkeyHandler,
    PARAGRAPH,
    type RteBlockCommand,
    type RteContent,
    type RteIcon,
    type RtePlugin,
} from '#/core';

import { withoutBoldWeight } from '../shared/helpers/declaredStyle';

import { HEADING_LEVEL_ICONS } from './components/HeadingLevelIcon';
import { TextStyleSelect } from './components/TextStyleSelect';
import {
    ALL_TEXT_STYLES,
    findPreset,
    FIRST_PRESET,
    isTextStyle,
    markdownRuleFor,
    parseRuleFor,
    presetsFor,
    type TextStyleOption,
} from './helpers/presets';

// The block this plugin contributes; the package root assembles it into the
// official document union.
export type { TextStyleBlock } from './helpers/presets';

export type TextStylePluginOptions = {
    /**
     * The styles the dropdown offers, in order, and what pasted HTML may become.
     * Include `'paragraph'` for the option that clears a style.
     * @default ALL_TEXT_STYLES
     */
    styles?: readonly TextStyleOption[];
};

// Headings are bold by default, so a bold the pasted heading declares on itself is not the author's. Bold on text inside it is.
const TEXT_STYLE_DEFAULT_STYLES: readonly DefaultStyle[] = [
    { property: 'font-weight', scope: 'self', strip: withoutBoldWeight },
];

const textStyleContentFor = (options: readonly TextStyleOption[]): RteContent => {
    const offered = presetsFor(options);

    return defineContent({
        blocks: {
            textStyle: defineBlock<{ style: string }>({
                content: 'text',
                // Only reached by a node that arrives without one; every
                // path that sets the attribute names a style.
                defaults: { style: offered[0]?.name ?? FIRST_PRESET },
                defaultStyles: TEXT_STYLE_DEFAULT_STYLES,
                toHtml: ({ style }) => {
                    const preset = findPreset(style);
                    if (preset === undefined) {
                        return { tag: 'p', children: true };
                    }
                    const attrs: Record<string, string | undefined> = { class: preset.className };
                    if (preset.tag === 'p') {
                        attrs['data-text-style'] = preset.name;
                    }
                    return { tag: preset.tag, attrs, children: true };
                },
                parse: offered.map(parseRuleFor),
            }),
        },
    });
};

/**
 * The text block carrying a style, accepting every style
 */
export const textStyleContent = textStyleContentFor(ALL_TEXT_STYLES);

const HEADING_LEVEL: Partial<Record<string, number>> = { h1: 1, h2: 2, h3: 3, h4: 4 };

/** Words the `/` menu also finds a heading by. */
const HEADING_KEYWORDS: Partial<Record<number, readonly string[]>> = {
    1: ['h1', 'title'],
    2: ['h2', 'subtitle'],
    3: ['h3'],
    4: ['h4'],
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

    // The shortcuts other editors use: `Mod-Alt-0` for a paragraph, `Mod-Alt-1`
    // to `Mod-Alt-4` for the headings — each only when this editor offers it.
    const hotkeys: Record<string, HotkeyHandler> = {};
    if (options.includes(PARAGRAPH)) {
        hotkeys['Mod-Alt-0'] = (api) => api.blocks.setType(PARAGRAPH);
    }
    for (const preset of offered) {
        const level = HEADING_LEVEL[preset.tag];
        if (level !== undefined) {
            hotkeys[`Mod-Alt-${level}`] = (api) => api.blocks.setType('textStyle', { style: preset.name });
        }
    }

    // The paragraph is the editor's own "Text" command, so only the presets are listed.
    const commands: RteBlockCommand[] = offered.map((preset) => {
        const level = HEADING_LEVEL[preset.tag];
        let icon: RteIcon | undefined;
        if (level !== undefined) {
            icon = HEADING_LEVEL_ICONS[level];
        }
        return {
            id: preset.tag === 'p' ? preset.name : `heading-${level}`,
            label: preset.label,
            icon,
            keywords: level === undefined ? [] : (HEADING_KEYWORDS[level] ?? []),
            group: 'turnInto',
            isActive: (selection) => isTextStyle(selection.block) && selection.block.style === preset.name,
            run: (api) => api.blocks.setType('textStyle', { style: preset.name }),
        };
    });

    // Reuse the shared object so the default plugin and defaultContent declare the very same block definition.
    let content = textStyleContent;
    if (options !== ALL_TEXT_STYLES) {
        content = textStyleContentFor(options);
    }

    return definePlugin({
        id: 'text-style',
        content,
        toolbarGroup: 'text',
        toolbar: [{ label: 'Text style', render: (props) => <TextStyleSelect {...props} options={options} /> }],
        hotkeys,
        // `# ` through `#### `, for the headings this editor offers.
        inputRules: offered.flatMap(markdownRuleFor),
        commands,
    });
};
