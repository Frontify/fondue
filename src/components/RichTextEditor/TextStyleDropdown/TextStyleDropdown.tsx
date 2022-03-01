/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarDropdown } from "@udecode/plate";
import React, { useCallback, useState } from "react";
import { TextStyles, TextStyleType } from "../utils/getTextStyles";
import { DropdownItem } from "./DropdownItem";
import { DropdownTrigger } from "./DropdownTrigger";

type TextStyleDropdownProps = {
    textStyles?: TextStyleType[];
};

export const TextStyleDropdown = ({ textStyles }: TextStyleDropdownProps) => {
    const [open, setOpen] = useState(true);

    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    console.log({ textStyles });

    return (
        <ToolbarDropdown control={<DropdownTrigger open={open} />} open={open} onOpen={onToggle} onClose={onToggle}>
            <DropdownItem label="Heading 1" type={TextStyles.ELEMENT_HEADING1} textStyles={textStyles} />
            <DropdownItem label="Heading 2" type={TextStyles.ELEMENT_HEADING2} textStyles={textStyles} />
            <DropdownItem label="Heading 3" type={TextStyles.ELEMENT_HEADING3} textStyles={textStyles} />
            <DropdownItem label="Heading 4" type={TextStyles.ELEMENT_HEADING4} textStyles={textStyles} />
            <DropdownItem label="Custom 1" type={TextStyles.ELEMENT_CUSTOM1} textStyles={textStyles} />
            <DropdownItem label="Custom 2" type={TextStyles.ELEMENT_CUSTOM2} textStyles={textStyles} />
        </ToolbarDropdown>
    );
};
