/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor } from '@udecode/plate-core';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { type ENode, type Value, getNodeEntries, isNode, isText, type TText } from '@udecode/slate';

import { ELEMENT_CHECK_ITEM } from '../../CheckboxListPlugin';
import { MARK_TEXT_STYLE } from '../../ListPlugin';

const getTextStyle = (node: ENode<Value>): string => {
    if (Array.isArray(node.children)) {
        const textNode: TText | undefined = node.children.find((node) => isText(node));

        return (textNode?.[MARK_TEXT_STYLE] as string | undefined) ?? '';
    }

    return ELEMENT_PARAGRAPH;
};

const excludeStyles = [ELEMENT_LI, ELEMENT_UL, ELEMENT_OL];

export const selectedTextStyles = (editor: PlateEditor): string[] => {
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
            node.type === ELEMENT_LIC || node.type === ELEMENT_CHECK_ITEM
                ? getTextStyle(node)
                : ((node.textStyle || node.type) as string);

        if (styleToAdd && !styles.includes(styleToAdd) && !excludeStyles.includes(styleToAdd)) {
            styles.push(styleToAdd);
        }

        return styles;
    }, []);
};
