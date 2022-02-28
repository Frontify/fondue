/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC } from "react";
import { merge } from "@utilities/merge";
import {
    PatternDesign,
    patternDesigns,
    PatternScale,
    patternScales,
    PatternTheme,
    patternThemes,
} from "@foundation/Pattern";

export type FrontifyPatternProps = {
    pattern: PatternDesign;
    scale?: PatternScale;
    foregroundColor?: PatternTheme;
};

const DEFAULT_FOREGROUND_THEME = PatternTheme.Black;

export const FrontifyPattern: FC<FrontifyPatternProps> = ({ pattern, scale = PatternScale.SM, foregroundColor }) => {
    return (
        <div
            data-test-id="frontify-pattern"
            className={merge(["tw-h-full", patternThemes[foregroundColor ?? DEFAULT_FOREGROUND_THEME]])}
            style={{ transform: `scale(${patternScales[scale]})` }}
        >
            {cloneElement(patternDesigns[pattern], {
                className: "tw-h-full",
            })}
        </div>
    );
};
