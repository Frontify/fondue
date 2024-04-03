/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TDescendant } from '@udecode/slate';
import { type CSSProperties } from 'react';

import { type PluginComposer, defaultPlugins } from '../Plugins';
import { type MentionableItems } from '../Plugins/MentionPlugin';
import { mapMentionable } from '../Plugins/MentionPlugin/helpers';
import { defaultStyles } from '../utils';
import { parseRawValue } from '../utils/parseRawValue';

import { type CSSPropertiesHover } from './types';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';

export const serializeRawToHtml = (
    raw: string,
    plugins: PluginComposer = defaultPlugins,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
): string => {
    const nodes = parseRawValue({ raw, plugins });
    const styles = plugins.getStyles;
    return serializeNodesToHtml(nodes, { columns, columnGap, styles });
};
export const serializeRawToHtmlAsync = async (
    raw: string,
    plugins: PluginComposer = defaultPlugins,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
): Promise<string> => {
    const nodes = parseRawValue({ raw, plugins });
    const styles = plugins.getStyles;
    return Promise.resolve(serializeNodesToHtml(nodes, { columns, columnGap, styles }));
};

export type SerializeNodesToHtmlOptions = {
    styles?: Record<string, CSSPropertiesHover>;
    mentionable?: MentionableItems;
    columns?: number;
    columnGap?: CSSProperties['columnGap'];
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    { mentionable, columns = 1, columnGap = 'normal', styles = defaultStyles }: SerializeNodesToHtmlOptions = {},
): string => {
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();

    let html = '';
    for (let i = 0, len = nodes.length; i < len; i++) {
        html += serializeNodeToHtmlRecursive(nodes[i], styles, {
            mappedMentionable,
        });
    }

    if (columns > 1) {
        return `<div style="columns:${columns}; column-gap:${columnGap};">${html}</div>`;
    }

    return html;
};
