/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeaderType, FieldsetHeaderSize, renderFieldsetHeaderIconType } from "@components/FieldsetHeader";
import { FC } from "react";
import { AccordionHeaderIconProps, AccordionHeaderIconSize } from "./types";

export const AccordionHeaderIcon: FC<AccordionHeaderIconProps> = ({
    size = AccordionHeaderIconSize.Medium,
    isOpen,
    disabled = false,
    type = FieldsetHeaderType.Accordion,
}) => renderFieldsetHeaderIconType(type, "", FieldsetHeaderSize[AccordionHeaderIconSize[size]], isOpen, disabled);
