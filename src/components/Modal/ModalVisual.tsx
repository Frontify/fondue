/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { ModalVisualProps } from "./types";
import { PatternScale, patternThemes } from "@foundation/Pattern";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";

export const ModalVisual: FC<ModalVisualProps> = ({ pattern, foregroundColor }) => {
    return (
        <div
            data-test-id="modal-visual"
            className={merge([
                "tw-w-[260px] tw-relative tw-overflow-hidden",
                foregroundColor && patternThemes[foregroundColor],
            ])}
        >
            <FrontifyPattern pattern={pattern} scale={PatternScale.Small} foregroundColor={foregroundColor} />
        </div>
    );
};
