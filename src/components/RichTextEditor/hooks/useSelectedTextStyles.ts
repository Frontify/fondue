import { getNodes, isElement, isType, usePlateEditorState } from '@udecode/plate';
import { ListStyles } from '../TextStyleDropdown/DropdownTrigger';
import { AvailableTextStyles } from '../types';
import { TextStyles } from '../utils/getTextStyles';

export const useSelectedTextStyles = (editorId?: string): AvailableTextStyles[] => {
    const editor = usePlateEditorState(editorId);
    if (!editor.selection) {
        return [];
    }

    return Array.from(
        getNodes(editor, {
            unhang: true,
            at: editor.selection,
            match: (node) => isElement(node) && isType(editor, node, Object.values({ ...TextStyles, ...ListStyles })),
        }),
    ).reduce<AvailableTextStyles[]>((types, current) => {
        const type = current[0].type as AvailableTextStyles;
        if (!types.includes(type)) {
            types.push(type);
        }
        return types;
    }, []);
};
