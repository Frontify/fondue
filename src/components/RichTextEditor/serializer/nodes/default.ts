/* (c) Copyright Frontify Ltd., all rights reserved. */

import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';
import { TElement } from '@udecode/plate';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/types';
import { CSSProperties } from 'react';

export const defaultNode = (node: TElement, children: string, styles: CSSProperties, defaultClassNames: string) => {
    const defaultStyles = reactCssPropsToCss(styles);

    if (node.type === TextStyles.heading1) {
        return `<h1 class="${defaultClassNames}">${getStyledChild(children, defaultStyles)}</h1>`;
    }
    if (node.type === TextStyles.heading2) {
        return `<h2 class="${defaultClassNames}">${getStyledChild(children, defaultStyles)}</h2>`;
    }
    if (node.type === TextStyles.heading3) {
        return `<h3 class="${defaultClassNames}">${getStyledChild(children, defaultStyles)}</h3>`;
    }
    if (node.type === TextStyles.heading4) {
        return `<h4 class="${defaultClassNames}">${getStyledChild(children, defaultStyles)}</h4>`;
    }
    return `<p class="${defaultClassNames}">${getStyledChild(children, defaultStyles)}</p>`;
};

const getStyledChild = (children: string, styles: string) => `<span style="${styles}">${children}</span>`;
