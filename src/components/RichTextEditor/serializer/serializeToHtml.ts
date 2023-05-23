/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TDescendant } from '@udecode/plate';
import { CSSProperties } from 'react';
import { mapMentionable } from '../Plugins/MentionPlugin/helpers';
import { parseRawValue } from '../utils/parseRawValue';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';
import type { MentionableItems } from '../Plugins/MentionPlugin';

export const serializeRawToHtml = (
    raw: string,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
): string => {
    const nodes = parseRawValue({ raw });
    return serializeNodesToHtml(nodes, { columns, columnGap });
};
export const serializeRawToHtmlAsync = async (
    raw: string,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
): Promise<string> => {
    const nodes = parseRawValue({ raw });
    return Promise.resolve(serializeNodesToHtml(nodes, { columns, columnGap }));
};

export type SerializeNodesToHtmlOptions = {
    mentionable?: MentionableItems;
    columns?: number;
    columnGap?: CSSProperties['columnGap'];
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    { mentionable, columns = 1, columnGap = 'normal' }: SerializeNodesToHtmlOptions = {},
): string => {
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();

    let html = '';
    for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        if (isEmptyNode(node)) {
            html += '<br />';
        } else {
            html += serializeNodeToHtmlRecursive(node, {
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
