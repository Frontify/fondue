export function getTextWidth(text: string, font: string): number | null {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
        context.font = font;
        const metrics = context.measureText(text);

        return Math.ceil(metrics.width * 1.05); // add a 5% safety margin
    }

    return null;
}

const getCssStyle = (element: Element, prop: string): string =>
    window.getComputedStyle(element, null).getPropertyValue(prop);

export function getCanvasFontSize(el: Element = document.body): string {
    const fontWeight = getCssStyle(el, "font-weight");
    const fontSize = getCssStyle(el, "font-size");
    const fontFamily = getCssStyle(el, "font-family");

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}
