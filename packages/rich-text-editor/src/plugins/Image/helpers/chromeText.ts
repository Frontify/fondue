/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext } from '#/model';

/** The alternative-text action's name: review, add or edit. */
export const altActionLabel = (translate: CodecContext['translate'], review: boolean, kept: boolean) => {
    let altText = translate('RichTextEditor_imageAltEdit');
    if (review) {
        altText = translate('RichTextEditor_imageAltReview');
    } else if (!kept) {
        altText = translate('RichTextEditor_imageAltAdd');
    }

    return altText;
};

/** The size action's name: the stored percent, or the original size. */
export const sizeActionLabel = (translate: CodecContext['translate'], displayWidth: number | null) => {
    let sizeText = translate('RichTextEditor_imageSizeOriginal');
    if (displayWidth !== null) {
        sizeText = translate('RichTextEditor_imageSizePercent', { percent: displayWidth });
    }

    return sizeText;
};
