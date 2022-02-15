/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React from "react";

export const BoldMark = (props: PlateRenderLeafProps) => {
    return (
        <span {...props.attributes} className="tw-font-bold">
            {props.children}
        </span>
    );
};
