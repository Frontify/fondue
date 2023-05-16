/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, PluginProps } from '../Plugin';

export const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

export type TextStylePluginProps = PluginProps & {
    textStyles?: Plugin[];
};
