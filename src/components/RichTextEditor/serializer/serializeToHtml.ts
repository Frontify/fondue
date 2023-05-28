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
    styles: Record<string, CSSProperties & { hover?: CSSProperties }>,
): string => {
    const nodes = parseRawValue({ raw });
    return serializeNodesToHtml(nodes, { columns, columnGap, styles });
};
export const serializeRawToHtmlAsync = async (
    raw: string,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
    styles: Record<string, CSSProperties & { hover?: CSSProperties }>,
): Promise<string> => {
    const nodes = parseRawValue({ raw });
    return Promise.resolve(serializeNodesToHtml(nodes, { columns, columnGap, styles }));
};

export type SerializeNodesToHtmlOptions = {
    mentionable?: MentionableItems;
    columns?: number;
    columnGap?: CSSProperties['columnGap'];
    styles?: Record<string, CSSProperties & { hover?: CSSProperties }>;
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    { mentionable, columns = 1, columnGap = 'normal', styles = {} }: SerializeNodesToHtmlOptions = {},
): string => {
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();

    let html = '';
    for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        if (isEmptyNode(node)) {
            html += '<br />';
        } else {
            html += serializeNodeToHtmlRecursive(node, styles, {
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
