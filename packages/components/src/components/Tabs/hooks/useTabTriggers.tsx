/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, type RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { type TabTrigger } from '../types';

const getOverflowingTriggers = (triggers: TabTrigger[], triggerListRef: RefObject<HTMLDivElement>) => {
    const triggersOutOfView: { value: string; element: JSX.Element }[] = [];
    for (const trigger of triggers) {
        if (trigger.ref.current && triggerListRef.current) {
            if (
                trigger.ref.current.offsetLeft + trigger.ref.current.offsetWidth >
                    triggerListRef.current?.scrollLeft + triggerListRef.current?.offsetWidth ||
                trigger.ref.current.offsetLeft - triggerListRef.current?.scrollLeft < 0
            ) {
                triggersOutOfView.push({
                    value: trigger.value,
                    element: cloneElement(trigger.element, { ref: null }),
                });
            }
        }
    }
    return triggersOutOfView;
};

const moveActiveIndicator = (
    triggerListRef: RefObject<HTMLDivElement>,
    activeIndicatorRef: RefObject<HTMLSpanElement>,
) => {
    const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]') as HTMLElement;
    const triggerListElement = triggerListRef.current as HTMLDivElement;

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
            activeIndicatorRef.current!.style.left = `${activeTriggerElement.offsetLeft}px`;
        } else {
            activeIndicatorRef.current!.style.left = `${triggerListElement.offsetWidth - activeTriggerElement.offsetWidth}px`;
        }
        activeIndicatorRef.current!.style.width = `${activeTriggerElement?.offsetWidth}px`;
    } else if (isOverflowingRight) {
        activeIndicatorRef.current!.style.left = `${triggerListElement.clientWidth - activeTriggerElement.offsetWidth}px`;
        activeIndicatorRef.current!.style.width = `${activeTriggerElement.offsetWidth}px`;
    } else {
        activeIndicatorRef.current!.style.left = `${activeTriggerElement.offsetLeft}px`;
        activeIndicatorRef.current!.style.width = `${activeTriggerElement.offsetWidth}px`;
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
    triggersOutOfView: { value: string; element: JSX.Element }[];
    addTrigger: (trigger: TabTrigger) => void;
} => {
    const triggerListRef = useRef<HTMLDivElement>(null);
    const activeIndicatorRef = useRef<HTMLSpanElement>(null);
    const [triggers, setTriggers] = useState<TabTrigger[]>([]);
    const [triggersOutOfView, setTriggersOutOfView] = useState<{ value: string; element: JSX.Element }[]>([]);

    // move the active indicator and scroll to the correct position when the tab changes
    useEffect(() => {
        const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]');
        if (activeTriggerElement) {
            moveActiveIndicator(triggerListRef, activeIndicatorRef);
            activeTriggerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        }
    }, [activeTab, activeIndicatorRef]);

    useLayoutEffect(() => {
        const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]') as HTMLElement;
        const triggerListElement = triggerListRef.current as HTMLDivElement;

        // calculate the overflowing elements when item starts overflowing the parent
        const intersectionObserver = new IntersectionObserver(
            () => {
                setTriggersOutOfView(getOverflowingTriggers(triggers, triggerListRef));
            },
            {
                root: triggerListElement,
                threshold: 1,
            },
        );
        for (const trigger of triggers) {
            if (trigger.ref.current) {
                intersectionObserver.observe(trigger.ref.current);
            }
        }

        // observe addition of the dropdown trigger which reduces the available width
        const mutationObserver = new MutationObserver(() => {
            console.log('mutation observer');
            activeTriggerElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'end' });
            moveActiveIndicator(triggerListRef, activeIndicatorRef);
        });
        if (triggerListElement.parentNode) {
            mutationObserver.observe(triggerListElement.parentNode, { childList: true });
        }

        return () => {
            intersectionObserver.disconnect();
            mutationObserver.disconnect();
        };
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
