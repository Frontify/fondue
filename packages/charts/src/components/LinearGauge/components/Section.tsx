/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { colorAccessorByIndex, hoverColorAccessorByIndex } from '@components/common/helpers';

type SectionProps = {
    index: number;
    percentage: number;
};

export const Section = ({ index, percentage }: SectionProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const fillColor = isHovered ? hoverColorAccessorByIndex(index) : colorAccessorByIndex(index);

    return (
        <div
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            style={{
                flexBasis: `${percentage}%`,
                backgroundColor: fillColor,
            }}
        />
    );
};
