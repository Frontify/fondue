/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React from "react";

export const ItalicMark = (props: PlateRenderLeafProps) => {
    return (
        <span {...props.attributes} className="tw-italic">
            {props.children}
        </span>
    );
};
