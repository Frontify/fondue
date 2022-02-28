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

export const FrontifyPattern: FC<FrontifyPatternProps> = ({ pattern, scale = PatternScale.Small, foregroundColor }) => {
    const DEFAULT_FOREGROUND_THEME = PatternTheme.Black;

    return (
        <div
            data-test-id="frontify-pattern"
            className={merge(["tw-h-full", patternThemes[foregroundColor ?? DEFAULT_FOREGROUND_THEME]])}
        >
            {cloneElement(patternDesigns[pattern], {
                className: merge(["tw-h-full", patternScales[scale]]),
            })}
        </div>
    );
};
