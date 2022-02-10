import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const UnorderedListElement = (props: PlateRenderElementProps) => {
    return (
        <ul {...props.attributes} className="tw-list-disc tw-list-inside">
            {props.children}
        </ul>
    );
};
