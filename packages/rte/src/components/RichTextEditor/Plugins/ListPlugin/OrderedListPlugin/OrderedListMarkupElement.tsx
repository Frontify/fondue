/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderLeafProps, useEditorRef } from '@udecode/plate-core';
import { ELEMENT_OL } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';
import { type CSSProperties } from 'react';

import { MarkupElement } from '../../MarkupElement';
import { DEFAULT_OL_STYLES, type OrderedListLevelStyle } from '../types';
import { getNestingLevel } from '../utils';

export const OL_CLASSES =
    "tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-whitespace-nowrap [&>li>p]:before:tw-pr-1 [&>li>p]:before:tw-tabular-nums [&>li>p]:before:tw-content-[counter(count,var(--counter-type))_'._'] [&>li>p]:before:tw-text-[color:var(--counter-color)]";

export const createOrderedListNode = (listStyles: OrderedListLevelStyle[] = DEFAULT_OL_STYLES) => {
    const OrderedListNode = ({ attributes, children, element }: PlateRenderLeafProps & { element: TElement }) => {
        const editor = useEditorRef();
        const nestingLevel = getNestingLevel(editor, element);
        const levelStyle = listStyles[nestingLevel % listStyles.length];

        return (
            <ol
                className={OL_CLASSES}
                {...attributes}
                style={
                    {
                        counterReset: 'count',
                        '--counter-type': levelStyle.counterType,
                        '--counter-color': levelStyle.color ?? 'currentColor',
                    } as CSSProperties
                }
            >
                {children}
            </ol>
        );
    };
    return OrderedListNode;
};

export class OrderedListMarkupElement extends MarkupElement {
    constructor(
        id = ELEMENT_OL,
        node: (props: PlateRenderLeafProps & { element: TElement }) => JSX.Element = createOrderedListNode(),
    ) {
        super(id, node);
    }
}
