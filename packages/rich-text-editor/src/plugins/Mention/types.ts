/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Who a mention names: one person, a group of people, or everyone. */
export type MentionKind = 'user' | 'group' | 'all';

/** What a mention stores on its inline node. */
export type MentionValue = {
    id: string;
    /** Shown in the text: `@ana`. */
    username: string;
    /** Shown on hover: `Ana Muster`. */
    name: string;
    /** A person when left out, as in documents written before kinds existed. */
    kind?: MentionKind;
};

/** Someone who can be mentioned, as the picker lists them. */
export type MentionItem = MentionValue & {
    /** Avatar URL, shown in the picker only; the document does not keep it. */
    image?: string;
};

/**
 * What the app knows now about a stored mention, by its id. The stored value
 * never changes: this only decides what is shown.
 */
export type MentionResolution =
    | { status: 'current'; username: string; name: string }
    | { status: 'unavailable'; reason: 'deleted' | 'forbidden' }
    | { status: 'unknown' };

/** The void inline this plugin adds to the document. */
export type MentionInline = { type: 'mention' } & MentionValue;

/** The people matching the text typed after the trigger. May be async; stale answers are dropped. */
export type MentionItems = (query: string) => readonly MentionItem[] | Promise<readonly MentionItem[]>;
