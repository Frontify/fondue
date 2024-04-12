/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TextProps } from '@visx/text';

const MEASUREMENT_ELEMENT_ID = '__react_svg_text_measurement_id';
export const getSVGTextDimensions = (str: string, style: TextProps) => {
    let textEl = document.getElementById(MEASUREMENT_ELEMENT_ID) as SVGTextElement | null;
    if (!textEl) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('aria-hidden', 'true');
        svg.style.width = '0';
        svg.style.height = '0';
        svg.style.position = 'absolute';
        svg.style.top = '-100%';
        svg.style.left = '-100%';
        textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('id', MEASUREMENT_ELEMENT_ID);
        svg.appendChild(textEl);
        document.body.appendChild(svg);
    }

    Object.assign(textEl.style, style);
    textEl.textContent = str;
    const { width, height } = textEl.getBoundingClientRect();
    return { width, height };
};
