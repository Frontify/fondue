/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Someone who can be mentioned: listed by the picker and stored flat on the inline node. */
export type MentionItem = {
    id: string;
    /** Shown in the text: `@ana`. */
    username: string;
    /** Shown on hover: `Ana Muster`. */
    name: string;
};

/** The void inline this plugin adds to the document. */
export type MentionInline = { type: 'mention' } & MentionItem;

/** The people matching the text typed after the trigger. May be async; stale answers are dropped. */
export type MentionItems = (query: string) => readonly MentionItem[] | Promise<readonly MentionItem[]>;
