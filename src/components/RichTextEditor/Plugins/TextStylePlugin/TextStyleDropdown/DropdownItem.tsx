/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    PlateEditor,
    getAboveNode,
    getMark,
    getPreventDefaultHandler,
    setMarks,
    someNode,
    toggleNodeType,
} from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { MARK_TEXT_STYLE } from '../../ListPlugin/ListPlugin';
import { DropdownItemProps } from './types';

const isInList = (editor: PlateEditor) =>
    getAboveNode(editor, {
        match: { type: ELEMENT_LI },
        mode: 'lowest',
    });

export const DropdownItem = ({ editor, type, children }: DropdownItemProps) => {
    const isActive =
        !!editor?.selection && isInList(editor)
            ? (getMark(editor, MARK_TEXT_STYLE) as string) === type
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
                if (!editor || !editor.selection) {
                    return;
                }

                const aboveListItem = getAboveNode(editor, {
                    match: { type: ELEMENT_LI },
                    mode: 'lowest',
                });

                if (aboveListItem) {
                    setMarks(editor, { [MARK_TEXT_STYLE]: type });
                } else {
                    getPreventDefaultHandler(toggleNodeType, editor, {
                        activeType: type,
                        inactiveType: type,
                    })(event);
                }
            }}
        >
            {children}
        </button>
    );
};
