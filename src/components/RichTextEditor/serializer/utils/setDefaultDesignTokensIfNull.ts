/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens } from '@components/RichTextEditor/types';
import { deepMerge } from '@components/RichTextEditor/utils';

export const setDefaultDesignTokensIfNull = (defaultTokens: DesignTokens, customTokens: DesignTokens): DesignTokens =>
    deepMerge<DesignTokens>(defaultTokens, customTokens);
