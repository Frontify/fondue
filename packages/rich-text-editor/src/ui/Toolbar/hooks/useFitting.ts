/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';

import {
    focusFittedControl,
    measureToolbarFit,
    toolbarInlineEnds,
    type ToolbarFitting,
} from '../helpers/measureToolbarFit';

/** How many of `count` items fit before More, measured whenever the item set changes and fitted again on each resize. */
export const useFitting = (root: RefObject<HTMLDivElement | null>, count: number, itemsKey: string): number => {
    const [fitting, setFitting] = useState<ToolbarFitting>({ itemsKey, shown: count });
    const endsRef = useRef<readonly number[]>([]);
    const moreSizeRef = useRef(0);
    // A refit that removes the focused control sends focus to More, or to the first item its menu held, not to the body.
    const refocusRef = useRef<'more' | number | undefined>(undefined);
    const shownRef = useRef(count);
    // A new item set shows every item once, so the layout effect measures them all.
    let { shown } = fitting;
    if (fitting.itemsKey !== itemsKey) {
        shown = count;
        setFitting({ itemsKey, shown });
    }

    useClientLayoutEffect(() => {
        const element = root.current;
        if (element === null) {
            return undefined;
        }

        const style = getComputedStyle(element);
        const ends = toolbarInlineEnds(element, style.direction === 'rtl');
        if (ends.length === count) {
            endsRef.current = ends;
        }

        const reading = { element, style, endsRef, moreSizeRef, refocusRef, shownRef, itemsKey, setFitting };
        measureToolbarFit(reading);
        const observer = new ResizeObserver(() => measureToolbarFit(reading));
        observer.observe(element);

        return () => observer.disconnect();
    }, [root, count, itemsKey]);
    useClientLayoutEffect(() => {
        shownRef.current = shown;
        const target = refocusRef.current;
        const element = root.current;
        if (target === undefined || element === null) {
            return;
        }

        refocusRef.current = undefined;
        focusFittedControl(element, target);
    }, [root, shown]);

    return shown;
};
