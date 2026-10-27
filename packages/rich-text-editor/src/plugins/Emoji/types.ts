/* (c) Copyright Frontify Ltd., all rights reserved. */

/** One emoji the plugin offers: what is inserted, and the words that find it. */
export type EmojiItem = {
    /** What goes into the text, as plain characters: `😄`. */
    emoji: string;
    /** What the picker calls it: `Grinning face with smiling eyes`. */
    name: string;
    /** Typed after the `:`, Slack and GitHub style: `smile`. The first is the one shown. */
    shortcodes: readonly string[];
    /** Further words a search finds it by: `happy`, `joy`. */
    keywords?: readonly string[];
    /** The picker's section for it. Sections appear in the order their first emoji does. */
    category: string;
};
