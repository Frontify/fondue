/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A long-form prose guide bundled with the SDK (getting started, contributing, etc.). */
export interface Guide {
    /** Slug, the source file path relative to the guides dir, e.g. "getting-started/installation". */
    readonly id: string;
    /** Display title, the `id` slug with dashes replaced by spaces, e.g. "getting started/installation". */
    readonly title: string;
    /** Raw markdown body (includes the leading `# Title`). */
    readonly content: string;
}

/** Filter options for `guides.where(...)`. */
export interface GuideFilter {
    /** Free-text match against id, title, and content (case-insensitive). */
    text?: string;
}
