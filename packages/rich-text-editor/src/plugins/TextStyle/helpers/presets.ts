/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DOCUMENT_GAP_VARIABLES,
    fondueToken,
    PARAGRAPH,
    type ParseRule,
    type RteInlineNode,
    type RteInputRule,
    type StyleMap,
} from '#/core';

import { MUTED_COLOR } from '../../shared/helpers/mutedText';
import styles from '../textStyle.module.scss';

import { HEADING_GAP_VARIABLE } from './headingGap';

/** The gap above a heading, as `$heading-margin-top` in `textStyle.module.scss`. */
const HEADING_MARGIN_TOP = `var(${DOCUMENT_GAP_VARIABLES.leading}, var(${HEADING_GAP_VARIABLE}, ${fondueToken('spacing-medium')}))`;

/** The leading and the gap above that the headings share, as `$heading-line-height` and `$heading-margin-top`. */
const HEADING_FALLBACK: StyleMap = { 'line-height': '1.3', 'margin-top': HEADING_MARGIN_TOP };

/**
 * Every typography preset a text block can take: the heading scale, three
 * brand-configurable presets and the pair used around images. One block type
 * carries a `style`, offered by one dropdown.
 *
 * Source of truth for how each style renders (`tag` plus class) and reads
 * (`label`); order here is dropdown order. Must name every `TextStyleName`.
 * Each `fallback` is the same values `textStyle.module.scss` falls back to, for exported inline styles,
 * over the margins every look falls back to.
 */
const PRESETS = [
    {
        name: 'heading1',
        label: 'Heading 1',
        tag: 'h1',
        className: styles.heading1,
        fallback: {
            ...HEADING_FALLBACK,
            'font-size': fondueToken('text-heading-xx-large-strong-font-size'),
            'font-weight': fondueToken('text-heading-xx-large-strong-font-weight'),
        },
    },
    {
        name: 'heading2',
        label: 'Heading 2',
        tag: 'h2',
        className: styles.heading2,
        fallback: {
            ...HEADING_FALLBACK,
            'font-size': fondueToken('text-heading-x-large-strong-font-size'),
            'font-weight': fondueToken('text-heading-x-large-strong-font-weight'),
        },
    },
    {
        name: 'heading3',
        label: 'Heading 3',
        tag: 'h3',
        className: styles.heading3,
        fallback: {
            ...HEADING_FALLBACK,
            'font-size': fondueToken('text-heading-large-default-font-size'),
            'font-weight': fondueToken('text-heading-large-default-font-weight'),
        },
    },
    {
        name: 'heading4',
        label: 'Heading 4',
        tag: 'h4',
        className: styles.heading4,
        fallback: {
            ...HEADING_FALLBACK,
            'font-size': fondueToken('text-heading-medium-default-font-size'),
            'font-weight': fondueToken('text-heading-medium-default-font-weight'),
        },
    },
    {
        name: 'custom1',
        label: 'Custom 1',
        tag: 'p',
        className: styles.custom1,
        fallback: {
            'font-size': fondueToken('typography-font-size-medium'),
            'font-weight': fondueToken('typography-font-weight-medium'),
            'letter-spacing': '0.02em',
        },
    },
    {
        name: 'custom2',
        label: 'Custom 2',
        tag: 'p',
        className: styles.custom2,
        fallback: {
            color: MUTED_COLOR,
            'font-size': fondueToken('typography-font-size-medium'),
            'font-style': 'italic',
        },
    },
    {
        name: 'custom3',
        label: 'Custom 3',
        tag: 'p',
        className: styles.custom3,
        fallback: {
            'font-size': fondueToken('typography-font-size-small'),
            'letter-spacing': fondueToken('typography-letter-spacing-wide'),
            'text-transform': fondueToken('typography-text-transform-uppercase'),
        },
    },
    {
        name: 'imageTitle',
        label: 'Image title',
        tag: 'p',
        className: styles.imageTitle,
        fallback: {
            'font-size': fondueToken('typography-font-size-medium'),
            'font-weight': fondueToken('typography-font-weight-bold'),
        },
    },
    {
        name: 'imageCaption',
        label: 'Image caption',
        tag: 'p',
        className: styles.imageCaption,
        fallback: {
            color: MUTED_COLOR,
            'font-size': fondueToken('typography-font-size-x-small'),
        },
    },
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
    label: string;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
    className: string | undefined;
    fallback: StyleMap;
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

/** The class of a text block whose style no preset names, which only gives it a body paragraph's margins. */
export const UNKNOWN_STYLE_CLASS_NAME = styles.unknownStyle;

export const labelOf = (option: TextStyleOption): string => findPreset(option)?.label ?? 'Paragraph';

/** The presets an editor was configured with, in the order they were given. */
export const presetsFor = (options: readonly TextStyleOption[]): Preset[] =>
    options.map(findPreset).filter((preset) => preset !== undefined);

/** The `#` prefix each heading tag answers to; the presets rendering as `p` have none. */
const MARKDOWN_PREFIX: Partial<Record<Preset['tag'], string>> = {
    h1: '# ',
    h2: '## ',
    h3: '### ',
    h4: '#### ',
};

/** The markdown shortcut for a preset that has one (`## ` for a level-2 heading), so it follows the configured presets. */
export const markdownRuleFor = ({ name, tag }: Preset): RteInputRule[] => {
    const match = MARKDOWN_PREFIX[tag];
    return match === undefined ? [] : [{ kind: 'block', match, block: 'textStyle', attributes: { style: name } }];
};

/** How pasted HTML maps to a preset: headings by bare tag, paragraph presets by their `data-text-style` attribute. */
export const parseRuleFor = ({ name, tag }: Preset): ParseRule<{ style: string }> => ({
    tag: tag === 'p' ? `p[data-text-style=${name}]` : tag,
    value: () => ({ style: name }),
});

/** The selection snapshot's `block` is the structural node; narrowing it makes `style` readable. */
export const isTextStyle = (block: { type: string } | null): block is TextStyleBlock => block?.type === 'textStyle';
