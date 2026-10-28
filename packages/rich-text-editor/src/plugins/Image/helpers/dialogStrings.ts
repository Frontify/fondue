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

/** The width dialog's strings in the UI locale of `translate`. */
export const widthStrings = (translate: CodecContext['translate']): WidthStrings => ({
    title: translate('RichTextEditor_imageWidthTitle'),
    field: translate('RichTextEditor_imageWidthField'),
    range: translate('RichTextEditor_imageWidthRange', { min: MIN_WIDTH, max: MAX_WIDTH }),
    apply: translate('RichTextEditor_apply'),
    cancel: translate('RichTextEditor_cancel'),
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

/** The alternative text dialog's strings in the UI locale of `translate`. */
export const altTextStrings = (translate: CodecContext['translate']): AltTextStrings => ({
    title: translate('RichTextEditor_imageAltTitle'),
    choice: translate('RichTextEditor_imageAltChoice'),
    meaningful: translate('RichTextEditor_imageAltMeaningful'),
    meaningfulHint: translate('RichTextEditor_imageAltMeaningfulHint'),
    decorative: translate('RichTextEditor_imageAltDecorative'),
    decorativeHint: translate('RichTextEditor_imageAltDecorativeHint'),
    field: translate('RichTextEditor_imageAltField'),
    required: translate('RichTextEditor_imageAltRequired'),
    suggestion: translate('RichTextEditor_imageAltSuggestion'),
    useSuggestion: translate('RichTextEditor_imageAltUseSuggestion'),
    save: translate('RichTextEditor_imageAltSave'),
    cancel: translate('RichTextEditor_cancel'),
});
