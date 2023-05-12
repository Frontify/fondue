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
import { MARK_TEXT_STYLE } from '../../ListPlugin';

const getTextStyle = (node: ENode<Value>): string => {
    if (Array.isArray(node.children)) {
        const textNode = node.children.find((node) => isText(node)) ?? {};
        return textNode[MARK_TEXT_STYLE] ?? 'p';
    }

    return 'p';
};

const excludeStyles = [ELEMENT_LI, ELEMENT_UL, ELEMENT_OL];

export const useSelectedTextStyles = (editor: PlateEditor): string => {
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

    return nodeEntries.reduce<string[]>((styles, [node]) => {
        if (!isNode(node)) {
            return styles;
        }

        const styleToAdd =
            node.type === ELEMENT_LIC || node.type === ELEMENT_CHECK_ITEM ? getTextStyle(node) : (node.type as string);

        if (styleToAdd && !styles.includes(styleToAdd) && !excludeStyles.includes(styleToAdd)) {
            styles.push(styleToAdd);
        }

        return styles;
    }, []);
};
