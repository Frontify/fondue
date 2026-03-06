/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListPlugin } from '@udecode/plate-list';

import { type PluginProps } from '../Plugin';

export type ListPluginProps = PluginProps & {
    isSoftBreak?: boolean;
};

export type WithListPlugin = ListPlugin & {
    isSoftBreak?: boolean;
};

export type OrderedListLevelStyle = {
    counterType: string;
    color?: string;
};

export type UnorderedListLevelStyle = {
    shape: string;
    color?: string;
    size?: string;
};

export const DEFAULT_OL_STYLES: OrderedListLevelStyle[] = [
    { counterType: 'decimal' },
    { counterType: 'lower-alpha' },
    { counterType: 'lower-roman' },
];

export const DEFAULT_UL_STYLES: UnorderedListLevelStyle[] = [{ shape: "'\u2022'" }];

export type OrderedListPluginProps = ListPluginProps & {
    listStyles?: OrderedListLevelStyle[];
};

export type UnorderedListPluginProps = ListPluginProps & {
    listStyles?: UnorderedListLevelStyle[];
};
