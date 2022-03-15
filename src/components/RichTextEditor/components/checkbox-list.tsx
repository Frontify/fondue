/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const CheckboxListElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <ul className="tw-list-none tw-pl-6" {...attributes}>
        {children}
    </ul>
);
