/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FondueIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentJustify,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
} from '@frontify/fondue-icons';

import { defineContent, definePlugin, type ReadingDirection, type StyleMap, type ToolbarItemProps } from '#/core';
import { type PlainStringKey } from '#/locales/types';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';
import { translatedLabel, useTranslate } from '#/ui/translation';

import styles from './align.module.scss';

/**
 * Alignment is an attribute on every text block rather than a block type of its
 * own, so it applies to paragraphs, headings, quotes and list items alike —
 * block types this plugin knows nothing about included.
 */
export type AlignAttribute = {
    /**
     * The text alignment of the block
     */
    align?: 'start' | 'center' | 'end' | 'justify';
};

type Alignment = NonNullable<AlignAttribute['align']>;

const ALIGN_VALUES: readonly Alignment[] = ['start', 'center', 'end', 'justify'];

const isAlignment = (value: unknown): value is Alignment => ALIGN_VALUES.some((alignment) => alignment === value);

const alignmentOf = (textAlign: string): Alignment | null => {
    switch (textAlign) {
        case 'left':
        case 'start':
            return 'start';
        case 'right':
        case 'end':
            return 'end';
        case 'center':
            return 'center';
        case 'justify':
            return 'justify';
        default:
            // Other values such as `-webkit-center` are ones no control shows.
            return null;
    }
};

/**
 * Text alignment as a block attribute
 */
export const alignContent = defineContent({
    blockAttributes: {
        align: {
            // Only the four this plugin offers reach a style: a stored value is
            // not trusted to be one, and anything else could carry more CSS.
            style: (value): StyleMap => (isAlignment(value) ? { 'text-align': value } : {}),
            // Physical left and right pasted from elsewhere read as start and end.
            parse: (element) => alignmentOf(element.style.textAlign),
        },
    },
});

type AlignmentChoice = { value: Alignment; icon: FondueIcon; title: PlainStringKey };

const LEFT_TO_RIGHT_ALIGNMENTS: readonly AlignmentChoice[] = [
    { value: 'start', icon: IconTextAlignmentLeft, title: 'RichTextEditor_alignLeft' },
    { value: 'center', icon: IconTextAlignmentCentre, title: 'RichTextEditor_alignCenter' },
    { value: 'end', icon: IconTextAlignmentRight, title: 'RichTextEditor_alignRight' },
    { value: 'justify', icon: IconTextAlignmentJustify, title: 'RichTextEditor_alignJustify' },
];

const RIGHT_TO_LEFT_ALIGNMENTS: readonly AlignmentChoice[] = [
    { value: 'start', icon: IconTextAlignmentRight, title: 'RichTextEditor_alignRight' },
    { value: 'center', icon: IconTextAlignmentCentre, title: 'RichTextEditor_alignCenter' },
    { value: 'end', icon: IconTextAlignmentLeft, title: 'RichTextEditor_alignLeft' },
    { value: 'justify', icon: IconTextAlignmentJustify, title: 'RichTextEditor_alignJustify' },
];

const alignmentChoices = (direction: ReadingDirection): readonly AlignmentChoice[] => {
    switch (direction) {
        case 'ltr':
            return LEFT_TO_RIGHT_ALIGNMENTS;
        case 'rtl':
            return RIGHT_TO_LEFT_ALIGNMENTS;
    }
};

const AlignToolbar = ({ api, selection, label, direction }: ToolbarItemProps) => {
    const translate = useTranslate();
    // The block the selection is in carries the attribute this plugin
    // added, which the structural node type does not know about.
    const align = (selection.block as AlignAttribute | null)?.align;
    // A block without one follows the reading direction, so start is what it shows.
    const current = align ?? 'start';
    return (
        // One choice of four, so a radio group: the checked one is the
        // block's alignment.
        <div role="radiogroup" aria-label={label} className={styles.group}>
            {alignmentChoices(direction).map(({ value, icon: Icon, title }) => (
                // A <button> underneath, which the toolbar gives its tabIndex.
                // oxlint-disable-next-line jsx-a11y/interactive-supports-focus
                <ToolbarButton
                    key={value}
                    role="radio"
                    aria-checked={current === value}
                    title={translate(title)}
                    // Choosing the alignment already set clears it, so the
                    // block inherits the editor's direction again.
                    onClick={() => {
                        let next: typeof value | null = value;
                        if (align === value) {
                            next = null;
                        }
                        api.blocks.updateAttributes({ align: next });
                    }}
                >
                    <Icon size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            ))}
        </div>
    );
};

/**
 * Text alignment, with a four-way radio group in the toolbar
 */
export const alignPlugin = () =>
    definePlugin({
        id: 'align',
        content: alignContent,
        toolbarGroup: 'align',
        toolbar: [{ label: translatedLabel('RichTextEditor_alignment'), render: AlignToolbar, floating: 'inline' }],
    });
