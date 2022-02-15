/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const LinkElement = (props: PlateRenderElementProps) => {
    return (
        <a
            href={props.element.url}
            rel="noreferrer"
            target="_blank"
            className="tw-text-violet-80"
            {...props.attributes}
        >
            {props.children}
        </a>
    );
};
