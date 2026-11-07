/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A page an app offers as a link target, found by searching. */
export type LinkDestination = {
    id: string;
    /** What the person reads, and what the link text becomes when none was typed. */
    label: string;
    href: string;
};

/** Looks up destinations for what was typed. The request is aborted when a newer query replaces it. */
export type LinkSearch = (query: string, signal: AbortSignal) => Promise<readonly LinkDestination[]>;
