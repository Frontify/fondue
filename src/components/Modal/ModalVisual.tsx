/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalVisualProps } from "./types";
import PatternTypography from "./patterns/PatternTypography";

export const ModalVisual: FC<ModalVisualProps> = () => {
    return (
        <div data-test-id="modal-visual" className="tw-w-[260px] tw-relative tw-overflow-hidden">
            <div className="tw-w-full tw-absolute tw-bottom-0">
                <PatternTypography />
            </div>
        </div>
    );
};
