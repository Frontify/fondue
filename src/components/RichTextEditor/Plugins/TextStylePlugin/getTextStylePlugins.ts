/* (c) Copyright Frontify Ltd., all rights reserved. */

import { textStylePluginsRecord } from './TextStyleDropdown/textStylePluginsRecord';
import { SelectableTextStyles } from './TextStyles';

export const getTextStylePlugins = (textStyles: SelectableTextStyles[]) =>
    textStyles.map((style) => textStylePluginsRecord[style].plugin());
