/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, PlateRenderElementProps, TElement } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement } from '../MarkupElement';
import { getTextStyleCssProperties } from '../';

export const LI_CLASSNAMES =
    '[&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline';

export const getLiStyles = (element: TElement): CSSProperties => {
    return {
        ...getTextStyleCssProperties(element.children[0].textStyle as string),
        counterIncrement: 'count',
    };
};
export const ListItemMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    return (
        <li
            style={getTextStyleCssProperties(element.children[0].textStyle as string)}
            {...attributes}
            className={LI_CLASSNAMES}
        >
            {children}
        </li>
    );
};

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}
