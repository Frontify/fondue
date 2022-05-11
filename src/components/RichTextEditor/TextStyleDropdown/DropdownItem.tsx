/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPreventDefaultHandler, someNode, toggleNodeType, unwrapList, usePlateEditorState } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getTextStyles, TextStyles, TextStyleType } from '../utils/getTextStyles';

type DropdownItemProps = {
    editorId?: string;
    label: string;
    type: TextStyles;
    textStyles?: TextStyleType[];
};

export const DropdownItem = ({ editorId, label, type, textStyles }: DropdownItemProps) => {
    const editor = usePlateEditorState(editorId);
    const isActive = !!editor?.selection && someNode(editor, { match: { type } });
    return (
        <button
            data-test-id="textstyle-option"
            type="button"
            className={merge([
                'tw-block tw-w-full tw-text-left tw-border-b tw-px-3 tw-py-2 tw-border-line tw-outline-none tw-cursor-pointer tw-truncate hover:tw-bg-box-neutral-hover hover:w-text-box-neutral-inverse-hover',
                isActive ? 'tw-text-box-neutral-inverse tw-bg-box-neutral' : 'tw-text-text',
                getTextStyles(type, textStyles),
            ])}
            onMouseDown={(event) => {
                if (!editor || !editor.selection) {
                    return;
                }

                unwrapList(editor, {});

                getPreventDefaultHandler(toggleNodeType, editor, {
                    activeType: type,
                    inactiveType: type,
                })(event);
            }}
        >
            {label}
        </button>
    );
};
