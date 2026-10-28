/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MenuOption } from '#/bridge/pluginApi/define';
import { type CodecContext } from '#/model';

import { SET_SIZE } from './dialogStrings';

/** The size menu's percentages of the content width. */
export const PRESETS = [25, 50, 75, 100] as const;
/** The sides a figure aligns its image to. */
export const SIDES = ['left', 'center', 'right'] as const;
/** The label key of each side. */
export const SIDE_KEYS = {
    left: 'RichTextEditor_imageAlignLeft',
    center: 'RichTextEditor_imageAlignCenter',
    right: 'RichTextEditor_imageAlignRight',
} as const;
/** The command that opens the width dialog, the size menu's Custom width. */
export const EDIT_WIDTH = 'image.width.edit';

/** The size menu's choices for an image of `displayWidth`: the presets, the original size, then Custom width. */
export const sizeOptions = (
    translate: CodecContext['translate'],
    displayWidth: number | null,
): readonly MenuOption[] => [
    ...[...PRESETS, null].map((preset) => {
        let label = translate('RichTextEditor_imageSizeOriginal');
        if (preset !== null) {
            label = translate('RichTextEditor_imageSizePercent', { percent: preset });
        }

        return {
            key: String(preset),
            label,
            command: SET_SIZE,
            payload: { displayWidth: preset },
            checked: displayWidth === preset,
        };
    }),
    { key: 'custom', label: translate('RichTextEditor_imageSizeCustom'), command: EDIT_WIDTH },
];

/** The alignment menu's choices for a figure on `side`. */
export const alignOptions = (
    translate: CodecContext['translate'],
    side: (typeof SIDES)[number],
): readonly MenuOption[] =>
    SIDES.map((option) => ({
        key: option,
        label: translate(SIDE_KEYS[option]),
        command: 'image.align.set',
        payload: { align: option },
        checked: side === option,
    }));
