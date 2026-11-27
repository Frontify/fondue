/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkdownBlockForm, PARAGRAPH, type ParseRule, type RteInlineNode, type RteInputRule } from '#/core';
import { type PlainStringKey } from '#/locales/types';

import styles from '../textStyle.module.scss';

/**
 * Every typography preset a text block can take: the heading scale, three
 * brand-configurable presets and the pair used around images. One block type
 * carries a `style`, offered by one dropdown.
 *
 * Source of truth for how each style renders (`tag` plus class) and reads
 * (`label`); order here is dropdown order. Must name every `TextStyleName`.
 */
const PRESETS = [
    { name: 'heading1', label: 'RichTextEditor_heading1', tag: 'h1', className: styles.heading1 },
    { name: 'heading2', label: 'RichTextEditor_heading2', tag: 'h2', className: styles.heading2 },
    { name: 'heading3', label: 'RichTextEditor_heading3', tag: 'h3', className: styles.heading3 },
    { name: 'heading4', label: 'RichTextEditor_heading4', tag: 'h4', className: styles.heading4 },
    { name: 'custom1', label: 'RichTextEditor_custom1', tag: 'p', className: styles.custom1 },
    { name: 'custom2', label: 'RichTextEditor_custom2', tag: 'p', className: styles.custom2 },
    { name: 'custom3', label: 'RichTextEditor_custom3', tag: 'p', className: styles.custom3 },
    { name: 'imageTitle', label: 'RichTextEditor_imageTitle', tag: 'p', className: styles.imageTitle },
    { name: 'imageCaption', label: 'RichTextEditor_imageCaption', tag: 'p', className: styles.imageCaption },
] as const satisfies readonly Preset[];

/** The value of a text block's `style` attribute. */
export type TextStyleName =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'custom1'
    | 'custom2'
    | 'custom3'
    | 'imageTitle'
    | 'imageCaption';

type Preset = {
    name: TextStyleName;
    label: PlainStringKey;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
    className: string | undefined;
};

/** Fails to compile when a style is added to `TextStyleName` without a preset. */
type EveryStyleHasAPreset<TMissing extends never> = TMissing;
export type PresetsCheck = EveryStyleHasAPreset<Exclude<TextStyleName, (typeof PRESETS)[number]['name']>>;

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type TextStyleBlock = {
    type: 'textStyle';
    style: TextStyleName;
    children: RteInlineNode[];
};

/** What the dropdown may offer. `paragraph` is the editor's baseline block, not a preset: picking it clears the style. */
export type TextStyleOption = 'paragraph' | TextStyleName;

/** Every option, in dropdown order: what the host gets by naming none. */
export const ALL_TEXT_STYLES: readonly TextStyleOption[] = [PARAGRAPH, ...PRESETS.map((preset) => preset.name)];

/** The style a node falls back to when it arrives without one. */
export const FIRST_PRESET: TextStyleName = PRESETS[0].name;

export const findPreset = (name: string): Preset | undefined => PRESETS.find((preset) => preset.name === name);

export const labelOf = (option: TextStyleOption): PlainStringKey =>
    findPreset(option)?.label ?? 'RichTextEditor_paragraph';

/** The presets an editor was configured with, in the order they were given. */
export const presetsFor = (options: readonly TextStyleOption[]): Preset[] =>
    options.map(findPreset).filter((preset) => preset !== undefined);

/** The heading level each heading tag stands for; the presets rendering as `p` have none. */
export const HEADING_LEVEL: Partial<Record<Preset['tag'], number>> = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
};

/** The `#` prefix a heading preset answers to (`## ` for level 2), or `undefined` for a preset that is not a heading. */
const markdownPrefixOf = ({ tag }: Preset): string | undefined => {
    const level = HEADING_LEVEL[tag];
    if (level === undefined) {
        return undefined;
    }
    return `${'#'.repeat(level)} `;
};

/** The markdown shortcut for a preset that has one (`## ` for a level-2 heading), so it follows the configured presets. */
export const markdownRuleFor = (preset: Preset): RteInputRule[] => {
    const match = markdownPrefixOf(preset);
    if (match === undefined) {
        return [];
    }

    return [{ kind: 'block', match, block: 'textStyle', attributes: { style: preset.name } }];
};

/** How Markdown headings map to the offered presets: by tag on read, by the `#` prefix on write. */
export const markdownFormFor = (offered: readonly Preset[]): MarkdownBlockForm<{ style: string }> => ({
    read: [
        {
            token: 'heading_open',
            value: ({ tag }) => {
                const heading = offered.find((preset) => preset.tag === tag && markdownPrefixOf(preset) !== undefined);
                if (heading === undefined) {
                    return null;
                }
                return { style: heading.name };
            },
        },
    ],
    write: ({ style }) => {
        const preset = findPreset(style);
        if (preset === undefined) {
            return null;
        }
        const first = markdownPrefixOf(preset);
        if (first === undefined) {
            return null;
        }
        return { first, rest: null };
    },
});

/** How pasted HTML maps to a preset: headings by bare tag, paragraph presets by their `data-text-style` attribute. */
export const parseRuleFor = ({ name, tag }: Preset): ParseRule<{ style: string }> => ({
    tag: tag === 'p' ? `p[data-text-style=${name}]` : tag,
    value: () => ({ style: name }),
});

/** The selection snapshot's `block` is the structural node; narrowing it makes `style` readable. */
export const isTextStyle = (block: { type: string } | null): block is TextStyleBlock => block?.type === 'textStyle';
