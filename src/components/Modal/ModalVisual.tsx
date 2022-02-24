/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalVisualProps } from "./types";
import PatternSound from "../../foundation/Pattern/PatternSound";
import PatternImagery from "../../foundation/Pattern/PatternImagery";
import PatternTypography from "../../foundation/Pattern/PatternTypography";
import PatternDigitalAssets from "../../foundation/Pattern/PatternDigitalAssets";

export const ModalVisual: FC<ModalVisualProps> = () => {
    return (
        <div data-test-id="modal-visual" className="tw-w-[260px] tw-relative tw-overflow-hidden">
            <div className="tw-w-full tw-absolute tw-bottom-0">
                <PatternSound />
                <PatternImagery />
                <PatternTypography />
                <PatternDigitalAssets />
            </div>
        </div>
    );
};
