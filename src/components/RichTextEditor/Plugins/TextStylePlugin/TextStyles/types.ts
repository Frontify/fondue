/* (c) Copyright Frontify Ltd., all rights reserved. */

import { OptionalTextStyles } from '.';
import { PluginProps } from '../../Plugin';

export type TextStylePluginProps = PluginProps & {
    selectableStyles: OptionalTextStyles[];
};
