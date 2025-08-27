/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorAccessorByIndex } from '@components/common/helpers';

type ColorBoxStyle = 'line' | 'rectangle' | 'circle' | 'square';

type LegendProps = {
    names: string[];
    style: ColorBoxStyle;
    colorAccessor?: (index: number) => string | undefined;
};

export const Legend = ({ names, style, colorAccessor = colorAccessorByIndex }: LegendProps) => {
    return (
        <div className="tw-flex tw-flex-wrap tw-gap-6 tw-self-start">
            {names.map((title, index) => (
                <span className="tw-flex" key={`${title}-legend-${index}`}>
                    <ColorBox color={colorAccessor(index)} style={style} />
                    <span className="tw-font-primary tw-text-small tw-text-primary">{title}</span>
                </span>
            ))}
        </div>
    );
};

type ColorBoxProps = {
    color?: string;
    style: ColorBoxStyle;
};

const ColorBox = ({ color, style }: ColorBoxProps) => {
    const roundedClass = style === 'circle' ? 'tw-rounded-full' : 'tw-rounded-none';
    let sizeClass;
    switch (style) {
        case 'line':
            sizeClass = 'tw-w-12 tw-h-[2px]';
            break;
        case 'rectangle':
            sizeClass = 'tw-w-12 tw-h-3';
            break;
        case 'circle':
            sizeClass = 'tw-w-3 tw-h-3';
            break;
        case 'square':
            sizeClass = 'tw-w-3 tw-h-3 tw-rounded-[1px]';
            break;
    }

    return (
        <span
            className={`tw-self-center tw-mr-2 tw-inline-block ${sizeClass} ${roundedClass}`}
            style={{
                backgroundColor: color,
            }}
        />
    );
};
