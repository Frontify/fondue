/* (c) Copyright Frontify Ltd., all rights reserved. */

import tinycolor from "tinycolor2";
import { Color, Palette } from "../../types/colors";

const generatePalette = (color: string, amount: number): Color[] => {
    const sourceColor = tinycolor(color);
    const palette = [...new Array(amount)].map((_, index) => {
        const name = (90 - index * 10).toString();
        const lightColor = sourceColor.lighten(index * 3).toRgb();
        return {
            ...lightColor,
            name,
        };
    });
    return palette;
};

export const EXAMPLE_PALETTES: Palette[] = [
    {
        id: "red",
        title: "Red",
        source: "#992136",
    },
    {
        id: "green",
        title: "Green",
        source: "#006452",
    },
    {
        id: "yellow",
        title: "Yellow",
        source: "#cc9000",
    },
].map((palette) => {
    return {
        ...palette,
        colors: generatePalette(palette.source, 6),
    };
});
