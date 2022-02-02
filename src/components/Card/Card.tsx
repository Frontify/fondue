/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC, ReactChild } from "react";

export type CardProps = {
    isHoverable?: boolean;
    children?: ReactChild;
};

export const Card: FC<CardProps> = ({ isHoverable = false, children }) => {
    return (
        <div
            data-test-id="card"
            className={merge([
                "tw-w-full tw-bg-white tw-border tw-border-black-10 tw-rounded",
                isHoverable ? "hover:tw-border-black" : "",
            ])}
        >
            {children}
        </div>
    );
};
