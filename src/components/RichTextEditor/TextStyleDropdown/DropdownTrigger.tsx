/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from "@foundation/Icon";
import { getPreventDefaultHandler, usePlateEditorState, withPlateProvider } from "@udecode/plate";
import { merge } from "@utilities/merge";
import React from "react";

type DropdownTriggerProps = {
    open: boolean;
};

export const DropdownTrigger = withPlateProvider(({ open }: DropdownTriggerProps) => {
    const editor = usePlateEditorState();

    return (
        <button
            className="tw-p-2 tw-pl-3 tw-py-1 tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-rounded tw-overflow-hidden tw-w-32 tw-cursor-default tw-shadow-sm tw-border tw-outline-none hover:tw-border-black-100 tw-border-black-30"
            onMouseDown={editor ? getPreventDefaultHandler() : undefined}
        >
            <span className="tw-text-md tw-text-black-70">Heading 1</span>
            <div className={merge(["tw-transition-transform", open && "tw-rotate-180"])}>
                <IconCaretDown />
            </div>
        </button>
    );
});
