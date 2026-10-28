/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext } from '#/model';

/** The command that sets an image's width, whose payload declares it in percent. */
export const SET_SIZE = 'image.size.set';
/** The least and the most a width may be, in percent of the content width. */
export const MIN_WIDTH = 10;
export const MAX_WIDTH = 100;

/** The width dialog's strings, in the UI locale. */
export type WidthStrings = {
    title: string;
    field: string;
    /** The error for a value outside the allowed percentages. */
    range: string;
    apply: string;
    cancel: string;
};

/** The width dialog's strings in the UI locale of `t`. */
export const widthStrings = (t: CodecContext['translate']): WidthStrings => ({
    title: t('RichTextEditor_imageWidthTitle'),
    field: t('RichTextEditor_imageWidthField'),
    range: t('RichTextEditor_imageWidthRange', { min: MIN_WIDTH, max: MAX_WIDTH }),
    apply: t('RichTextEditor_apply'),
    cancel: t('RichTextEditor_cancel'),
});

/** The alternative text dialog's strings, in the UI locale. */
export type AltTextStrings = {
    title: string;
    choice: string;
    meaningful: string;
    meaningfulHint: string;
    decorative: string;
    decorativeHint: string;
    field: string;
    required: string;
    suggestion: string;
    useSuggestion: string;
    save: string;
    cancel: string;
};

/** The alternative text dialog's strings in the UI locale of `t`. */
export const altTextStrings = (t: CodecContext['translate']): AltTextStrings => ({
    title: t('RichTextEditor_imageAltTitle'),
    choice: t('RichTextEditor_imageAltChoice'),
    meaningful: t('RichTextEditor_imageAltMeaningful'),
    meaningfulHint: t('RichTextEditor_imageAltMeaningfulHint'),
    decorative: t('RichTextEditor_imageAltDecorative'),
    decorativeHint: t('RichTextEditor_imageAltDecorativeHint'),
    field: t('RichTextEditor_imageAltField'),
    required: t('RichTextEditor_imageAltRequired'),
    suggestion: t('RichTextEditor_imageAltSuggestion'),
    useSuggestion: t('RichTextEditor_imageAltUseSuggestion'),
    save: t('RichTextEditor_imageAltSave'),
    cancel: t('RichTextEditor_cancel'),
});
