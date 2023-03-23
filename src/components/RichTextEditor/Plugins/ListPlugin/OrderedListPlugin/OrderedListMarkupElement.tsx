/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_OL,
    PlateEditor,
    PlateRenderLeafProps,
    TElement,
    findNodePath,
    getNodeAncestors,
    usePlateEditorRef,
} from '@udecode/plate';
import React from 'react';
import { MarkupElement } from '../../MarkupElement';

const LIST_TYPES = [
    "[&>li>p]:before:tw-content-[counter(count,decimal)_'._']",
    "[&>li>p]:before:tw-content-[counter(count,_lower-alpha)_'._']",
    "[&>li>p]:before:tw-content-[counter(count,lower-roman)_'._']",
];

const getNestingLevel = (editor: PlateEditor, element: TElement) => {
    const path = findNodePath(editor, element);
    if (!path) {
        return 0;
    }

    const nodeAncestors = getNodeAncestors(editor, path);
    return Array.from(nodeAncestors).filter((node) => node[0].type === ELEMENT_OL).length;
};

export const getOrderedListClasses = (nestingLevel: number) =>
    `tw-list-none tw-pl-[10px] tw-mb-[10px] tw-ml-[15px] [&>li>p]:before:tw-pr-1 ${LIST_TYPES[nestingLevel % 3]}`;
export const OL_STYLES = { counterReset: 'count' };

export const OrderedListMarkupElementNode = ({
    attributes,
    children,
    element,
}: PlateRenderLeafProps & { element: TElement }) => {
    const editor = usePlateEditorRef();
    const nestingLevel = getNestingLevel(editor, element);

    return (
        <ol className={getOrderedListClasses(nestingLevel)} {...attributes} style={OL_STYLES}>
            {children}
        </ol>
    );
};

export class OrderedListMarkupElement extends MarkupElement {
    constructor(id = ELEMENT_OL, node = OrderedListMarkupElementNode) {
        super(id, node);
    }
}
