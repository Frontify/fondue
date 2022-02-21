/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React from "react";

export const OrderedListElement = (props: PlateRenderElementProps) => {
    return (
        <ol className="tw-list-decimal tw-pl-6" {...props.attributes}>
            {props.children}
        </ol>
    );
};
