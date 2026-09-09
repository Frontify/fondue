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
    /** When set, adds a non-dismissable badge for the values that are only partially applied. */
    mixedLabel?: string;
};

const calculateVisibleCount = (
    container: HTMLDivElement,
    badgeElements: Map<string, HTMLDivElement>,
    items: BadgeItem[],
    hasInputSlot: boolean,
    mixedBadgeWidth: number,
): number => {
    const containerWidth = container.offsetWidth;
    let usedWidth = hasInputSlot ? INPUT_MIN_WIDTH + BADGE_GAP : 0;
    if (mixedBadgeWidth > 0) {
        usedWidth += mixedBadgeWidth + BADGE_GAP;
    }
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

    // One badge always stays visible so the field never looks empty — unless a mixed badge is
    // already holding that ground, in which case the overflow badge can stand in for all of them
    return Math.max(mixedBadgeWidth > 0 ? 0 : 1, count);
};

export const CollapsibleBadges = ({
    items,
    placeholder,
    onDismiss,
    children,
    selectedCount = 0,
    mixedLabel,
}: CollapsibleBadgesProps): ReactNode => {
    const { t } = useTranslation();
    const wasClickedRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const mixedBadgeRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(items.length);
    const hasChildren = children !== undefined;
    const isMixed = mixedLabel !== undefined;

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
            setVisibleCount(
                calculateVisibleCount(
                    container,
                    badgeElementsRef.current,
                    items,
                    hasChildren,
                    // The mixed badge always stays visible, so the selection badges collapse around it
                    mixedBadgeRef.current?.offsetWidth ?? 0,
                ),
            );
        };

        const observer = new ResizeObserver(recalculate);
        observer.observe(container);
        return (): void => {
            observer.disconnect();
        };
    }, [items, hasChildren, mixedLabel]);

    if (items.length === 0 && !children && !isMixed) {
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
            {isMixed && (
                <div ref={mixedBadgeRef} className={styles.badgeWrapper}>
                    <Badge emphasis="weak" data-test-id="fondue-select-mixed-value">
                        {mixedLabel}
                    </Badge>
                </div>
            )}
        </div>
    );
};
