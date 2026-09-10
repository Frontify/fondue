/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

import { Badge } from '#/components/Badge/Badge';
import { useTranslation } from '#/hooks/useTranslation';

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
    onDismiss: (value: string, preventFocusRing: boolean) => void;
    /** Optional children to render at the end (e.g., an input field). Space is reserved in the layout calculation. */
    children?: ReactNode;
    /** Total number of selected items (for screen reader announcements). */
    selectedCount?: number;
    /** Number of partially applied values. Above zero, a non-dismissable "N mixed" badge follows the selection badges. */
    indeterminateCount?: number;
};

const calculateVisibleCount = (
    container: HTMLDivElement,
    badges: HTMLDivElement[],
    mixedBadge: HTMLDivElement | null,
    hasInputSlot: boolean,
): number => {
    const containerWidth = container.offsetWidth;

    // The input and the mixed badge always stay visible, so the selection badges collapse around them
    let usedWidth = hasInputSlot ? INPUT_MIN_WIDTH + BADGE_GAP : 0;
    if (mixedBadge) {
        usedWidth += mixedBadge.offsetWidth + BADGE_GAP;
    }
    let count = 0;

    for (const badge of badges) {
        const badgeWidth = badge.offsetWidth;
        const widthWithGap = count > 0 ? badgeWidth + BADGE_GAP : badgeWidth;
        const isLast = count === badges.length - 1;
        const reservedWidth = isLast ? 0 : OVERFLOW_BADGE_MIN_WIDTH + BADGE_GAP;

        if (usedWidth + widthWithGap + reservedWidth > containerWidth) {
            break;
        }

        usedWidth += widthWithGap;
        count++;
    }

    // One badge always stays visible so the field never looks empty — unless the mixed badge already
    // does that, in which case the overflow badge can stand in for all of them
    return Math.max(mixedBadge ? 0 : 1, count);
};

export const CollapsibleBadges = ({
    items,
    placeholder,
    onDismiss,
    children,
    selectedCount = 0,
    indeterminateCount = 0,
}: CollapsibleBadgesProps): ReactNode => {
    const { t } = useTranslation();
    const wasClickedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const mixedBadgeRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(items.length);
    const hasChildren = children !== undefined;
    const hasIndeterminate = indeterminateCount > 0;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const recalculate = (): void => {
            if (items.length === 0) {
                setVisibleCount(0);
                return;
            }
            const badges = items
                .map((item) => badgeElementsRef.current.get(item.value))
                .filter((element) => element !== undefined);
            setVisibleCount(calculateVisibleCount(container, badges, mixedBadgeRef.current, hasChildren));
        };

        const observer = new ResizeObserver(recalculate);
        observer.observe(container);
        return (): void => {
            observer.disconnect();
        };
    }, [items, hasChildren, indeterminateCount]);

    if (items.length === 0 && !children && !hasIndeterminate) {
        return placeholder;
    }

    const overflowCount = items.length - visibleCount;

    const getSelectedCountText = (count: number): string => {
        if (count === 1) {
            return t('Select_singleItemSelected');
        }
        if (count > 1) {
            return t('Select_multipleItemsSelected', { count: count.toString() });
        }
        return '';
    };

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
                    role="presentation"
                    className={styles.badgeWrapper}
                    data-visible={index < visibleCount}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.stopPropagation();
                        }
                    }}
                    onMouseDown={(): void => {
                        wasClickedRef.current = true;
                    }}
                >
                    <Badge
                        emphasis="weak"
                        aria-label={typeof item.displayValue === 'string' ? item.displayValue : item.value}
                        onDismiss={(event) => {
                            event.stopPropagation();
                            onDismiss(item.value, wasClickedRef.current);
                            wasClickedRef.current = false;
                        }}
                    >
                        {item.displayValue}
                    </Badge>
                </div>
            ))}
            {overflowCount > 0 && (
                <div
                    className={styles.badgeWrapper}
                    aria-label={t('Select_additionalItemsSelected', { count: overflowCount.toString() })}
                >
                    <Badge emphasis="weak" aria-hidden="true">
                        +{overflowCount}
                    </Badge>
                </div>
            )}
            {hasIndeterminate && (
                <div ref={mixedBadgeRef} className={styles.badgeWrapper}>
                    <Badge emphasis="weak" data-test-id="fondue-select-mixed-value">
                        {t('Select_mixedCount', { count: indeterminateCount.toString() })}
                    </Badge>
                </div>
            )}
        </div>
    );
};
