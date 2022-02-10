// /* (c) Copyright Frontify Ltd., all rights reserved. */

// export function getTextWidth(text: string, font: string): number | null {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     if (context) {
//         context.font = font;
//         const metrics = context.measureText(text);

//         /**
//          * The 5% margin addition is required as the font used in Arcade is not yet loaded when this
//          * calculation happens, so the calculation actually counts with the fallback font, resulting in
//          * a smaller value than would be produced with the correct font. We found 5% to provide enough
//          * space for the larger font while not making the element too large.
//          */
//         return Math.ceil(metrics.width * 1.05); // add a 5% safety margin
//     }

//     return null;
// }

// const getCssStyle = (element: Element, prop: string): string =>
//     window.getComputedStyle(element, null).getPropertyValue(prop);

// export function getCanvasFontSize(el: Element = document.body): string {
//     const fontWeight = getCssStyle(el, "font-weight");
//     const fontSize = getCssStyle(el, "font-size");
//     const fontFamily = getCssStyle(el, "font-family");

//     return `${fontWeight} ${fontSize} ${fontFamily}`;
// }
