/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectableTextStyles } from '.';
import { PluginProps } from '../../Plugin';

export type TextStylePluginProps = PluginProps & {
    textStyles: SelectableTextStyles[];
};
