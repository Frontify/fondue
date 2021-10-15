/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export enum MultiInputLayout {
    Spider = "Spider",
    Columns = "Columns",
}

export type MultiInputProps = {
    layout: MultiInputLayout;
};

export const MultiInput: FC<MultiInputProps> = ({ layout, children }) => {
    console.log({ layout });
    return (
        <div data-test-id="multi-input" className="tw-flex">
            {children}
        </div>
    );
};
