/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DefaultStyle,
    type BlockDefinition,
    defineBlock,
    defineContent,
    definePlugin,
    LOOK_PROPERTIES,
    lookProperties,
    PARAGRAPH,
    type RteBlockCommand,
    type RteContent,
    type RteHotkey,
    type RteIcon,
    type RtePlugin,
    type RteToolbarEntry,
    type TextLook,
} from '#/core';
import { localeLabel } from '#/ui/translation';

import { withoutBoldWeight } from '../shared/helpers/declaredStyle';

import { HEADING_LEVEL_ICONS } from './components/HeadingLevelIcon';
import { TextStyleSelect } from './components/TextStyleSelect';
import {
    ALL_TEXT_STYLES,
    findPreset,
    FIRST_PRESET,
    isTextStyle,
    labelOf,
    markdownRuleFor,
    parseRuleFor,
    presetsFor,
    type TextStyleName,
    type TextStyleOption,
} from './helpers/presets';
import styles from './textStyle.module.scss';

// The block this plugin contributes; the package root assembles it into the
// official document union.
export type { TextStyleBlock, TextStyleName } from './helpers/presets';

/** The look of each kind of text, by name: the 9 text styles, body text and block quotes. */
export type TextStylePresets = Partial<Record<TextStyleName | 'body' | 'quote', TextLook>>;

/** How the text-style content looks; what a renderer needs to draw a document the way the editor does. */
export type TextStyleContentOptions = {
    /**
     * How each kind of text looks, by name: a text style, `body` for plain paragraphs and `quote`.
     * A kind left out, and a field left out of one, keeps Fondue's look.
     * A value that is empty or can end its CSS declaration early throws an error that names the preset and the
     * field, so a mistake in the host's configuration never passes silently.
     */
    presets?: TextStylePresets;
};

export type TextStylePluginOptions = TextStyleContentOptions & {
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

const textStyleBlockFor = (options: readonly TextStyleOption[]): BlockDefinition => {
    const offered = presetsFor(options);

    return defineBlock<{ style: string }>({
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
    });
};

// Shared so every content offering all styles declares the very same block, which the registry requires.
const ALL_STYLES_BLOCK = textStyleBlockFor(ALL_TEXT_STYLES);

const textStyleContentFor = (options: readonly TextStyleOption[], presets: TextStylePresets = {}): RteContent => {
    const contentProperties: Record<string, string> = {};
    for (const [name, look] of Object.entries(presets)) {
        if (look !== undefined) {
            Object.assign(contentProperties, lookProperties(name, look, LOOK_PROPERTIES));
        }
    }

    let block = ALL_STYLES_BLOCK;
    if (options !== ALL_TEXT_STYLES) {
        block = textStyleBlockFor(options);
    }

    return defineContent({
        // The class the body look hangs off, so it reaches plain paragraphs only where this content is mounted.
        contentClassName: styles.content,
        contentProperties,
        blocks: { textStyle: block },
    });
};

// Shared so the default plugin, `defaultContent` and every call without presets hand out the very same content.
const DEFAULT_TEXT_STYLE_CONTENT = textStyleContentFor(ALL_TEXT_STYLES);

/**
 * The text block carrying a style, and the look of each kind of text. Renders every style, whatever the editor
 * offers. Pass the same `presets` as `textStylePlugin`, so a renderer given only content draws the host's looks.
 *
 * @example
 * <RichTextRenderer plugins={[textStyleContent({ presets }), boldContent]} value={doc} />
 */
export const textStyleContent = ({ presets }: TextStyleContentOptions = {}): RteContent => {
    if (presets === undefined) {
        return DEFAULT_TEXT_STYLE_CONTENT;
    }
    return textStyleContentFor(ALL_TEXT_STYLES, presets);
};

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
export const textStylePlugin = ({
    styles: options = ALL_TEXT_STYLES,
    presets,
}: TextStylePluginOptions = {}): RtePlugin => {
    const offered = presetsFor(options);

    // The shortcuts other editors use: `Mod-Alt-0` for a paragraph, `Mod-Alt-1`
    // to `Mod-Alt-4` for the headings — each only when this editor offers it.
    const hotkeys: Record<string, RteHotkey> = {};
    if (options.includes(PARAGRAPH)) {
        hotkeys['Mod-Alt-0'] = { label: labelOf(PARAGRAPH), run: (api) => api.blocks.setType(PARAGRAPH) };
    }
    for (const preset of offered) {
        const level = HEADING_LEVEL[preset.tag];
        if (level !== undefined) {
            hotkeys[`Mod-Alt-${level}`] = {
                label: preset.label,
                run: (api) => api.blocks.setType('textStyle', { style: preset.name }),
            };
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
            label: localeLabel(preset.label),
            icon,
            keywords: level === undefined ? [] : (HEADING_KEYWORDS[level] ?? []),
            group: 'turnInto',
            isActive: (selection) => isTextStyle(selection.block) && selection.block.style === preset.name,
            run: (api) => api.blocks.setType('textStyle', { style: preset.name }),
        };
    });

    // A paragraph alone is nothing to choose, so the picker needs at least one real style.
    const toolbar: RteToolbarEntry[] = [];
    if (offered.length > 0) {
        toolbar.push({
            label: localeLabel('RichTextEditor_textStyle'),
            render: (props) => <TextStyleSelect {...props} options={options} />,
        });
    }

    // Offering every style is exactly `textStyleContent`, so the default plugin and `defaultContent` share one object.
    let content = textStyleContent({ presets });
    if (options !== ALL_TEXT_STYLES) {
        content = textStyleContentFor(options, presets);
    }

    return definePlugin({
        id: 'text-style',
        content,
        toolbarGroup: 'text',
        toolbar,
        hotkeys,
        // `# ` through `#### `, for the headings this editor offers.
        inputRules: offered.flatMap(markdownRuleFor),
        commands,
    });
};
