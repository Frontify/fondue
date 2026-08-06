/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { type TabTrigger } from '../types';

const getOverflowingTriggers = (triggers: TabTrigger[], triggerListElement: HTMLDivElement) => {
    return triggers.filter((trigger) => {
        const triggerElement = trigger.ref?.current;
        if (!triggerElement) {
            return false;
        }
        return (
            triggerElement.offsetLeft + triggerElement.offsetWidth >
                triggerListElement?.scrollLeft + triggerListElement.offsetWidth ||
            triggerElement.offsetLeft - triggerListElement.scrollLeft < 0
        );
    });
};

const moveActiveIndicator = (
    triggerListElement: HTMLDivElement,
    activeIndicatorRef: RefObject<HTMLSpanElement | null>,
) => {
    const activeIndicatorElement = activeIndicatorRef.current;
    const activeTriggerElement = triggerListElement?.querySelector('[data-state="active"]');

    if (
        !triggerListElement ||
        !(activeTriggerElement instanceof HTMLButtonElement) ||
        !(activeIndicatorElement instanceof HTMLSpanElement)
    ) {
        return;
    }

    // Get the computed direction to handle RTL correctly
    const direction = getComputedStyle(triggerListElement).direction;
    const isRTL = direction === 'rtl';

    const isOverflowingLeft = triggerListElement?.scrollLeft > activeTriggerElement?.offsetLeft;
    const isOverflowingRight =
        activeTriggerElement?.offsetLeft + activeTriggerElement?.offsetWidth > triggerListElement?.offsetWidth;

    // Helper function to calculate position based on direction
    const getInlineStartPosition = (position: number) => {
        if (isRTL) {
            // In RTL, insetInlineStart maps to 'right', so we need to calculate from the right edge
            return triggerListElement.offsetWidth - position - activeTriggerElement.offsetWidth;
        }
        return position;
    };

    if (isOverflowingLeft) {
        const willFitAllItemsToTheLeft =
            triggerListElement.offsetWidth > activeTriggerElement.offsetWidth + activeTriggerElement.offsetLeft;
        if (willFitAllItemsToTheLeft) {
            activeIndicatorElement.style.insetInlineStart = `${getInlineStartPosition(activeTriggerElement.offsetLeft)}px`;
        } else {
            const position = triggerListElement.offsetWidth - activeTriggerElement.offsetWidth;
            activeIndicatorElement.style.insetInlineStart = `${getInlineStartPosition(position)}px`;
        }
        activeIndicatorElement.style.width = `${activeTriggerElement?.offsetWidth}px`;
    } else if (isOverflowingRight) {
        const position = triggerListElement.clientWidth - activeTriggerElement.offsetWidth;
        activeIndicatorElement.style.insetInlineStart = `${getInlineStartPosition(position)}px`;
        activeIndicatorElement.style.width = `${activeTriggerElement.offsetWidth}px`;
    } else {
        activeIndicatorElement.style.insetInlineStart = `${getInlineStartPosition(activeTriggerElement.offsetLeft)}px`;
        activeIndicatorElement.style.width = `${activeTriggerElement.offsetWidth}px`;
    }
};

export const useTabTriggers = ({
    activeTab,
}: {
    activeTab?: string;
}): {
    // Structural ref types so the annotation is valid for both @types/react@18
    // (useRef returns MutableRefObject) and @types/react@19 (RefObject<T | null>).
    triggerListRef: { current: HTMLDivElement | null };
    activeIndicatorRef: { current: HTMLSpanElement | null };
    triggers: TabTrigger[];
    triggersOutOfView: TabTrigger[];
    addTrigger: (trigger: TabTrigger) => void;
} => {
    const triggerListRef = useRef<HTMLDivElement | null>(null);
    const activeIndicatorRef = useRef<HTMLSpanElement | null>(null);
    const [triggers, setTriggers] = useState<TabTrigger[]>([]);
    const [triggersOutOfView, setTriggersOutOfView] = useState<TabTrigger[]>([]);

    // move the active indicator and scroll to the correct position when the tab changes
    useEffect(() => {
        const triggerListElement = triggerListRef.current;
        const activeTriggerElement = triggerListElement?.querySelector('[data-state="active"]');

        if (activeTriggerElement instanceof HTMLButtonElement && triggerListElement instanceof HTMLDivElement) {
            moveActiveIndicator(triggerListElement, activeIndicatorRef);
            activeTriggerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        }
    }, [activeTab, activeIndicatorRef]);

    useLayoutEffect(() => {
        const triggerListElement = triggerListRef.current;
        const activeTriggerElement = triggerListElement?.querySelector('[data-state="active"]');

        if (triggerListElement instanceof HTMLDivElement && activeTriggerElement instanceof HTMLButtonElement) {
            // move the active indicator to the initial active tab
            moveActiveIndicator(triggerListElement, activeIndicatorRef);

            // observe addition of the dropdown trigger which reduces the available width
            const mutationObserver = new MutationObserver(() => {
                activeTriggerElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'end' });
                moveActiveIndicator(triggerListElement, activeIndicatorRef);
            });
            if (triggerListElement.parentNode) {
                mutationObserver.observe(triggerListElement.parentNode, { childList: true });
            }

            // calculate the overflowing elements when item starts overflowing the parent
            const intersectionObserver = new IntersectionObserver(
                () => {
                    setTriggersOutOfView(getOverflowingTriggers(triggers, triggerListElement));
                    moveActiveIndicator(triggerListElement, activeIndicatorRef);
                },
                {
                    root: triggerListElement,
                    threshold: 1,
                },
            );
            for (const trigger of triggers) {
                if (trigger.ref?.current) {
                    intersectionObserver.observe(trigger.ref.current);
                }
            }

            return () => {
                intersectionObserver.disconnect();
                mutationObserver.disconnect();
            };
        }
    }, [triggers, triggerListRef, activeIndicatorRef]);

    const addTrigger = useCallback((trigger: TabTrigger) => {
        setTriggers((prev) => {
            const index = prev.findIndex((element) => element.value === trigger.value);

            if (index === -1) {
                return [...prev, trigger];
            }

            const next = [...prev];
            next[index] = trigger;
            return next;
        });
    }, []);

    return {
        triggerListRef,
        activeIndicatorRef,
        triggersOutOfView,
        triggers,
        addTrigger,
    };
};
