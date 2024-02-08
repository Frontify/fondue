/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync, writeFileSync } from 'node:fs';

import { SVG as svgClass, cleanupSVG, parseColors, runSVGO, isEmptyColor } from '@iconify/tools';

export const optimizeSvg = (filePath: string) => {
    console.log(`Optimizing SVG in "${filePath}"...`);

    const svgFile = readFileSync(filePath, 'utf-8');
    const svg = new svgClass(svgFile);

    cleanupSVG(svg);

    // Add 'currentColor' to shapes that use default color
    parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (_attr, colorStr, color) => {
            return !color ? colorStr : isEmptyColor(color) ? color : 'currentColor';
        },
    });

    runSVGO(svg);

    writeFileSync(filePath, svg.toMinifiedString(), 'utf-8');
};
