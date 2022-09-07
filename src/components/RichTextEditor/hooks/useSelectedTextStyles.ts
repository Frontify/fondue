/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TElement, getNodeEntries, isElement, isType, usePlateEditorState } from '@udecode/plate';
import { ListStyles } from '../TextStyleDropdown/DropdownTrigger';
import { AvailableTextStyles } from '../types';
import { TextStyles } from '../utils/textStyles';

export const useSelectedTextStyles = (editorId?: string): AvailableTextStyles[] => {
    const editor = usePlateEditorState(editorId);
    if (!editor || !editor.selection) {
        return [];
    }

    return Array.from(
        getNodeEntries(editor, {
            unhang: true,
            at: editor.selection,
            match: (node: TElement) =>
                isElement(node) && isType(editor, node, Object.values({ ...TextStyles, ...ListStyles })),
        }),
    ).reduce<AvailableTextStyles[]>((types, current) => {
        const type = current[0].type as AvailableTextStyles;
        if (!types.includes(type)) {
            types.push(type);
        }
        return types;
    }, []);
};
