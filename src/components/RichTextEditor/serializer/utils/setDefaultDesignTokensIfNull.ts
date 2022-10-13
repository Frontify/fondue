/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens } from '@components/RichTextEditor/types';

export const setDefaultDesignTokensIfNull = (
    defaultTokens: DesignTokens,
    customTokens: DesignTokens,
): DesignTokens => ({ ...defaultTokens, ...customTokens });
