/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const LinkElement: FC<PlateRenderElementProps> = ({ element, attributes, children }) => (
    <a href={element.url} rel="noreferrer" target="_blank" className="tw-text-violet-80" {...attributes}>
        {children}
    </a>
);
