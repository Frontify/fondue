/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const ListItemElement = (props: PlateRenderElementProps) => {
    return <span {...props.attributes}>{props.children}</span>;
};
