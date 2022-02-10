import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

const alignmentClasses: Record<string, string> = {
    justify: "tw-text-justify",
    center: "tw-text-center",
    right: "tw-text-right",
};

export const ParagraphElement = (props: PlateRenderElementProps) => {
    const alignment = props.element?.align && props.element.align;
    return (
        <p {...props.attributes} className={alignmentClasses[alignment]}>
            {props.children}
        </p>
    );
};
