/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderLeafProps, useEditorRef } from '@udecode/plate-core';
import { ELEMENT_OL } from '@udecode/plate-list';
import { type TElement } from '@udecode/slate';
import { useMemo } from 'react';

import { MarkupElement } from '../../MarkupElement';
import { ListBulletContext } from '../ListBulletContext';
import { DEFAULT_OL_STYLES, type OrderedListLevelStyle } from '../types';
import { getNestingLevel } from '../utils';

export const OL_CLASSES =
    'tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [li_&]:tw-mb-0 [counter-reset:list-counter]';

export const createOrderedListNode = (listStyles: OrderedListLevelStyle[] = DEFAULT_OL_STYLES) => {
    // eslint-disable-next-line @eslint-react/component-hook-factories
    const OrderedListNode = ({ attributes, children, element }: PlateRenderLeafProps & { element: TElement }) => {
        const editor = useEditorRef();
        const nestingLevel = getNestingLevel(editor, element);
        const levelStyle = listStyles[nestingLevel % listStyles.length];

        const bulletInfo = useMemo(
            () => ({
                type: 'ol' as const,
                counterType: levelStyle.counterType,
                color: levelStyle.color ?? 'currentColor',
            }),
            [levelStyle],
        );

        return (
            <ListBulletContext.Provider value={bulletInfo}>
                <ol className={OL_CLASSES} {...attributes}>
                    {children}
                </ol>
            </ListBulletContext.Provider>
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
