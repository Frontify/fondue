/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, TElement, getNodeEntries, isElement, isType } from '@udecode/plate';
import { AVAILABLE_STYLE, AvailableStyles } from '../TextStyles';

export const useSelectedTextStyles = (editor: PlateEditor): AvailableStyles[] => {
    if (!editor || !editor.selection) {
        return [];
    }

    return Array.from(
        getNodeEntries(editor, {
            unhang: true,
            at: editor.selection,
            match: (node: TElement) => isElement(node) && isType(editor, node, AVAILABLE_STYLE),
        }),
    ).reduce<AvailableStyles[]>((types, current) => {
        const type = current[0].type as AvailableStyles;
        if (!types.includes(type)) {
            types.push(type);
        }
        return types;
    }, []);
};
