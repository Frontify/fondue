/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarDropdown } from "@udecode/plate";
import React, { useCallback, useState } from "react";
import { TextStyles, textStyleTitles, TextStyleType } from "../utils/getTextStyles";
import { DropdownItem } from "./DropdownItem";
import { DropdownTrigger } from "./DropdownTrigger";

type TextStyleDropdownProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
};

export const TextStyleDropdown = ({ editorId, textStyles }: TextStyleDropdownProps) => {
    const [open, setOpen] = useState(false);

    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return (
        <ToolbarDropdown
            control={<DropdownTrigger editorId={editorId} open={open} />}
            open={open}
            onOpen={onToggle}
            onClose={onToggle}
        >
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_HEADING1]}
                type={TextStyles.ELEMENT_HEADING1}
                textStyles={textStyles}
            />
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_HEADING2]}
                type={TextStyles.ELEMENT_HEADING2}
                textStyles={textStyles}
            />
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_HEADING3]}
                type={TextStyles.ELEMENT_HEADING3}
                textStyles={textStyles}
            />
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_HEADING4]}
                type={TextStyles.ELEMENT_HEADING4}
                textStyles={textStyles}
            />
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_CUSTOM1]}
                type={TextStyles.ELEMENT_CUSTOM1}
                textStyles={textStyles}
            />
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_CUSTOM2]}
                type={TextStyles.ELEMENT_CUSTOM2}
                textStyles={textStyles}
            />
            <DropdownItem
                editorId={editorId}
                label={textStyleTitles[TextStyles.ELEMENT_PARAGRAPH]}
                type={TextStyles.ELEMENT_PARAGRAPH}
                textStyles={textStyles}
            />
        </ToolbarDropdown>
    );
};
