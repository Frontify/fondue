/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A long-form prose guide bundled with the SDK (getting started, contributing, etc.). */
export interface Guide {
    /** Slug, derived from the source filename, e.g. "getting-started". */
    readonly id: string;
    /** Display title, extracted from the first `# Title` line of the markdown. */
    readonly title: string;
    /** Raw markdown body (includes the leading `# Title`). */
    readonly content: string;
}

/** Filter options for `guides.where(...)`. */
export interface GuideFilter {
    /** Free-text match against id, title, and content (case-insensitive). */
    text?: string;
}
