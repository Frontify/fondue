/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import React, { FC, ReactChild } from "react";

export type CardProps = {
    hoverable?: boolean;
    children?: ReactChild;
};

export const Card: FC<CardProps> = ({ hoverable = false, children }) => {
    return (
        <div
            data-test-id="card"
            className={merge([
                "tw-w-full tw-bg-white tw-border tw-border-black-10 tw-rounded",
                hoverable ? "hover:tw-border-black" : "",
            ])}
        >
            {children}
        </div>
    );
};
