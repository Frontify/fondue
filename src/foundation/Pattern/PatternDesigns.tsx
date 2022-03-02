/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from "react";
import PatternSound from "@foundation/Pattern/PatternSound";
import PatternImagery from "@foundation/Pattern/PatternImagery";
import PatternTypography from "@foundation/Pattern/PatternTypography";
import PatternDigitalAssets from "@foundation/Pattern/PatternDigitalAssets";

import svgPatternDigitalAssets from "./Svg/DigitalAssets.svg";
import svgPatternImagery from "./Svg/Imagery.svg";
import svgPatternSound from "./Svg/Sound.svg";
import svgPatternTypography from "./Svg/Typography.svg";

export enum PatternDesign {
    DigitalAssets = "DigitalAssets",
    Imagery = "Imagery",
    Sound = "Sound",
    Typography = "Typography",
}

export const patternDesignsSvg: Record<PatternDesign, string> = {
    [PatternDesign.DigitalAssets]: svgPatternDigitalAssets,
    [PatternDesign.Imagery]: svgPatternImagery,
    [PatternDesign.Sound]: svgPatternSound,
    [PatternDesign.Typography]: svgPatternTypography,
};

export const patternDesigns: Record<PatternDesign, ReactElement> = {
    [PatternDesign.DigitalAssets]: <PatternDigitalAssets />,
    [PatternDesign.Imagery]: <PatternImagery />,
    [PatternDesign.Sound]: <PatternSound />,
    [PatternDesign.Typography]: <PatternTypography />,
};
