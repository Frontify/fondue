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

type BadgeLayout = {
    /** How many selection badges are shown. The rest collapse into a count. */
    visibleCount: number;
    /** Whether even the counts do not fit, so a single "Mixed" badge stands in for everything. */
    isMixedOnly: boolean;
};

type SummaryBadges = {
    selectedCount: HTMLDivElement | null;
    mixedCount: HTMLDivElement | null;
};

const calculateLayout = (
    container: HTMLDivElement,
    badges: HTMLDivElement[],
    summary: SummaryBadges,
    hasInputSlot: boolean,
): BadgeLayout => {
    const containerWidth = container.offsetWidth;
    // Each fixed element carries the gap that follows it
    const inputWidth = hasInputSlot ? INPUT_MIN_WIDTH + BADGE_GAP : 0;
    const mixedCountWidth = summary.mixedCount ? summary.mixedCount.offsetWidth + BADGE_GAP : 0;

    // The input and the mixed count stay visible, so the selection badges collapse around them
    let usedWidth = inputWidth + mixedCountWidth;
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

    if (count > 0) {
        return { visibleCount: count, isMixedOnly: false };
    }

    // Not a single selection badge fits, so the counts stand in for them. When even those are too
    // wide, a lone "Mixed" badge is all that is left to show.
    const selectedCountWidth = summary.selectedCount ? summary.selectedCount.offsetWidth + BADGE_GAP : 0;
    // The last element has no gap after it
    const summaryWidth = inputWidth + selectedCountWidth + mixedCountWidth - BADGE_GAP;
    return { visibleCount: 0, isMixedOnly: summary.mixedCount !== null && summaryWidth > containerWidth };
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
    const selectedCountRef = useRef<HTMLDivElement>(null);
    const mixedCountRef = useRef<HTMLDivElement>(null);
    const [layout, setLayout] = useState<BadgeLayout>({ visibleCount: items.length, isMixedOnly: false });
    const hasChildren = children !== undefined;
    const hasIndeterminate = indeterminateCount > 0;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const recalculate = (): void => {
            const badges = items
                .map((item) => badgeElementsRef.current.get(item.value))
                .filter((element) => element !== undefined);
            const summary = { selectedCount: selectedCountRef.current, mixedCount: mixedCountRef.current };
            setLayout(calculateLayout(container, badges, summary, hasChildren));
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

    const { visibleCount, isMixedOnly } = layout;
    const overflowCount = items.length - visibleCount;
    // Once no selection badge is left, the counts take over from the "+N" badge
    const showsCounts = visibleCount === 0 && !isMixedOnly;

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
            {visibleCount > 0 && overflowCount > 0 && (
                <div
                    className={styles.badgeWrapper}
                    aria-label={t('Select_additionalItemsSelected', { count: overflowCount.toString() })}
                >
                    <Badge emphasis="weak" aria-hidden="true">
                        +{overflowCount}
                    </Badge>
                </div>
            )}
            {/* The counts are also rendered while hidden, so the layout can measure them before they are needed */}
            {items.length > 0 && (
                <div ref={selectedCountRef} className={styles.badgeWrapper} data-visible={showsCounts}>
                    <Badge emphasis="weak" data-test-id="fondue-select-selected-count">
                        {t('Select_selectedItemsCount', { count: items.length.toString() })}
                    </Badge>
                </div>
            )}
            {hasIndeterminate && (
                <div ref={mixedCountRef} className={styles.badgeWrapper} data-visible={!isMixedOnly}>
                    <Badge emphasis="weak" data-test-id="fondue-select-mixed-count">
                        {t('Select_mixedCount', { count: indeterminateCount.toString() })}
                    </Badge>
                </div>
            )}
            {isMixedOnly && (
                <div className={styles.badgeWrapper}>
                    <Badge emphasis="weak" data-test-id="fondue-select-mixed">
                        {t('Select_mixed')}
                    </Badge>
                </div>
            )}
        </div>
    );
};
