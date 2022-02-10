import { PlateRenderLeafProps } from "@udecode/plate";
import React from "react";

export const LinkMark = (props: PlateRenderLeafProps) => {
    console.log({ props });
    return <p {...props.attributes}>CUSTOM: {props.children}</p>;
};
