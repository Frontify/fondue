/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ScrollWrapperProps } from "./types";

export const ScrollWrapper: FC<ScrollWrapperProps> = ({ children }) => {
    return (
        <div data-test-id="scroll-wrapper" className="tw-w-full tw-h-full tw-overflow-y-scroll">
            {children}
        </div>
    );
};
