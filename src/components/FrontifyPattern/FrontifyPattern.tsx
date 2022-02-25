/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC } from "react";
import { merge } from "@utilities/merge";
import { PatternDesign, patternDesigns, PatternScale, patternScales } from "@foundation/Pattern";

export type FrontifyPatternProps = {
    pattern: PatternDesign;
    scale?: PatternScale;
};

export const FrontifyPattern: FC<FrontifyPatternProps> = ({ pattern, scale = PatternScale.Small }) => {
    return (
        <div data-test-id="frontify-pattern" className=" tw-h-full">
            {cloneElement(patternDesigns[pattern], { className: merge(["tw-h-full", patternScales[scale]]) })}
        </div>
    );
};
