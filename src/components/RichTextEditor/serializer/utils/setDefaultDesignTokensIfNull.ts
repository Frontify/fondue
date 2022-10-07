import { DesignTokens } from '@components/RichTextEditor/types';
import { defaultDesignTokens } from '@components/RichTextEditor/utils/defaultDesignTokens';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/TextStyles';

export const setDefaultDesignTokensIfNull = (designTokens: DesignTokens): DesignTokens => {
    for (const element of Object.values(TextStyles).filter((textStyle) => textStyle !== TextStyles.ELEMENT_PARAGRAPH)) {
        if (!designTokens[element]) {
            designTokens[element] = defaultDesignTokens[element];
        }
    }
    return designTokens;
};
