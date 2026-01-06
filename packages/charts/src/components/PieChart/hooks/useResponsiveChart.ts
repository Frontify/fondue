/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState, type RefObject } from 'react';

import { type Padding } from '@components/PieChart';
import { DEFAULT_PADDING } from '@components/PieChart/consts';

type LabelStyle = 'label' | 'legend';

export const useResponsiveChart = (
    sizeProp: number,
    containerRef: RefObject<HTMLDivElement>,
    labelPadding: Padding,
) => {
    const [labelStyle, setLabelStyle] = useState<LabelStyle>('label');
    const [size, setSize] = useState<number>(sizeProp);

    const radius = size / 2;
    const padding = labelStyle === 'label' ? labelPadding : DEFAULT_PADDING;
    const center = [padding.left + radius, padding.top + radius];
    const width = size + padding.left + padding.right;
    const height = size + padding.top + padding.bottom;

    useEffect(() => {
        const fitChartToScreen = () => {
            const fullWidthWithLabels = sizeProp + labelPadding.left + labelPadding.right;
            if (containerRef.current) {
                if (containerRef.current.clientWidth < fullWidthWithLabels) {
                    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
                    setLabelStyle('legend');
                    setSize(Math.min(containerRef.current.clientWidth, sizeProp));
                } else {
                    setSize(sizeProp);
                    setLabelStyle('label');
                }
            }
        };
        fitChartToScreen();

        window.addEventListener('resize', fitChartToScreen);

        return () => {
            window.removeEventListener('resize', fitChartToScreen);
        };
    }, [sizeProp, labelPadding, containerRef]);

    return { radius, center, width, height, labelStyle };
};
