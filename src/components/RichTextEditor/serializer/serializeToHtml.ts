/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TDescendant } from '@udecode/plate';
import { MentionableItems, mapMentionable } from '../Plugins/MentionPlugin';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { parseRawValue } from '../utils/parseRawValue';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';
import { setDefaultDesignTokensIfNull } from './utils/setDefaultDesignTokensIfNull';

export const serializeRawToHtml = (raw: string, designTokens: DesignTokens = defaultDesignTokens): string => {
    const nodes = parseRawValue({ raw });
    return serializeNodesToHtml(nodes, { designTokens });
};

type SerializeNodesToHtmlOptions = {
    designTokens?: DesignTokens;
    mentionable?: MentionableItems;
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    { designTokens = defaultDesignTokens, mentionable }: SerializeNodesToHtmlOptions = {},
): string => {
    const mergedDesignTokens = setDefaultDesignTokensIfNull(defaultDesignTokens, designTokens);
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();
    return nodes
        .map((node) =>
            serializeNodeToHtmlRecursive(node, {
                designTokens: mergedDesignTokens,
                mappedMentionable,
            }),
        )
        .join('');
};
