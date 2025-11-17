/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListPlugin } from '@udecode/plate-list';

import { type PluginProps } from '../Plugin';

export type ListPluginProps = PluginProps & {
    isSoftBreak?: boolean;
};

export type WithListPlugin = ListPlugin & {
    isSoftBreak?: boolean;
};
