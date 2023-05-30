/* (c) Copyright Frontify Ltd., all rights reserved. */

import { reactCssPropsToCss } from '../utils/reactCssPropsToCss';
import { TElement } from '@udecode/plate';
import { TextStyles } from '@components/RichTextEditor/Plugins/TextStylePlugin/types';
import { CSSProperties } from 'react';

export const defaultNode = (node: TElement, children: string, styles: CSSProperties, defaultClassNames: string) => {
    const defaultStyles = reactCssPropsToCss(styles);

    if (node.type === TextStyles.heading1) {
        return `<h1>${getStyledChild(children, defaultStyles, defaultClassNames)}</h1>`;
    }
    if (node.type === TextStyles.heading2) {
        return `<h2>${getStyledChild(children, defaultStyles, defaultClassNames)}</h2>`;
    }
    if (node.type === TextStyles.heading3) {
        return `<h3>${getStyledChild(children, defaultStyles, defaultClassNames)}</h3>`;
    }
    if (node.type === TextStyles.heading4) {
        return `<h4>${getStyledChild(children, defaultStyles, defaultClassNames)}</h4>`;
    }
    return `<p>${getStyledChild(children, defaultStyles, defaultClassNames)}</p>`;
};

const getStyledChild = (children: string, styles: string, classNames: string) =>
    `<span class="${classNames}" style="${styles}">${children}</span>`;
