/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate';
import { SelectableTextStyles, TextStyles } from '../TextStyles';
import { createCustom1Plugin } from '../TextStyles/createCustom1Plugin';
import { createCustom2Plugin } from '../TextStyles/createCustom2Plugin';
import { createCustom3Plugin } from '../TextStyles/createCustom3Plugin';
import { createHeading1Plugin } from '../TextStyles/createHeading1Plugin';
import { createHeading2Plugin } from '../TextStyles/createHeading2Plugin';
import { createHeading3Plugin } from '../TextStyles/createHeading3Plugin';
import { createHeading4Plugin } from '../TextStyles/createHeading4Plugin';
import { createQuotePlugin } from '../TextStyles/createQuotePlugin';
import { createParagraphPlugin } from '../../ParagraphPlugin/createParagraphPlugin';

export const textStylePluginsRecord: Record<SelectableTextStyles, { plugin: () => PlatePlugin }> = {
    [TextStyles.ELEMENT_HEADING1]: { plugin: createHeading1Plugin() },
    [TextStyles.ELEMENT_HEADING2]: { plugin: createHeading2Plugin() },
    [TextStyles.ELEMENT_HEADING3]: { plugin: createHeading3Plugin() },
    [TextStyles.ELEMENT_HEADING4]: { plugin: createHeading4Plugin() },
    [TextStyles.ELEMENT_CUSTOM1]: { plugin: createCustom1Plugin() },
    [TextStyles.ELEMENT_CUSTOM2]: { plugin: createCustom2Plugin() },
    [TextStyles.ELEMENT_CUSTOM3]: { plugin: createCustom3Plugin() },
    [TextStyles.ELEMENT_QUOTE]: { plugin: createQuotePlugin() },
    [TextStyles.ELEMENT_PARAGRAPH]: { plugin: createParagraphPlugin() },
};
