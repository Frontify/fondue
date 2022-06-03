/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from "@foundation/Icon";
import {
    getNodes,
    getPreventDefaultHandler,
    isElement,
    isType,
    PlateEditor,
    usePlateEditorState,
} from "@udecode/plate";
import { merge } from "@utilities/merge";
import React from "react";
import { TextStyles, textStyleTitles } from "../utils/getTextStyles";

type DropdownTriggerProps = {
    editorId?: string;
    open: boolean;
};
const DEFAULT_TEXTSTYLE_VALUE = "Mixed";

enum ListType {
    UL = "ul",
    OL = "ol",
    CHECKLIST_ITEM = "checkbox_item",
}

const listTitle: Record<ListType, string> = {
    [ListType.UL]: "Bullet List",
    [ListType.OL]: "List",
    [ListType.CHECKLIST_ITEM]: "Checklist",
};

type AvailableTextStyles = ListType & TextStyles;

const availableTextStyleTitles: Record<AvailableTextStyles, string> = { ...listTitle, ...textStyleTitles };

const getSelectedTextStyles: (editor: PlateEditor) => AvailableTextStyles[] = (editor) => {
    if (editor.selection) {
        return Array.from(
            getNodes(editor, {
                unhang: true,
                at: editor.selection,
                match: (node) => isElement(node) && isType(editor, node, Object.values({ ...TextStyles, ...ListType })),
            }),
        ).reduce<AvailableTextStyles[]>((types, current) => {
            const type = current[0].type as AvailableTextStyles;
            if (!types.includes(type)) {
                types.push(type);
            }

            return types;
        }, []);
    }

    return [];
};

export const DropdownTrigger = ({ editorId, open }: DropdownTriggerProps) => {
    const editor = usePlateEditorState(editorId);

    const selectedTextStyles = getSelectedTextStyles(editor);

    const label =
        selectedTextStyles.length === 1 ? availableTextStyleTitles[selectedTextStyles[0]] : DEFAULT_TEXTSTYLE_VALUE;

    return (
        <button
            data-test-id="textstyle-dropdown-trigger"
            type="button"
            className="tw-cursor-pointer tw-h-12 tw-w-full"
            onMouseDown={editor ? getPreventDefaultHandler() : undefined}
        >
            <div
                className={merge([
                    "tw-relative tw-inline-flex tw-flex-row tw-items-center tw-justify-between tw-overflow-hidden tw-text-text tw-rounded tw-gap-1 tw-p-2 hover:tw-text-text hover:tw-bg-box-neutral tw-h-8 tw-w-28",
                    open && "tw-bg-box-neutral",
                ])}
            >
                <span className="tw-text-s tw-truncate">{label}</span>
                <div className={merge(["tw-transition-transform", open && "tw-rotate-180"])}>
                    <IconCaretDown />
                </div>
            </div>
        </button>
    );
};
