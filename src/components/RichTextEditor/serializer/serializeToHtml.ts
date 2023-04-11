/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TDescendant } from '@udecode/plate';
import { CSSProperties } from 'react';
import { MentionableItems, mapMentionable } from '../Plugins/MentionPlugin';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { parseRawValue } from '../utils/parseRawValue';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';
import { setDefaultDesignTokensIfNull } from './utils/setDefaultDesignTokensIfNull';

export const serializeRawToHtml = async (
    raw: string,
    designTokens: DesignTokens = defaultDesignTokens,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
): Promise<string> => {
    const nodes = parseRawValue({ raw });
    return serializeNodesToHtml(nodes, { designTokens, columns, columnGap });
};

export type SerializeNodesToHtmlOptions = {
    designTokens?: DesignTokens;
    mentionable?: MentionableItems;
    columns?: number;
    columnGap?: CSSProperties['columnGap'];
};

export const serializeNodesToHtml = async (
    nodes: TDescendant[],
    {
        designTokens = defaultDesignTokens,
        mentionable,
        columns = 1,
        columnGap = 'normal',
    }: SerializeNodesToHtmlOptions = {},
): Promise<string> => {
    const mergedDesignTokens = setDefaultDesignTokensIfNull(defaultDesignTokens, designTokens);
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();

    let html = '';
    for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        if (isEmptyNode(node)) {
            html += '<br />';
        } else {
            html += serializeNodeToHtmlRecursive(node, {
                designTokens: mergedDesignTokens,
                mappedMentionable,
            });
        }
    }

    if (columns > 1) {
        return `<div style="columns:${columns}; column-gap:${columnGap};">${html}</div>`;
    }

    return html;
};

const isEmptyNode = (node: TDescendant): boolean => {
    if (!Array.isArray(node?.children)) {
        return false;
    }
    return node?.children?.every((child) => child.text === '');
};
