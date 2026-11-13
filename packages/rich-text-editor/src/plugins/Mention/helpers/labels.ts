/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * What a drawn mention says in words of its own, for a person the app no longer
 * knows or a mention with no username. The note shows when reading, not in exports.
 */
export type MentionContentLabels = {
    /**
     * Said after the username of someone the app no longer knows
     * @default '(unavailable)'
     */
    unavailable: string;
    /**
     * Shown in place of a person's username that is empty
     * @default 'Unknown person'
     */
    unknownPerson: string;
    /**
     * Shown in place of a group's username that is empty
     * @default 'Unknown group'
     */
    unknownGroup: string;
    /**
     * Shown in place of an empty username on a mention of everyone
     * @default 'Unknown mention'
     */
    unknownMention: string;
};

export const DEFAULT_MENTION_CONTENT_LABELS: MentionContentLabels = {
    unavailable: '(unavailable)',
    unknownPerson: 'Unknown person',
    unknownGroup: 'Unknown group',
    unknownMention: 'Unknown mention',
};
