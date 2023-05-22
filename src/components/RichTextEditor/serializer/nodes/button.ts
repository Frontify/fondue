/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextButtonStyle, getButtonStyleCssProperties } from '@components/RichTextEditor/Plugins';
import { TElement } from '@udecode/plate';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';

export const buttonNode = (node: TElement, children: string, defaultClassNames: string) => {
    const buttonStyle = getButtonStyleCssProperties((node.buttonStyle as RichTextButtonStyle) ?? 'primary');
    const defaultStyles = reactCssPropsToCss(buttonStyle);
    return `<a href="${node.url}"
                target="${node.target ?? '_blank'}"
                style="${defaultStyles}"
                class="${defaultClassNames}"
                onmouseenter="this.setAttribute('style', '${defaultStyles} ${reactCssPropsToCss(buttonStyle.hover)}');"
                onmouseleave="this.setAttribute('style', '${reactCssPropsToCss(buttonStyle)}');"
                >${children}</a>`;
};
