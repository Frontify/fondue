/* (c) Copyright Frontify Ltd., all rights reserved. */

/** What a mention stores, flat on the inline node. */
export type MentionValue = {
    id: string;
    /** Shown in the text: `@ana`. */
    username: string;
    /** Shown on hover: `Ana Muster`. */
    name: string;
};

/** The void inline this plugin adds to the document. */
export type MentionInline = { type: 'mention' } & MentionValue;

/** Someone who can be mentioned — what the picker lists, and what choosing one stores. */
export type MentionItem = MentionValue;

/**
 * The people matching what has been typed after the trigger. May fetch: an
 * answer that arrives after the query moved on is dropped.
 */
export type MentionItems = (query: string) => readonly MentionItem[] | Promise<readonly MentionItem[]>;
