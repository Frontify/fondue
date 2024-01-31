/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TElement } from '@udecode/plate';
import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';
import { CSSPropertiesHover } from '../types';

export type ButtonStylesType = Record<string, Record<string, CSSPropertiesHover>>;

export const buttonNode = (node: TElement, children: string, defaultClassNames: string, styles: ButtonStylesType) => {
    const buttonStyles = styles['button-plugin'];
    const buttonTypeString = (node.buttonStyle as string) ?? 'primary';
    const buttonType = `button${buttonTypeString.charAt(0).toUpperCase()}${buttonTypeString.slice(1)}`;
    const buttonStyle = buttonStyles[buttonType];

    const defaultStyles = reactCssPropsToCss(buttonStyle);
    return `<a href="${node.url}"
                target="${node.target ?? '_blank'}"
                dir="auto"
                style="${defaultStyles}"
                class="${defaultClassNames}"
                onmouseenter="this.setAttribute('style', '${defaultStyles} ${reactCssPropsToCss(buttonStyle.hover)}');"
                onmouseleave="this.setAttribute('style', '${reactCssPropsToCss(buttonStyle)}');"
                >${children}</a>`;
};
