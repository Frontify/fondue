/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const OrderedListElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <ol className="tw-list-decimal tw-pl-6" {...attributes}>
        {children}
    </ol>
);
