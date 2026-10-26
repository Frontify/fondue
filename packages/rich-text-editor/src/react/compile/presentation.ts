/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactPresentation } from '../types';

/** A presentation with no toolbar, styles or colour tokens, and the values given. */
export const defineReactPresentation = (input: Partial<ReactPresentation>): ReactPresentation => ({
    styles: [],
    colorTokens: [],
    toolbar: [],
    sliceContext: null,
    ...input,
});
