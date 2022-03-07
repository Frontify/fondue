/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { ScrollWrapperDirection, scrollWrapperDirections, ScrollWrapperProps } from "./types";

export const ScrollWrapper: FC<ScrollWrapperProps> = ({ direction, children }) => {
    return (
        <div
            data-test-id="scroll-wrapper"
            className={merge([scrollWrapperDirections[direction ?? ScrollWrapperDirection.Vertical]])}
        >
            {children}
        </div>
    );
};
