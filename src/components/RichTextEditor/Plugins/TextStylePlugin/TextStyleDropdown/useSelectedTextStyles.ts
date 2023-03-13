/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, getNodeEntries, isNode } from '@udecode/plate';
import { AvailableStyles, TextStyles } from '../TextStyles';

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
        }),
    );

    return nodeEntries.reduce<AvailableStyles[]>((styles, [node]) => {
        if (!isNode(node)) {
            return styles;
        }
        const styleToAdd = node?.textStyle as AvailableStyles;

        if (styleToAdd && !styles.includes(styleToAdd)) {
            styles.push(styleToAdd);
        }

        return styles.length > 0 ? styles : [TextStyles.ELEMENT_PARAGRAPH];
    }, []);
};
