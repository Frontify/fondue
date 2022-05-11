/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@foundation/Icon';
import { getParent, getPreventDefaultHandler, usePlateEditorState } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { TextStyles, textStyleTitles } from '../utils/getTextStyles';

type DropdownTriggerProps = {
    editorId?: string;
    open: boolean;
};

export const DropdownTrigger = ({ editorId, open }: DropdownTriggerProps) => {
    const editor = usePlateEditorState(editorId);

    const getStyleInSelection = (): TextStyles | undefined => {
        if (editor.selection) {
            const parentEntry = getParent(editor, editor.selection);
            if (!parentEntry) {
                return TextStyles.ELEMENT_PARAGRAPH;
            }
            const [node] = parentEntry;
            return node.type;
        }
    };

    const activeStyleInSelection = getStyleInSelection();
    console.log(activeStyleInSelection);
    const label = activeStyleInSelection
        ? textStyleTitles[activeStyleInSelection]
        : textStyleTitles[TextStyles.ELEMENT_PARAGRAPH];

    return (
        <button
            data-test-id="textstyle-dropdown-trigger"
            type="button"
            className="tw-cursor-pointer tw-h-12 tw-w-full"
            onMouseDown={editor ? getPreventDefaultHandler() : undefined}
        >
            <div className="tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-overflow-hidden tw-text-text tw-rounded tw-gap-1 tw-p-2 box-neutral hover:tw-text-box-selected-inverse hover:tw-bg-box-selected tw-h-8">
                <span className="tw-text-s">{label || textStyleTitles[TextStyles.ELEMENT_PARAGRAPH]}</span>
                <div className={merge(['tw-transition-transform', open && 'tw-rotate-180'])}>
                    <IconCaretDown />
                </div>
            </div>
        </button>
    );
};
