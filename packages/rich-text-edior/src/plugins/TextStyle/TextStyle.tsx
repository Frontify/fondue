/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Select } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { type EditorControlApi, type RteBlockNode, type RteInlineNode, type RtePlugin } from '#/RichTextEditor';

import styles from './textStyle.module.scss';

/**
 * Every typography preset a text block can take: the heading scale, and the
 * ones legacy kept beside it (three brand-configurable presets plus the pair
 * used around images).
 *
 * Headings and text styles used to be two plugins with two block types, but
 * picking one is the same act as picking the other — so they are a single block
 * type carrying a `style`, offered by a single dropdown. What that dropdown
 * offers is the host's call; see `createTextStylePlugin`.
 *
 * The table is the source of truth: the style union is derived from it, and it
 * says how each style renders (`tag` plus its class) and reads (`label`). Order
 * here is order in the dropdown.
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

type Preset = (typeof PRESETS)[number];

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
const PARAGRAPH = 'paragraph';

/** Every option, in dropdown order: what the host gets by naming none. */
export const ALL_TEXT_STYLES: readonly TextStyleOption[] = [PARAGRAPH, ...PRESETS.map((preset) => preset.name)];

const findPreset = (name: string): Preset | undefined => PRESETS.find((preset) => preset.name === name);

const labelOf = (option: TextStyleOption): string => findPreset(option)?.label ?? 'Paragraph';

/**
 * How a preset is recognized in pasted HTML. A heading is claimed by its bare
 * tag, so an `h2` from anywhere lands as one; a preset renders as a paragraph
 * and is told apart by the attribute it wrote.
 */
const parseRuleFor = ({ name, tag }: Preset) => ({
    tag: tag === 'p' ? `p[data-text-style=${name}]` : tag,
    attributes: { style: name },
});

/** `getCurrentBlock()` returns the structural node; narrowing it makes `style` readable. */
const isTextStyle = (block: RteBlockNode | null): block is TextStyleBlock => block?.type === 'textStyle';

/**
 * The style dropdown. Its value is derived from the document on every render
 * (the toolbar re-renders on every editor state change), so the Select is fully
 * controlled by the editor, never by local state.
 */
const TextStyleSelect = ({
    api,
    options,
}: {
    api: EditorControlApi;
    options: readonly TextStyleOption[];
}): ReactNode => {
    const currentBlock = api.getCurrentBlock();
    // A stored document may carry a style this editor was not configured with —
    // it still renders, but the dropdown can only show what it offers, so
    // anything else reads as the paragraph baseline.
    const current = isTextStyle(currentBlock) && options.includes(currentBlock.style) ? currentBlock.style : PARAGRAPH;

    const handleSelect = (selected: string | null): void => {
        if (selected === null) {
            return;
        }
        if (selected === PARAGRAPH) {
            api.setBlockType(PARAGRAPH);
        } else {
            api.setBlockType('textStyle', { style: selected });
        }
        // The menu hands focus back to its own trigger as it closes, which would
        // undo the focus setBlockType already restored.
        requestAnimationFrame(() => api.focus());
    };

    return (
        // A Select fills its container, and in the toolbar's flex row that means
        // the whole width — so the plugin gives it a box to fill.
        <div className={styles.control}>
            <Select aria-label="Text style" value={current} onSelect={handleSelect}>
                {options.map((option) => (
                    // Each row is drawn in the style it applies, so the menu is a
                    // preview of the scale. The trigger keeps the plain label
                    // (`showStringValue`, on by default) — styling that too would
                    // change the toolbar's height with every selection.
                    <Select.Item key={option} value={option} label={labelOf(option)}>
                        <span className={styles.preview}>
                            <span className={findPreset(option)?.className}>{labelOf(option)}</span>
                        </span>
                    </Select.Item>
                ))}
            </Select>
        </div>
    );
};

/**
 * Which styles an editor offers is a product decision — a comment box wants
 * none of them, a page editor wants all — so this is a factory. `styles` is the
 * dropdown, in the order given, and it is also what pasted HTML may become: an
 * editor that does not offer `heading3` turns a pasted `h3` into a paragraph.
 *
 * Rendering is not restricted the same way, so a document written by a
 * differently configured editor still displays as it was authored.
 */
export const createTextStylePlugin = ({
    styles: options = ALL_TEXT_STYLES,
}: {
    /** The styles the dropdown offers, in order. Include `'paragraph'` for the option that clears one. */
    styles?: readonly TextStyleOption[];
} = {}): RtePlugin => {
    const offered = options.map(findPreset).filter((preset): preset is Preset => preset !== undefined);

    return {
        id: 'text-style',
        schema: {
            blocks: [
                {
                    type: 'textStyle',
                    // Only reached by a node that arrives without one; every path
                    // that sets the attribute names a style.
                    attributes: { style: { default: offered[0]?.name ?? PRESETS[0].name } },
                    render: ({ node, children }) => {
                        // A render function knows what it declared, so it reads its own block type.
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
        },
        toolbar: (api) => <TextStyleSelect api={api} options={options} />,
    };
};

/** The plugin with every style on offer — what `defaultPlugins` mounts. */
export const TextStylePlugin: RtePlugin = createTextStylePlugin();
