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
            className={merge(["tw-h-full", foregroundColor && patternThemes[foregroundColor]])}
            style={{
                clipPath:
                    "path('M0.5 -1197.62C0.5 -1209.55 13.4167 -1217.01 23.75 -1211.04L251.75 -1079.41C256.546 -1076.64 259.5 -1071.52 259.5 -1065.98V416.651C259.5 422.189 256.546 427.306 251.75 430.075L7.75 570.948C2.95428 573.717 -2.95428 573.717 -7.75002 570.948L-235.75 439.312C-246.083 433.346 -246.083 418.431 -235.75 412.465L-7.75003 280.829C-2.64493 277.882 0.5 272.435 0.5 266.54V-1197.62Z')",
            }}
        >
            <FrontifyPattern pattern={pattern} foregroundColor={foregroundColor} />
        </div>
    );
};
