/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TDescendant } from '@udecode/slate';
import { type CSSProperties } from 'react';

import { type PluginComposer, defaultPlugins } from '../Plugins';
import { type MentionableItems } from '../Plugins/MentionPlugin';
import { mapMentionable } from '../Plugins/MentionPlugin/helpers';
import { MENTION_PLUGIN } from '../Plugins/MentionPlugin/id';
import { type MentionPluginProps } from '../Plugins/MentionPlugin/types';
import { defaultStyles } from '../utils';
import { parseRawValue } from '../utils/parseRawValue';

import { type CSSPropertiesHover } from './types';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';

const getMentionableFromPlugins = (plugins: PluginComposer): MentionableItems | undefined => {
    const mentionPlugin = plugins.registeredPlugins.find((p) => p.id === MENTION_PLUGIN);
    return (mentionPlugin?.props as MentionPluginProps | undefined)?.mentionableItems;
};

export const serializeRawToHtml = (
    raw: string,
    plugins: PluginComposer = defaultPlugins,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
    customClass = '',
): string => {
    const nodes = parseRawValue({ raw, plugins });
    const styles = plugins.getStyles;
    const mentionable = getMentionableFromPlugins(plugins);
    return serializeNodesToHtml(nodes, { columns, columnGap, styles, customClass, mentionable });
};
export const serializeRawToHtmlAsync = async (
    raw: string,
    plugins: PluginComposer = defaultPlugins,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
    customClass = '',
): Promise<string> => {
    const nodes = parseRawValue({ raw, plugins });
    const styles = plugins.getStyles;
    const mentionable = getMentionableFromPlugins(plugins);
    return Promise.resolve(serializeNodesToHtml(nodes, { columns, columnGap, styles, customClass, mentionable }));
};

export type SerializeNodesToHtmlOptions = {
    styles?: Record<string, CSSPropertiesHover>;
    mentionable?: MentionableItems;
    columns?: number;
    columnGap?: CSSProperties['columnGap'];
    customClass?: string;
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    {
        mentionable,
        columns = 1,
        columnGap = 'normal',
        customClass = '',
        styles = defaultStyles,
    }: SerializeNodesToHtmlOptions = {},
): string => {
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();

    let html = '';
    for (let i = 0, len = nodes.length; i < len; i++) {
        html += serializeNodeToHtmlRecursive(nodes[i], styles, {
            mappedMentionable,
        });
    }

    const columnsStyle = customClass ? '' : `columns:${columns};`;
    const style = `${columnsStyle} column-gap:${columnGap};`;

    if (columns > 1 || customClass) {
        return `<div style="${style}" class="${customClass}">${html}</div>`;
    }

    return html;
};
