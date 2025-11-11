/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderElementProps } from '@udecode/plate-core';
import { ELEMENT_LI } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';
import { type CSSProperties } from 'react';

import { useRichTextEditorContext } from '@components/RichTextEditor/context';

import { MarkupElement } from '../MarkupElement';
import { TextStyles } from '../TextStylePlugin';

export const LI_CLASSNAMES =
    '[&>p]:before:tw-flex [&>p]:before:tw-justify-end [&>p]:before:tw-w-[1.2em] !tw-no-underline !tw-list-item';

export const ListItemMarkupElementNode = ({ attributes, children, element }: PlateRenderElementProps) => {
    const { styles } = useRichTextEditorContext();
    return (
        <li style={getLiStyles(element, styles)} {...attributes} className={LI_CLASSNAMES}>
            {children}
        </li>
    );
};

export class ListItemMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_LI, node = ListItemMarkupElementNode) {
        super(id, node);
    }
}

export const getLiStyles = (element: TElement, styles: Record<string, CSSProperties>): CSSProperties => {
    return {
        ...styles[getDeepestTextStyle(element) ?? TextStyles.p],
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
