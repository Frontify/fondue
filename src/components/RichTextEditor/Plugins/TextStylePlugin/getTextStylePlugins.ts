/* (c) Copyright Frontify Ltd., all rights reserved. */

import { textStylePluginsRecord } from './TextStyleDropdown/textStylePluginsRecord';
import { OptionalTextStyles } from './TextStyles';

export const getTextStylePlugins = (textStyles: OptionalTextStyles[]) =>
    textStyles.map((style) => textStylePluginsRecord[style].plugin());
