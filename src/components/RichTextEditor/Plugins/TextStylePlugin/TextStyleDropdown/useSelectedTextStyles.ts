/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_OL,
    ELEMENT_UL,
    ENode,
    PlateEditor,
    Value,
    getNodeEntries,
    isNode,
    isText,
} from '@udecode/plate';
import { ELEMENT_CHECK_ITEM } from '../../CheckboxListPlugin';
import { MARK_TEXT_STYLE } from '../../ListPlugin/ListPlugin';
import { AvailableStyles, TextStyles } from '../TextStyles';

const getTextStyle = (node: ENode<Value>): AvailableStyles => {
    if (Array.isArray(node.children)) {
        const textNode = node.children.find((node) => isText(node)) ?? {};
        return textNode[MARK_TEXT_STYLE] ?? TextStyles.ELEMENT_PARAGRAPH;
    }

    return TextStyles.ELEMENT_PARAGRAPH;
};

const excludeStyles = [ELEMENT_LI, ELEMENT_UL, ELEMENT_OL];

export const useSelectedTextStyles = (editor: PlateEditor): AvailableStyles[] => {
    if (!editor || !editor.selection) {
        return [];
    }

    const nodeEntries = Array.from(
        getNodeEntries(editor, {
            unhang: true,
            at: editor.selection,
            reverse: true,
        }),
    );

    return nodeEntries.reduce<AvailableStyles[]>((styles, [node]) => {
        if (!isNode(node)) {
            return styles;
        }

        const styleToAdd =
            node.type === ELEMENT_LIC || node.type === ELEMENT_CHECK_ITEM
                ? getTextStyle(node)
                : (node.type as AvailableStyles);

        if (styleToAdd && !styles.includes(styleToAdd) && !excludeStyles.includes(styleToAdd)) {
            styles.push(styleToAdd);
        }

        return styles;
    }, []);
};
