/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

import { Badge } from '#/components/Badge/Badge';

import styles from '../styles/select.module.scss';

const BADGE_GAP = 4;
const OVERFLOW_BADGE_MIN_WIDTH = 40;
const INPUT_MIN_WIDTH = 24;

type BadgeItem = {
    value: string;
    displayValue: ReactNode;
};

type CollapsibleBadgesProps = {
    items: BadgeItem[];
    placeholder?: string;
    onDismiss: (value: string) => void;
    /** Optional children to render at the end (e.g., an input field). Space is reserved in the layout calculation. */
    children?: ReactNode;
    /** Total number of selected items (for screen reader announcements). */
    selectedCount?: number;
};

const calculateVisibleCount = (
    container: HTMLDivElement,
    badgeElements: Map<string, HTMLDivElement>,
    items: BadgeItem[],
    hasInputSlot: boolean,
): number => {
    const containerWidth = container.offsetWidth;
    let usedWidth = hasInputSlot ? INPUT_MIN_WIDTH + BADGE_GAP : 0;
    let count = 0;

    for (const item of items) {
        const badgeElement = badgeElements.get(item.value);
        if (!badgeElement) {
            continue;
        }

        const badgeWidth = badgeElement.offsetWidth;
        const widthWithGap = count > 0 ? badgeWidth + BADGE_GAP : badgeWidth;
        const hasMoreAfterThis = items.length - count - 1 > 0;
        const reservedWidth = hasMoreAfterThis ? OVERFLOW_BADGE_MIN_WIDTH + BADGE_GAP : 0;

        if (usedWidth + widthWithGap + reservedWidth > containerWidth) {
            break;
        }

        usedWidth += widthWithGap;
        count++;
    }

    return Math.max(1, count);
};

const getSelectedCountText = (count: number): string => {
    if (count === 1) {
        return '1 item selected';
    }
    if (count > 1) {
        return `${count} items selected`;
    }
    return '';
};

export const CollapsibleBadges = ({
    items,
    placeholder,
    onDismiss,
    children,
    selectedCount = 0,
}: CollapsibleBadgesProps): ReactNode => {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const [visibleCount, setVisibleCount] = useState(items.length);
    const hasChildren = children !== undefined;

    const recalculate = useCallback((): void => {
        const container = containerRef.current;
        if (!container || items.length === 0) {
            setVisibleCount(items.length);
            return;
        }
        setVisibleCount(calculateVisibleCount(container, badgeElementsRef.current, items, hasChildren));
    }, [items, hasChildren]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const observer = new ResizeObserver(recalculate);
        observer.observe(container);
        return (): void => {
            observer.disconnect();
        };
    }, [recalculate]);

    if (items.length === 0 && !children) {
        return placeholder;
    }

    const overflowCount = items.length - visibleCount;

    return (
        <div ref={containerRef} className={styles.badgesContainer}>
            <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
                {getSelectedCountText(selectedCount)}
            </span>
            {children}
            {items.map((item, index) => (
                <div
                    key={item.value}
                    ref={(element): void => {
                        if (element) {
                            badgeElementsRef.current.set(item.value, element);
                        } else {
                            badgeElementsRef.current.delete(item.value);
                        }
                    }}
                    className={styles.badgeWrapper}
                    data-visible={index < visibleCount}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.stopPropagation();
                        }
                    }}
                >
                    <Badge
                        emphasis="weak"
                        aria-label={typeof item.displayValue === 'string' ? item.displayValue : item.value}
                        onDismiss={(event) => {
                            event.stopPropagation();
                            onDismiss(item.value);
                        }}
                    >
                        {item.displayValue}
                    </Badge>
                </div>
            ))}
            {overflowCount > 0 && (
                <div className={styles.badgeWrapper} aria-label={`${overflowCount} more items selected`}>
                    <Badge emphasis="weak" aria-hidden="true">
                        +{overflowCount}
                    </Badge>
                </div>
            )}
        </div>
    );
};
