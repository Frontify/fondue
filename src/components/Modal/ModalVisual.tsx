/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { ModalVisualProps } from "./types";
import { PatternDesign, patternThemes } from "@foundation/Pattern";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";

export const ModalVisual: FC<ModalVisualProps> = ({
    pattern = PatternDesign.DigitalAssets,
    scale,
    foregroundColor,
}) => {
    return (
        <div
            data-test-id="modal-visual"
            className={merge([
                "tw-h-full tw-relative tw-overflow-hidden",
                foregroundColor && patternThemes[foregroundColor],
            ])}
        >
            <FrontifyPattern pattern={pattern} scale={scale} foregroundColor={foregroundColor} />
            {/* <svg
                width="260"
                height="574"
                viewBox="0 0 260 574"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="tw-absolute tw-bottom-0 tw-z-10"
            >
                <path
                    d="M23.75 -1211.04L251.75 -1079.41C256.546 -1076.64 259.5 -1071.52 259.5 -1065.98V416.651C259.5 422.189 256.546 427.306 251.75 430.074L7.75 570.948C2.95428 573.717 -2.95428 573.717 -7.75002 570.948L-235.75 439.312C-246.083 433.346 -246.083 418.431 -235.75 412.465L-7.75003 280.829C-2.6449 277.882 0.5 272.435 0.5 266.54V-1197.62C0.5 -1209.55 13.4167 -1217.01 23.75 -1211.04Z"
                    stroke="#080808"
                    strokeOpacity="0.03"
                />
            </svg> */}
        </div>
    );
};
