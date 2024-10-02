/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cloneElement, type RefObject, useEffect, useState, useRef, useLayoutEffect } from 'react';

import { type TabTrigger } from '../types';

const getOverflowingTriggers = (triggers: TabTrigger[], triggerListRef: RefObject<HTMLDivElement>) => {
    const triggersOutOfView: { value: string; element: JSX.Element }[] = [];
    for (const trigger of triggers) {
        if (trigger.ref.current && triggerListRef.current) {
            if (
                trigger.ref.current.getBoundingClientRect().right >
                    triggerListRef.current?.getBoundingClientRect().right ||
                trigger.ref.current.getBoundingClientRect().left < 0
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

type UseTabTriggersProps = {
    activeTab?: string;
};

export const useTabTriggers = ({
    activeTab,
}: UseTabTriggersProps): {
    triggerListRef: RefObject<HTMLDivElement>;
    triggersOutOfView: { value: string; element: JSX.Element }[];
    triggers: TabTrigger[];
    addTrigger: (trigger: TabTrigger) => void;
    activeIndicatorRef: RefObject<HTMLSpanElement>;
} => {
    const triggerListRef = useRef<HTMLDivElement>(null);
    const activeIndicatorRef = useRef<HTMLSpanElement>(null);
    const [triggers, setTriggers] = useState<TabTrigger[]>([]);
    const [triggersOutOfView, setTriggersOutOfView] = useState<{ value: string; element: JSX.Element }[]>([]);

    const moveActiveIndicator = (triggerListRef: RefObject<HTMLDivElement>) => {
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

    useEffect(() => {
        const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]');
        if (activeTriggerElement) {
            moveActiveIndicator(triggerListRef);
            activeTriggerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        }
    }, [activeTab]);

    useLayoutEffect(() => {
        const activeTriggerElement = triggerListRef.current?.querySelector('[data-state="active"]');
        if (activeTriggerElement) {
            activeTriggerElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'end' });
        }
        const triggerListElement = triggerListRef.current;
        const resizeIntersectionObserver = new IntersectionObserver(
            () => {
                setTriggersOutOfView(getOverflowingTriggers(triggers, triggerListRef));
                moveActiveIndicator(triggerListRef);
            },
            {
                root: triggerListElement,
                threshold: 1,
            },
        );
        for (const trigger of triggers) {
            if (trigger.ref.current) {
                resizeIntersectionObserver.observe(trigger.ref.current);
            }
        }
        return () => {
            for (const trigger of triggers) {
                if (trigger.ref.current) {
                    resizeIntersectionObserver.unobserve(trigger.ref.current);
                }
            }
        };
    }, [triggers, triggerListRef]);

    const handleAddTrigger = (trigger: TabTrigger) => {
        setTriggers((prev) => [...prev, trigger]);
    };

    return {
        triggers,
        triggerListRef,
        triggersOutOfView,
        addTrigger: handleAddTrigger,
        activeIndicatorRef,
    };
};
