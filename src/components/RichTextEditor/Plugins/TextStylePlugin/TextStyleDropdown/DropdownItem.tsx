/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LI, PlateEditor, getAboveNode, getMark, setMarks, someNode, toggleNodeType } from '@udecode/plate';
import React from 'react';
import { ELEMENT_CHECK_ITEM } from '../../CheckboxListPlugin';
import { MARK_TEXT_STYLE } from '../../ListPlugin/ListPlugin';
import { merge } from '@utilities/merge';
import { DropdownItemProps } from './types';

const isInList = (editor: PlateEditor) =>
    getAboveNode(editor, {
        match: { type: ELEMENT_LI },
        mode: 'lowest',
    }) ||
    someNode(editor, {
        match: { type: ELEMENT_CHECK_ITEM },
        mode: 'lowest',
    });

export const DropdownItem = ({ editor, type, children }: DropdownItemProps) => {
    const isActive = editor?.selection
        ? getMark(editor, MARK_TEXT_STYLE) === type.id
        : someNode(editor, { match: { type } });

    return (
        <button
            data-test-id="textstyle-option"
            type="button"
            className={merge([
                'tw-block tw-w-full tw-text-left tw-px-3 tw-py-2 tw-outline-none tw-cursor-pointer tw-truncate hover:tw-bg-box-neutral-hover hover:w-text-box-neutral-inverse-hover tw-max-h-20 tw-max-w-[15rem] tw-min-h-[2.25rem]',
                isActive ? 'tw-text-box-neutral-inverse tw-bg-box-neutral' : 'tw-text-text',
            ])}
            onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();

                if (!editor || !editor.selection) {
                    return;
                }
                setMarks(editor, { [MARK_TEXT_STYLE]: type.id });
                if (!isInList(editor)) {
                    toggleNodeType(editor, {
                        activeType: type.id,
                        inactiveType: type.id,
                    });
                }
            }}
        >
            {children}
        </button>
    );
};
