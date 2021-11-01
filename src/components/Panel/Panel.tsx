/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export const Panel: FC = ({ children }) => {
    return (
        <div data-test-id="panel" className="tw-bg-neutral-100">
            {children}
        </div>
    );
};
