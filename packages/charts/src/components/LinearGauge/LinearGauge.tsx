/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useTooltipInPortal } from '@visx/tooltip';
import { useState, type PointerEvent } from 'react';

import { LinearGaugeTooltip, Section } from '@components/LinearGauge/components';
import { type LinearGaugeSection } from '@components/LinearGauge/types';
import { Legend } from '@components/common/components';
import { colorAccessorByIndex } from '@components/common/helpers';

export type LinearGaugeProps = { sections: LinearGaugeSection[] } & (
    | { totalLabel: string; totalValue: string }
    | { totalLabel?: never; totalValue?: never }
);

export type LinearGaugeTooltipState = {
    x: number;
    y: number;
};

export const LinearGauge = ({ sections, totalLabel, totalValue }: LinearGaugeProps) => {
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        scroll: true,
    });
    const [tooltipState, setTooltipState] = useState<LinearGaugeTooltipState | null>(null);
    const legendNames = sections.map(({ name }) => name);

    const tooltipEntries = sections.map((section, index) => ({
        color: colorAccessorByIndex(index) ?? 'var(--fc-primary-base-color)',
        title: section.name,
        value: section.label,
    }));

    if (totalLabel) {
        tooltipEntries.unshift({
            color: '',
            title: totalLabel,
            value: totalValue,
        });
    }

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const containingDiv = event.currentTarget.parentElement;
        const containingDivOffsetX = containingDiv?.getBoundingClientRect().left ?? 0;
        const containingDivOffsetY = containingDiv?.getBoundingClientRect().top ?? 0;

        setTooltipState({
            x: event.clientX - containingDivOffsetX,
            y: event.clientY - containingDivOffsetY,
        });
    };
    const handlePointerLeave = () => {
        setTooltipState(null);
    };

    return (
        <div ref={containerRef}>
            <div className="tw-flex tw-flex-col tw-gap-6">
                <Legend names={legendNames} style="square" />
                <div
                    onPointerMove={(event) => handlePointerMove(event)}
                    onPointerLeave={handlePointerLeave}
                    className="tw-overflow-hidden tw-rounded-[6px] tw-w-full tw-relative tw-flex tw-h-3 tw-bg-box-neutral-hover"
                >
                    {sections.map((section, index) => (
                        <Section key={section.name} index={index} percentage={section.percentage} />
                    ))}
                </div>
            </div>
            {tooltipState !== null && (
                <LinearGaugeTooltip
                    TooltipInPortal={TooltipInPortal}
                    x={tooltipState.x}
                    y={tooltipState.y}
                    entries={tooltipEntries}
                />
            )}
        </div>
    );
};
