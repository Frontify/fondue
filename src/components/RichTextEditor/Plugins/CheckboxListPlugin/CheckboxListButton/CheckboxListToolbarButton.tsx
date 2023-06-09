/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BlockToolbarButton,
    ELEMENT_PARAGRAPH,
    NodeOf,
    PlateEditor,
    ToolbarButtonProps,
    Value,
    focusEditor,
    getListItemEntry,
    getNode,
    getParentNode,
    setElements,
    toggleNodeType,
    unwrapList,
    useEventPlateId,
    usePlateEditorState,
    withoutNormalizing,
} from '@udecode/plate';
import React from 'react';
import { ELEMENT_CHECK_ITEM } from '../id';

export const CheckboxListToolbarButton = ({
    id,
    type = ELEMENT_CHECK_ITEM,
    ...props
}: ToolbarButtonProps & { type?: string }) => {
    const editor = usePlateEditorState(useEventPlateId(id));
    const node = editor.selection?.focus.path && getNode(editor, editor?.selection?.focus?.path);

    const res = !!editor?.selection && getListItemEntry(editor);
    const isActive = !!res && res.list[0].type === type;

    return (
        <BlockToolbarButton
            active={isActive}
            type={type}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                toggleCheckboxList(editor, { type, isActive, node });
                focusEditor(editor);
            }}
            {...props}
        />
    );
};

export const toggleCheckboxList = <V extends Value>(
    editor: PlateEditor<V>,
    { type, isActive, node }: { type: string; isActive: boolean; node?: NodeOf<PlateEditor<Value>> | null },
) =>
    withoutNormalizing(editor, () => {
        if (!editor || !editor.selection) {
            return;
        }

        if (!isActive) {
            unwrapList(editor, {});
        }

        toggleNodeType(editor, {
            activeType: type,
        });

        if (!node?.textStyle) {
            const parentNode = getParentNode(editor, editor?.selection?.focus?.path);
            const textStyle = parentNode && parentNode[0].type;
            setElements(editor, {
                textStyle,
            });
        }

        if (isActive) {
            setElements(editor, {
                type: (node?.textStyle as string) ?? ELEMENT_PARAGRAPH,
            });
        }
    });
