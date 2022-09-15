/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, TElement, getNodeEntries, isElement, isType } from '@udecode/plate';
import { TEXT_STYLE_ID } from './textStyleTitles';
import { AvailableTextStyles } from './types';

export const useSelectedTextStyles = (editor: PlateEditor): AvailableTextStyles[] => {
    if (!editor || !editor.selection) {
        return [];
    }

    return Array.from(
        getNodeEntries(editor, {
            unhang: true,
            at: editor.selection,
            match: (node: TElement) => isElement(node) && isType(editor, node, Object.values(TEXT_STYLE_ID)),
        }),
    ).reduce<AvailableTextStyles[]>((types, current) => {
        const type = current[0].type as AvailableTextStyles;
        if (!types.includes(type)) {
            types.push(type);
        }
        return types;
    }, []);
};
