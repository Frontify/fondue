/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, type RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { type TabTrigger } from '../types';

const getOverflowingTriggers = (triggers: TabTrigger[], triggerListElement: HTMLDivElement) => {
    const triggersOutOfView: TabTrigger[] = [];
    if (triggerListElement) {
        for (const trigger of triggers) {
            const triggerElement = trigger.ref?.current;
            if (triggerElement) {
                if (
                    triggerElement.offsetLeft + triggerElement.offsetWidth >
                        triggerListElement?.scrollLeft + triggerListElement.offsetWidth ||
                    triggerElement.offsetLeft - triggerListElement.scrollLeft < 0
                ) {
                    triggersOutOfView.push({
                        value: trigger.value,
                        disabled: trigger.disabled,
                        element: cloneElement(trigger.element, { ref: null }),
                    });
                }
            }
        }
    }
    return triggersOutOfView;
};

const moveActiveIndicator = (
    triggerListElement: HTMLDivElement,
    activeTriggerElement: HTMLButtonElement,
    activeIndicatorRef: RefObject<HTMLSpanElement>,
) => {
    const activeIndicatorElement = activeIndicatorRef.current as HTMLSpanElement;

    if (!triggerListElement || !activeTriggerElement) {
        return;
    }

    const isOverflowingLeft = triggerListElement?.scrollLeft > activeTriggerElement?.offsetLeft;
    const isOverflowingRight =
        activeTriggerElement?.offsetLeft + activeTriggerElement?.offsetWidth > triggerListElement?.offsetWidth;

    if (isOverflowingLeft) {
        const willFitAllItemsToTheLeft =
            triggerListElement.offsetWidth > activeTriggerElement.offsetWidth + activeTriggerElement.offsetLeft;
        if (willFitAllItemsToTheLeft) {
            activeIndicatorElement.style.left = `${activeTriggerElement.offsetLeft}px`;
        } else {
            activeIndicatorElement.style.left = `${triggerListElement.offsetWidth - activeTriggerElement.offsetWidth}px`;
        }
        activeIndicatorElement.style.width = `${activeTriggerElement?.offsetWidth}px`;
    } else if (isOverflowingRight) {
        activeIndicatorElement.style.left = `${triggerListElement.clientWidth - activeTriggerElement.offsetWidth}px`;
        activeIndicatorElement.style.width = `${activeTriggerElement.offsetWidth}px`;
    } else {
        activeIndicatorElement.style.left = `${activeTriggerElement.offsetLeft}px`;
        activeIndicatorElement.style.width = `${activeTriggerElement.offsetWidth}px`;
    }
};

export const useTabTriggers = ({
    activeTab,
}: {
    activeTab?: string;
}): {
    triggerListRef: RefObject<HTMLDivElement>;
    activeIndicatorRef: RefObject<HTMLSpanElement>;
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
        const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]');
        const triggerListElement = triggerListRef.current;

        if (activeTriggerElement instanceof HTMLButtonElement && triggerListElement instanceof HTMLDivElement) {
            moveActiveIndicator(triggerListElement, activeTriggerElement, activeIndicatorRef);
            activeTriggerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        }
    }, [activeTab, activeIndicatorRef]);

    useLayoutEffect(() => {
        const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]');
        const triggerListElement = triggerListRef.current;

        if (triggerListElement instanceof HTMLDivElement && activeTriggerElement instanceof HTMLButtonElement) {
            // move the active indicator to the initial active tab
            moveActiveIndicator(triggerListElement, activeTriggerElement, activeIndicatorRef);

            // observe addition of the dropdown trigger which reduces the available width
            const mutationObserver = new MutationObserver(() => {
                activeTriggerElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'end' });
                moveActiveIndicator(triggerListElement, activeTriggerElement, activeIndicatorRef);
            });
            if (triggerListElement.parentNode) {
                mutationObserver.observe(triggerListElement.parentNode, { childList: true });
            }

            // calculate the overflowing elements when item starts overflowing the parent
            const intersectionObserver = new IntersectionObserver(
                () => {
                    setTriggersOutOfView(getOverflowingTriggers(triggers, triggerListElement));
                    moveActiveIndicator(triggerListElement, activeTriggerElement, activeIndicatorRef);
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

    return {
        triggerListRef,
        activeIndicatorRef,
        triggersOutOfView,
        triggers,
        addTrigger: (trigger) => {
            setTriggers((prev) => [...prev, trigger]);
        },
    };
};
