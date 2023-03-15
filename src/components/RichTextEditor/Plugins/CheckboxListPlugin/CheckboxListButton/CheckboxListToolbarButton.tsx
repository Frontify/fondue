/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import {
    BlockToolbarButtonProps,
    ELEMENT_PARAGRAPH,
    ToolbarButton,
    getNode,
    getPreventDefaultHandler,
    setElements,
    someNode,
    toggleNodeType,
    unwrapList,
    useEventPlateId,
    usePlateEditorState,
    withPlateProvider,
} from '@udecode/plate';
import React from 'react';

export const CheckboxListToolbarButton = withPlateProvider(
    ({ id, type, active, ...props }: BlockToolbarButtonProps) => {
        const editor = usePlateEditorState(useEventPlateId(id));
        const node = editor.selection?.focus.path && getNode(editor, editor?.selection?.focus?.path);

        const isActive = active ?? (!!editor?.selection && someNode(editor, { match: { type } }));

        return (
            <ToolbarButton
                tooltip={getTooltip('Checklist')}
                active={isActive}
                onMouseDown={(event) => {
                    if (!editor || !editor.selection) {
                        return;
                    }

                    if (!isActive) {
                        unwrapList(editor, {});
                    }

                    getPreventDefaultHandler(toggleNodeType, editor, {
                        activeType: type,
                    })(event);

                    if (isActive) {
                        setElements(editor, {
                            type: (node?.textStyle as string) ?? ELEMENT_PARAGRAPH,
                        });
                    }
                }}
                {...props}
            />
        );
    },
);
