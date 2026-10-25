/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Announcements reach the one polite region: no assertive region, no alert and no live surface. */
export const liveRegionFaults = (root: ParentNode): string[] => {
    const faults: string[] = [];
    for (const element of root.querySelectorAll('[aria-live="assertive"]')) {
        faults.push(`a live region is assertive: ${element.outerHTML}`);
    }
    for (const element of root.querySelectorAll('[role="alert"]')) {
        faults.push(`a live region is an alert: ${element.outerHTML}`);
    }
    for (const element of root.querySelectorAll('[data-rte-surface][aria-live]')) {
        faults.push(`the surface is a live region: ${element.outerHTML}`);
    }
    return faults;
};
