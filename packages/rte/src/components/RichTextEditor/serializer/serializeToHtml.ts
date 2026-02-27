/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TDescendant } from '@udecode/slate';
import { type CSSProperties } from 'react';

import { type PluginComposer, defaultPlugins } from '../Plugins';
import { OrderedListPlugin } from '../Plugins/ListPlugin/OrderedListPlugin';
import { UnorderedListPlugin } from '../Plugins/ListPlugin/UnorderedListPlugin';
import { type OrderedListLevelStyle, type UnorderedListLevelStyle } from '../Plugins/ListPlugin/types';
import { MentionPlugin, type MentionableItems } from '../Plugins/MentionPlugin';
import { mapMentionable } from '../Plugins/MentionPlugin/helpers';
import { defaultStyles } from '../utils';
import { parseRawValue } from '../utils/parseRawValue';

import { type CSSPropertiesHover } from './types';
import { serializeNodeToHtmlRecursive } from './utils/serializeNodeToHtmlRecursive';

const getMentionableFromPlugins = (plugins: PluginComposer): MentionableItems | undefined => {
    const mentionPlugin = plugins.registeredPlugins.find((plugin) => {
        return plugin instanceof MentionPlugin;
    });
    return mentionPlugin?.props?.mentionableItems;
};

const getOrderedListStylesFromPlugins = (plugins: PluginComposer): OrderedListLevelStyle[] | undefined => {
    const olPlugin = plugins.registeredPlugins.find((p) => p instanceof OrderedListPlugin);
    return olPlugin?.listStyles;
};

const getUnorderedListStylesFromPlugins = (plugins: PluginComposer): UnorderedListLevelStyle[] | undefined => {
    const ulPlugin = plugins.registeredPlugins.find((p) => p instanceof UnorderedListPlugin);
    return ulPlugin?.listStyles;
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
    const orderedListStyles = getOrderedListStylesFromPlugins(plugins);
    const unorderedListStyles = getUnorderedListStylesFromPlugins(plugins);
    return serializeNodesToHtml(nodes, {
        columns,
        columnGap,
        styles,
        customClass,
        mentionable,
        orderedListStyles,
        unorderedListStyles,
    });
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
    const orderedListStyles = getOrderedListStylesFromPlugins(plugins);
    const unorderedListStyles = getUnorderedListStylesFromPlugins(plugins);
    return Promise.resolve(
        serializeNodesToHtml(nodes, {
            columns,
            columnGap,
            styles,
            customClass,
            mentionable,
            orderedListStyles,
            unorderedListStyles,
        }),
    );
};

export type SerializeNodesToHtmlOptions = {
    styles?: Record<string, CSSPropertiesHover>;
    mentionable?: MentionableItems;
    columns?: number;
    columnGap?: CSSProperties['columnGap'];
    customClass?: string;
    orderedListStyles?: OrderedListLevelStyle[];
    unorderedListStyles?: UnorderedListLevelStyle[];
};

export const serializeNodesToHtml = (
    nodes: TDescendant[],
    {
        mentionable,
        columns = 1,
        columnGap = 'normal',
        customClass = '',
        styles = defaultStyles,
        orderedListStyles,
        unorderedListStyles,
    }: SerializeNodesToHtmlOptions = {},
): string => {
    const mappedMentionable = mentionable ? mapMentionable(mentionable) : new Map();

    let html = '';
    for (let i = 0, len = nodes.length; i < len; i++) {
        html += serializeNodeToHtmlRecursive(nodes[i], styles, {
            mappedMentionable,
            orderedListStyles,
            unorderedListStyles,
        });
    }

    const columnsStyle = customClass ? '' : `columns:${columns};`;
    const style = `${columnsStyle} column-gap:${columnGap};`;

    if (columns > 1 || customClass) {
        return `<div style="${style}" class="${customClass}">${html}</div>`;
    }

    return html;
};
