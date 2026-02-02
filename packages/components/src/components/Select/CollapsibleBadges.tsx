/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSyncExternalStore, useRef, type ReactNode } from 'react';

import { Badge } from '../Badge/Badge';

import styles from './styles/select.module.scss';
const BADGE_GAP = 4;
const OVERFLOW_BADGE_MIN_WIDTH = 40;

type BadgeItem = {
    value: string;
    displayValue: ReactNode;
};

type CollapsibleBadgesProps = {
    items: BadgeItem[];
    placeholder?: string;
    onDismiss: (value: string) => void;
};

const calculateVisibleCount = (
    container: HTMLDivElement | null,
    badgeRefsMap: Map<string, HTMLDivElement>,
    items: BadgeItem[],
): number => {
    if (!container || items.length === 0) {
        return items.length;
    }

    const containerWidth = container.offsetWidth;
    let usedWidth = 0;
    let count = 0;

    for (const item of items) {
        const badgeElement = badgeRefsMap.get(item.value);
        if (!badgeElement) {
            continue;
        }

        const badgeWidth = badgeElement.offsetWidth;
        const widthWithGap = count > 0 ? badgeWidth + BADGE_GAP : badgeWidth;
        const remainingItems = items.length - count - 1;
        const needsOverflowBadge = remainingItems > 0;
        const reservedWidth = needsOverflowBadge ? OVERFLOW_BADGE_MIN_WIDTH + BADGE_GAP : 0;

        if (usedWidth + widthWithGap + reservedWidth <= containerWidth) {
            usedWidth += widthWithGap;
            count++;
        } else {
            break;
        }
    }

    return Math.max(1, count);
};

export const CollapsibleBadges = ({ items, placeholder, onDismiss }: CollapsibleBadgesProps): ReactNode => {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRefsMapRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const subscribersRef = useRef<Set<() => void>>(new Set());
    const visibleCountRef = useRef(items.length);

    const subscribe = (callback: () => void): (() => void) => {
        subscribersRef.current.add(callback);

        const container = containerRef.current;
        if (container) {
            const resizeObserver = new ResizeObserver(() => {
                const newCount = calculateVisibleCount(container, badgeRefsMapRef.current, items);
                if (newCount !== visibleCountRef.current) {
                    visibleCountRef.current = newCount;
                    for (const cb of subscribersRef.current) {
                        cb();
                    }
                }
            });
            resizeObserver.observe(container);

            return (): void => {
                subscribersRef.current.delete(callback);
                resizeObserver.disconnect();
            };
        }

        return (): void => {
            subscribersRef.current.delete(callback);
        };
    };

    const getSnapshot = (): number => {
        const newCount = calculateVisibleCount(containerRef.current, badgeRefsMapRef.current, items);
        visibleCountRef.current = newCount;
        return newCount;
    };

    const visibleCount = useSyncExternalStore(subscribe, getSnapshot, () => items.length);

    const overflowCount = items.length - visibleCount;

    if (items.length === 0) {
        return placeholder;
    }

    return (
        <div ref={containerRef} className={styles.badgesContainer}>
            {items.map((item, index) => {
                const isVisible = index < visibleCount;
                return (
                    <div
                        key={item.value}
                        ref={(element): void => {
                            if (element) {
                                badgeRefsMapRef.current.set(item.value, element);
                            } else {
                                badgeRefsMapRef.current.delete(item.value);
                            }
                        }}
                        className={styles.badgeWrapper}
                        data-visible={isVisible}
                    >
                        <Badge
                            emphasis="weak"
                            onDismiss={(event) => {
                                event.stopPropagation();
                                onDismiss(item.value);
                            }}
                        >
                            {item.displayValue}
                        </Badge>
                    </div>
                );
            })}
            {overflowCount > 0 && (
                <div className={styles.badgeWrapper}>
                    <Badge emphasis="weak">+{overflowCount}</Badge>
                </div>
            )}
        </div>
    );
};
