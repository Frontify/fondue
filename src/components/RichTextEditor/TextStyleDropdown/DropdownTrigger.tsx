/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from "@foundation/Icon";
import { getParent, getPreventDefaultHandler, usePlateEditorState } from "@udecode/plate";
import { merge } from "@utilities/merge";
import React from "react";
import { TextStyles, textStyleTitles } from "../utils/getTextStyles";

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
                return TextStyles.ELEMENT_HEADING1;
            }
            const [node] = parentEntry;
            return node.type;
        }
    };

    const activeStyleInSelection = getStyleInSelection();
    const label = activeStyleInSelection
        ? textStyleTitles[activeStyleInSelection]
        : textStyleTitles[TextStyles.ELEMENT_HEADING1];

    return (
        <button
            data-test-id="textstyle-dropdown-trigger"
            className="tw-p-2 tw-pl-3 tw-py-1 tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-rounded tw-overflow-hidden tw-w-32 tw-cursor-default tw-shadow-sm tw-border tw-outline-none hover:tw-border-black-100 tw-border-black-30"
            onMouseDown={editor ? getPreventDefaultHandler() : undefined}
        >
            <span className="tw-text-md tw-text-black-70">{label}</span>
            <div className={merge(["tw-transition-transform", open && "tw-rotate-180"])}>
                <IconCaretDown />
            </div>
        </button>
    );
};
