import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const ListContentElement = (props: PlateRenderElementProps) => {
    return <span {...props.attributes}>{props.children}</span>;
};
