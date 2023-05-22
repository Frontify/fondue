/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, PlateRenderElementProps, TElement } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement } from '../MarkupElement';
import { getTextStyleCssProperties } from '../helper';

export const LI_CLASSNAMES =
    '[&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline';

export const ListItemMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    return (
        <li style={getLiStyles(element)} {...attributes} className={LI_CLASSNAMES}>
            {children}
        </li>
    );
};

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}

export const getLiStyles = (element: TElement): CSSProperties => {
    return {
        ...getTextStyleCssProperties(getDeepestTextStyle(element)),
        counterIncrement: 'count',
    };
};

const getDeepestTextStyle = (node: TElement): string => {
    let textStyle;

    if (node.type === 'a') {
        textStyle = node.children[0].textStyle;
    } else if (node.children) {
        for (const childNode of node.children) {
            const deepestTextStyle = getDeepestTextStyle(childNode as TElement);
            if (deepestTextStyle && (!textStyle || deepestTextStyle.startsWith(textStyle))) {
                textStyle = deepestTextStyle;
            }
        }
    } else {
        textStyle = node.textStyle;
    }

    return textStyle as string;
};
