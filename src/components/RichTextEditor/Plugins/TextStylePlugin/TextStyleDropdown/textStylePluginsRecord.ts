/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { createParagraphPlugin } from '../../ParagraphPlugin/createParagraphPlugin';
import {
    SelectableTextStyles,
    TextStyles,
    createCustom1Plugin,
    createCustom2Plugin,
    createCustom3Plugin,
    createHeading1Plugin,
    createHeading2Plugin,
    createHeading3Plugin,
    createHeading4Plugin,
    createQuotePlugin,
} from '../TextStyles';

export const textStylePluginsRecord: Record<SelectableTextStyles, { plugin: () => PlatePlugin }> = {
    [TextStyles.ELEMENT_HEADING1]: { plugin: createHeading1Plugin },
    [TextStyles.ELEMENT_HEADING2]: { plugin: createHeading2Plugin },
    [TextStyles.ELEMENT_HEADING3]: { plugin: createHeading3Plugin },
    [TextStyles.ELEMENT_HEADING4]: { plugin: createHeading4Plugin },
    [TextStyles.ELEMENT_CUSTOM1]: { plugin: createCustom1Plugin },
    [TextStyles.ELEMENT_CUSTOM2]: { plugin: createCustom2Plugin },
    [TextStyles.ELEMENT_CUSTOM3]: { plugin: createCustom3Plugin },
    [TextStyles.ELEMENT_QUOTE]: { plugin: createQuotePlugin },
    [TextStyles.ELEMENT_PARAGRAPH]: { plugin: createParagraphPlugin },
};
