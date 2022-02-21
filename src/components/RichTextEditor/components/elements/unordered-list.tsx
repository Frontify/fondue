/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const UnorderedListElement = (props: PlateRenderElementProps) => {
    return (
        <ul className="tw-list-disc tw-pl-6" {...props.attributes}>
            {props.children}
        </ul>
    );
};
