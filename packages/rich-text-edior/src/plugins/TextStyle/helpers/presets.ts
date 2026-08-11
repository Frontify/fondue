/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode, type RteInlineNode } from '#/RichTextEditor';

import styles from '../textStyle.module.scss';

/**
 * Every typography preset a text block can take: the heading scale, and the
 * ones legacy kept beside it (three brand-configurable presets plus the pair
 * used around images).
 *
 * Headings and text styles used to be two plugins with two block types, but
 * picking one is the same act as picking the other — so they are a single block
 * type carrying a `style`, offered by a single dropdown.
 *
 * The table is the source of truth for both halves of the plugin: the style
 * union is derived from it, it says how each style renders (`tag` plus its
 * class) and reads (`label`), and the block's render function and the dropdown's
 * preview rows draw from the same place. Order here is order in the dropdown.
 */
const PRESETS = [
    { name: 'heading1', label: 'Heading 1', tag: 'h1', className: styles.heading1 },
    { name: 'heading2', label: 'Heading 2', tag: 'h2', className: styles.heading2 },
    { name: 'heading3', label: 'Heading 3', tag: 'h3', className: styles.heading3 },
    { name: 'heading4', label: 'Heading 4', tag: 'h4', className: styles.heading4 },
    { name: 'custom1', label: 'Custom 1', tag: 'p', className: styles.custom1 },
    { name: 'custom2', label: 'Custom 2', tag: 'p', className: styles.custom2 },
    { name: 'custom3', label: 'Custom 3', tag: 'p', className: styles.custom3 },
    { name: 'imageTitle', label: 'Image title', tag: 'p', className: styles.imageTitle },
    { name: 'imageCaption', label: 'Image caption', tag: 'p', className: styles.imageCaption },
] as const;

export type Preset = (typeof PRESETS)[number];

/** The value the `style` attribute carries. */
export type TextStyleName = Preset['name'];

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
export type TextStyleBlock = {
    type: 'textStyle';
    style: TextStyleName;
    children: RteInlineNode[];
};

/**
 * What the dropdown may offer. `paragraph` is the editor's own baseline block
 * rather than a preset — picking it is how a style is cleared — which is why it
 * sits outside `TextStyleName`.
 */
export type TextStyleOption = 'paragraph' | TextStyleName;

/** The Select value standing for "not a preset" — the block type we fall back to. */
export const PARAGRAPH = 'paragraph';

/** Every option, in dropdown order: what the host gets by naming none. */
export const ALL_TEXT_STYLES: readonly TextStyleOption[] = [PARAGRAPH, ...PRESETS.map((preset) => preset.name)];

/** The style a node falls back to when it arrives without one. */
export const FIRST_PRESET: TextStyleName = PRESETS[0].name;

export const findPreset = (name: string): Preset | undefined => PRESETS.find((preset) => preset.name === name);

export const labelOf = (option: TextStyleOption): string => findPreset(option)?.label ?? 'Paragraph';

/** The presets an editor was configured with, in the order they were given. */
export const presetsFor = (options: readonly TextStyleOption[]): Preset[] =>
    options.map(findPreset).filter((preset): preset is Preset => preset !== undefined);

/**
 * How a preset is recognized in pasted HTML. A heading is claimed by its bare
 * tag, so an `h2` from anywhere lands as one; a preset renders as a paragraph
 * and is told apart by the attribute it wrote.
 */
export const parseRuleFor = ({ name, tag }: Preset) => ({
    tag: tag === 'p' ? `p[data-text-style=${name}]` : tag,
    attributes: { style: name },
});

/** `getCurrentBlock()` returns the structural node; narrowing it makes `style` readable. */
export const isTextStyle = (block: RteBlockNode | null): block is TextStyleBlock => block?.type === 'textStyle';
