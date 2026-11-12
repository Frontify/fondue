/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toStoredColor } from './cssColor';
import { type ParseReader } from './plugin';

/**
 * What a tag rule reads off its element: the element's own declared style, as the engine reads it for style rules.
 */
export const parseReaderOf = (element: HTMLElement): ParseReader => ({
    color: (property) => toStoredColor(element.style.getPropertyValue(property)),
});
