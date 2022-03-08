/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { ModalVisualProps } from "./types";
import { PatternDesign, PatternScale, patternThemes } from "@foundation/Pattern";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";

export const ModalVisual: FC<ModalVisualProps> = ({ pattern = PatternDesign.DigitalAssets, foregroundColor }) => {
    return (
        <div
            data-test-id="modal-visual"
            className={merge([
                "tw-h-full tw-relative tw-overflow-hidden",
                foregroundColor && patternThemes[foregroundColor],
            ])}
        >
            <FrontifyPattern pattern={pattern} scale={PatternScale.XXL} foregroundColor={foregroundColor} />
        </div>
    );
};
