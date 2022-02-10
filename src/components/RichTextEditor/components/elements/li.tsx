import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const ListItemElement = (props: PlateRenderElementProps) => {
    console.log({ ...props.children });
    return <li {...props.attributes}>{props.children}</li>;
};
