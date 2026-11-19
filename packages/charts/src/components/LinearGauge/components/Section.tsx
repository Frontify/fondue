/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HTMLAttributes } from 'react';

import { colorAccessorByIndex, hoverColorAccessorByIndex } from '@components/common/helpers';

import styles from '../LinearGauge.module.scss';

type SectionProps = HTMLAttributes<HTMLDivElement> & {
    index: number;
    percentage: number;
    isActive: boolean;
    isRoundedAtEnd: boolean;
};

export const Section = ({ index, percentage, isActive, isRoundedAtEnd, ...props }: SectionProps) => {
    const fillColor = isActive ? hoverColorAccessorByIndex(index) : colorAccessorByIndex(index);

    return (
        <div
            {...props}
            role="img"
            // Focusable only so keyboard users can open the section's tooltip, which is otherwise shown on hover.
            // An empty section has nothing to point at, so it stays out of the tab order.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={percentage > 0 ? 0 : undefined}
            className={styles.section}
            data-rounded-end={isRoundedAtEnd}
            style={{
                flexBasis: `${percentage}%`,
                backgroundColor: fillColor,
            }}
        />
    );
};
