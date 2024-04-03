/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor, toggleNodeType, useEditorState, useEventPlateId } from '@udecode/plate-core';
import { unwrapList } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import {
    type NodeOf,
    type Value,
    getNode,
    getParentNode,
    setElements,
    someNode,
    withoutNormalizing,
} from '@udecode/slate';
import { focusEditor } from '@udecode/slate-react';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins/helper';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import IconListCheck16 from '@foundation/Icon/Generated/IconListCheck16';

import { ELEMENT_CHECK_ITEM } from '../id';

export const CheckboxListToolbarButton = ({ id, type = ELEMENT_CHECK_ITEM }: { id: string; type?: string }) => {
    const editor = useEditorState(useEventPlateId(id));
    const node = editor?.selection?.focus.path && getNode(editor, editor?.selection?.focus?.path);
    const isActive = !!editor?.selection && someNode(editor, { match: { type } });

    return (
        <ToolbarButton
            pressed={isActive}
            onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();

                toggleCheckboxList(editor, { type, isActive, node });
                focusEditor(editor);
            }}
        >
            <IconStylingWrapper icon={<IconListCheck16 />} />
        </ToolbarButton>
    );
};

export const toggleCheckboxList = <V extends Value>(
    editor: PlateEditor<V>,
    { type, isActive, node }: { type: string; isActive: boolean; node?: NodeOf<PlateEditor<Value>> | null },
) =>
    withoutNormalizing(editor, () => {
        if (!editor?.selection) {
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
