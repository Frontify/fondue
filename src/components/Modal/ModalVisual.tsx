/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { ModalVisualProps } from "./types";
import { patternThemes } from "@foundation/Pattern";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";

export const ModalVisual: FC<ModalVisualProps> = ({ pattern, scale, foregroundColor }) => {
    return (
        <div
            data-test-id="modal-visual"
            className={merge([
                "tw-w-[260px] tw-relative tw-overflow-hidden",
                foregroundColor && patternThemes[foregroundColor],
            ])}
        >
            <FrontifyPattern pattern={pattern} scale={scale} foregroundColor={foregroundColor} />
        </div>
    );
};
