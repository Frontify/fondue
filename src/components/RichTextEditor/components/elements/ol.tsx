import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const OrderedListElement = (props: PlateRenderElementProps) => {
    return (
        <ol {...props.attributes} className="tw-list-decimal tw-list-inside">
            {props.children}
        </ol>
    );
};
