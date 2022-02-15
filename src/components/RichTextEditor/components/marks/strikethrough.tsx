/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React from "react";

export const StrikethroughMark = (props: PlateRenderLeafProps) => {
    return (
        <span {...props.attributes} className="tw-line-through">
            {props.children}
        </span>
    );
};
