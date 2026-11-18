/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useTooltipInPortal } from '@visx/tooltip';
import {
    useId,
    useRef,
    useState,
    type FocusEvent,
    type HTMLAttributes,
    type KeyboardEvent,
    type PointerEvent,
} from 'react';

import { Legend } from '@components/common/components';
import { colorAccessorByIndex } from '@components/common/helpers';
import { LinearGaugeTooltip, Section } from '@components/LinearGauge/components';
import {
    type LinearGaugeLegendPosition,
    type LinearGaugeSection,
    type LinearGaugeTooltipMode,
} from '@components/LinearGauge/types';

import styles from './LinearGauge.module.scss';

export type LinearGaugeProps = {
    sections: LinearGaugeSection[];
    /**
     * `all` lists every section in the tooltip. `hovered` shows only the section under the pointer or keyboard focus,
     * with its description, and makes the legend entries show their section's tooltip too.
     */
    tooltipMode?: LinearGaugeTooltipMode;
    legendPosition?: LinearGaugeLegendPosition;
} & ({ totalLabel: string; totalValue: string } | { totalLabel?: never; totalValue?: never });

export type LinearGaugeTooltipState = {
    x: number;
    y: number;
};

export const LinearGauge = ({
    sections,
    totalLabel,
    totalValue,
    tooltipMode = 'all',
    legendPosition = 'top',
}: LinearGaugeProps) => {
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        scroll: true,
    });
    const stackRef = useRef<HTMLDivElement>(null);
    const [tooltipState, setTooltipState] = useState<LinearGaugeTooltipState | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const isHoveredMode = tooltipMode === 'hovered';
    const descriptionBaseId = useId();

    const getDescriptionId = (index: number) =>
        isHoveredMode && sections[index]?.description ? `${descriptionBaseId}-${index}` : undefined;

    const getEntry = (section: LinearGaugeSection, index: number) => ({
        color: colorAccessorByIndex(index) ?? 'var(--fc-primary-base-color)',
        title: section.name,
        value: section.label,
    });

    const getTooltipEntries = () => {
        if (isHoveredMode) {
            const activeSection = activeIndex === null ? undefined : sections[activeIndex];

            if (activeIndex === null || !activeSection) {
                return [];
            }

            return [{ ...getEntry(activeSection, activeIndex), description: activeSection.description }];
        }

        const entries = sections.map(getEntry);

        if (totalLabel) {
            return [{ color: '', title: totalLabel, value: totalValue }, ...entries];
        }

        return entries;
    };

    const getPositionInStack = (clientX: number, clientY: number): LinearGaugeTooltipState => {
        const stackBounds = stackRef.current?.getBoundingClientRect();

        return {
            x: clientX - (stackBounds?.left ?? 0),
            y: clientY - (stackBounds?.top ?? 0),
        };
    };

    const hideTooltip = () => {
        setTooltipState(null);
        setActiveIndex(null);
    };

    const getInteractionProps = (index: number): HTMLAttributes<HTMLElement> => ({
        'aria-label': `${sections[index]?.name}: ${sections[index]?.label}`,
        'aria-describedby': getDescriptionId(index),
        onPointerEnter: () => setActiveIndex(index),
        onPointerMove: (event: PointerEvent<HTMLElement>) => {
            setActiveIndex(index);
            setTooltipState(getPositionInStack(event.clientX, event.clientY));
        },
        onPointerLeave: hideTooltip,
        onFocus: (event: FocusEvent<HTMLElement>) => {
            const bounds = event.currentTarget.getBoundingClientRect();

            setActiveIndex(index);
            setTooltipState(getPositionInStack(bounds.left + bounds.width / 2, bounds.top));
        },
        onBlur: hideTooltip,
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Escape') {
                hideTooltip();
            }
        },
    });

    const getLegendItemProps = (index: number): HTMLAttributes<HTMLSpanElement> => ({
        ...getInteractionProps(index),
        role: 'img',
        tabIndex: 0,
    });

    const legend = (
        <Legend
            names={sections.map(({ name }) => name)}
            style="square"
            getItemProps={isHoveredMode ? getLegendItemProps : undefined}
        />
    );
    const tooltipEntries = getTooltipEntries();
    const fillsTheBar = sections.reduce((total, { percentage }) => total + percentage, 0) >= 100;

    return (
        <div ref={containerRef}>
            <div ref={stackRef} className={styles.stack}>
                {legendPosition === 'top' ? legend : null}
                <div
                    onPointerMove={(event) => setTooltipState(getPositionInStack(event.clientX, event.clientY))}
                    onPointerLeave={hideTooltip}
                    className={styles.bar}
                >
                    {sections.map((section, index) => (
                        <Section
                            key={section.name}
                            {...getInteractionProps(index)}
                            index={index}
                            percentage={section.percentage}
                            isActive={activeIndex === index}
                            isRoundedAtEnd={fillsTheBar && index === sections.length - 1}
                        />
                    ))}
                </div>
                {legendPosition === 'bottom' ? legend : null}
                {sections.map((section, index) => {
                    const descriptionId = getDescriptionId(index);

                    return descriptionId ? (
                        <span key={section.name} id={descriptionId} className={styles.description}>
                            {section.description}
                        </span>
                    ) : null;
                })}
            </div>
            {tooltipState !== null && tooltipEntries.length > 0 && (
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
