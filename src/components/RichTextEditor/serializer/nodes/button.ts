/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextButtonStyle } from '@components/RichTextEditor/Plugins';
import { getButtonStyle } from '@components/RichTextEditor/Plugins/ButtonPlugin/ButtonMarkupElement/ButtonMarkupElementNode';
import { DesignTokens } from '@components/RichTextEditor/types';
import { TElement } from '@udecode/plate-core';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';

export const buttonNode = (node: TElement, children: string, designTokens: DesignTokens, defaultClassNames: string) => {
    const buttonStyle = getButtonStyle(designTokens, (node.buttonStyle as RichTextButtonStyle) ?? 'primary');
    const defaultStyles = reactCssPropsToCss(buttonStyle);
    return `<a href="${node.url}"
                target="${node.target ?? '_blank'}"
                style="${defaultStyles}"
                class="${defaultClassNames}"
                onmouseenter="this.setAttribute('style', '${defaultStyles} ${reactCssPropsToCss(buttonStyle.hover)}');"
                onmouseleave="this.setAttribute('style', '${reactCssPropsToCss(buttonStyle)}');"
                >${children}</a>`;
};
