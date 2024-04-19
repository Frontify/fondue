/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type parseSync } from 'svgson';

type TemplateProps = {
    componentName: string;
    iconName: string;
    children: ReturnType<typeof parseSync>;
    getSvg: () => string;
};

const base64SVG = (svgContents: string) => {
    const svg: string = svgContents
        .replaceAll('\n', '')
        .replaceAll('stroke="currentColor"', 'stroke="#000" style="background-color: #fff; border-radius: 2px"');

    return Buffer.from(svg).toString('base64');
};

export const template = ({ componentName, iconName, children, getSvg }: TemplateProps) => {
    const svgContents = getSvg();
    const svgBase64 = base64SVG(svgContents);

    return `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createFondueIcon } from '../createFondueIcon';

/**
 * @component @name ${componentName}
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://fondue-components.frontify.com/?path=/story/icons_icons--default&args=iconName:${iconName}
 * @see https://fondue-components.frontify.com/?path=/story/icons_icons--default - Documentation
 */
export const Icon${componentName} = createFondueIcon('${componentName}', ${JSON.stringify(children)});
`;
};
