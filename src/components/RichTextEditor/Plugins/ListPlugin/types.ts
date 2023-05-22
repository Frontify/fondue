/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ListPlugin } from '@udecode/plate';
import { PluginProps } from '../Plugin';

export type ListPluginProps = PluginProps & {
    isSoftBreak?: boolean;
};

export type WithListPlugin = ListPlugin & {
    isSoftBreak?: boolean;
};
