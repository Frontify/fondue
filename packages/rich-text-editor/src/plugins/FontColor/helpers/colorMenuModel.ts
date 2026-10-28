/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type ColorToken } from '#/model';

/** The command that sets each colour mark, and the one that removes both. */
export const SET_COMMANDS = { font_color: 'mark.font-color.set', highlight: 'mark.highlight.set' } as const;
export const CLEAR_COLOR = 'mark.color.clear';
export type ColorMark = keyof typeof SET_COMMANDS;

/** The colour menu's strings, in the UI locale. */
export type ColorMenuStrings = {
    label: string;
    textColors: string;
    highlightColors: string;
    clear: string;
    customText: string;
    customHighlight: string;
    save: string;
    cancel: string;
};

/** The colour menu's strings from the chrome's `t`. */
export const colorMenuStrings = (t: CodecContext['t']): ColorMenuStrings => ({
    label: t('RichTextEditor_colorMenu'),
    textColors: t('RichTextEditor_textColors'),
    highlightColors: t('RichTextEditor_highlightColors'),
    clear: t('RichTextEditor_clearColor'),
    customText: t('RichTextEditor_customColor'),
    customHighlight: t('RichTextEditor_customHighlight'),
    save: t('RichTextEditor_colorPickerSave'),
    cancel: t('RichTextEditor_cancel'),
});

/** What the menu offers: the tokens for each mark, and which marks take any colour through the picker. */
export type ColorMenuOptions = {
    tokens: readonly ColorToken[];
    /** `marks.highlight` is installed, so the menu offers its colours. */
    highlight: boolean;
    /** The marks whose feature has `literalColors` on. */
    literal: readonly ColorMark[];
};
