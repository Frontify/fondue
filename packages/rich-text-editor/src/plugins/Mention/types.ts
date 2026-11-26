/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Every kind a mention can have; the one list that `MentionKind` and parsing read. */
export const MENTION_KINDS = ['user', 'group', 'all'] as const;

/** Who a mention names: one person, a group of people, or everyone. */
export type MentionKind = (typeof MENTION_KINDS)[number];

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

/** The label of a stored mention with no username, for each kind. */
export type MentionUnknownLabels = Partial<Record<MentionKind, string>>;

/** Someone who can be mentioned, as the picker lists them. */
export type MentionItem = MentionValue & {
    /** Avatar URL, shown in the picker only; the document does not keep it. */
    image?: string;
};

/**
 * Where a mention links to, such as the profile of a person or group. Returns `undefined` when the mention has no page.
 */
export type MentionHref = (mention: MentionValue) => string | undefined;

/** The void inline this plugin adds to the document. */
export type MentionInline = { type: 'mention' } & MentionValue;

/** The people matching the text typed after the trigger. May be async; stale answers are dropped. */
export type MentionItems = (query: string) => readonly MentionItem[] | Promise<readonly MentionItem[]>;
