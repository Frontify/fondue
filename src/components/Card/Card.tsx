/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export type CardProps = {
    children?: string;
};

export const Card: FC<CardProps> = ({ children }) => {
    return (
        <div data-test-id="card" className="tw-w-full tw-bg-white tw-border tw-border-black-10 tw-rounded">
            {children}
        </div>
    );
};
