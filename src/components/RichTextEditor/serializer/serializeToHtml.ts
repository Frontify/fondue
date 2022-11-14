/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TDescendant } from '@udecode/plate';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { parseRawValue } from '../utils/parseRawValue';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';
import { setDefaultDesignTokensIfNull } from './utils/setDefaultDesignTokensIfNull';

export const serializeRawToHtml = (raw: string, designTokens: DesignTokens = defaultDesignTokens): string => {
    const nodes = parseRawValue({ raw });
    return serializeNodesToHtml(nodes, designTokens);
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    designTokens: DesignTokens = defaultDesignTokens,
): string => {
    const mergedDesignTokens = setDefaultDesignTokensIfNull(defaultDesignTokens, designTokens);
    return nodes.map((node) => serializeNodeToHtmlRecursive(node, mergedDesignTokens)).join('');
};
