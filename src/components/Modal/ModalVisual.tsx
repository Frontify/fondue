/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { ModalVisualProps } from "./types";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";
import { PatternDesign, PatternScale, patternThemes } from "@foundation/Pattern";

export const ModalVisual: FC<ModalVisualProps> = ({ pattern = PatternDesign.DigitalAssets, foregroundColor }) => {
    return (
        <div
            data-test-id="modal-visual"
            className={merge(["tw-h-full tw-overflow-hidden", foregroundColor && patternThemes[foregroundColor]])}
            style={{
                transform: "scaleX(-1) rotate(180deg)",
                clipPath:
                    "path('M0 0L252 145.492C256.95 148.35 260 153.632 260 159.349V1641.98C260 1647.7 256.95 1652.98 252 1655.84L0 1801.33V1501.11V0Z')",
            }}
        >
            <FrontifyPattern pattern={pattern} scale={PatternScale.XXL} foregroundColor={foregroundColor} />
        </div>
    );
};
