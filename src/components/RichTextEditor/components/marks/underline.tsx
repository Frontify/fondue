import { PlateRenderLeafProps } from "@udecode/plate";
import React from "react";

export const UnderlineMark = (props: PlateRenderLeafProps) => {
    return (
        <span {...props.attributes} className="tw-underline">
            {props.children}
        </span>
    );
};
