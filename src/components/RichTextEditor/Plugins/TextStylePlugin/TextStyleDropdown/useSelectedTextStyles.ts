/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LIC,
    ENode,
    PlateEditor,
    TElement,
    Value,
    getNodeEntries,
    isElement,
    isNode,
    isText,
    isType,
} from '@udecode/plate';
import { MARK_TEXT_STYLE } from '../../ListPlugin/ListPlugin';
import { AVAILABLE_STYLE, AvailableStyles, TextStyles } from '../TextStyles';

const getLicStyle = (node: ENode<Value>): AvailableStyles => {
    if (Array.isArray(node.children)) {
        const textNode = node.children.find((node) => isText(node)) ?? {};
        return textNode[MARK_TEXT_STYLE] ?? TextStyles.ELEMENT_PARAGRAPH;
    }

    return TextStyles.ELEMENT_PARAGRAPH;
};

export const useSelectedTextStyles = (editor: PlateEditor): AvailableStyles[] => {
    if (!editor || !editor.selection) {
        return [];
    }

    const nodeEntries = Array.from(
        getNodeEntries(editor, {
            unhang: true,
            mode: 'lowest',
            at: editor.selection,
            reverse: true,
            match: (node: TElement) => isElement(node) && isType(editor, node, AVAILABLE_STYLE),
        }),
    );

    return nodeEntries.reduce<AvailableStyles[]>((styles, [node]) => {
        if (!isNode(node)) {
            return styles;
        }

        const styleToAdd = node.type === ELEMENT_LIC ? getLicStyle(node) : (node.type as AvailableStyles);

        if (styleToAdd && !styles.includes(styleToAdd)) {
            styles.push(styleToAdd);
        }

        return styles;
    }, []);
};
