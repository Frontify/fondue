/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type RtePlugin, type ToolbarItemProps } from '#/core';

import { EmojiDraft, TRIGGER } from './components/EmojiDraft';
import { EmojiToolbarButton } from './components/EmojiToolbarButton';
import { defaultEmojis } from './helpers/emojis';
import { type EmojiItem } from './types';

export type EmojiPluginOptions = {
    /**
     * The emoji offered, in picker order. `defaultEmojis` (a curated few
     * hundred) unless given; spread it into a list of your own to add more.
     */
    emojis?: readonly EmojiItem[];
};

/**
 * Emoji, inserted as the plain characters they are: from a picker in the
 * toolbar, or by typing `:` and a shortcode (`:smi` lists 😄 and friends,
 * `:smile:` inserts it outright).
 *
 * The document never holds an emoji node. The `:` inserts an empty draft
 * inline through an ordinary hotkey, as a mention does; its `edit` view
 * draws the query and list, and on a choice takes itself away and leaves the
 * emoji behind as text.
 */
export const emojiPlugin = (options: EmojiPluginOptions = {}): RtePlugin => {
    const { emojis = defaultEmojis } = options;
    const EmojiToolbar = ({ api }: ToolbarItemProps) => <EmojiToolbarButton api={api} emojis={emojis} />;
    return definePlugin({
        id: 'emoji',
        content: defineContent({
            inlines: {
                emojiDraft: defineInline({
                    // Never stored with a value, so never drawn from one: the draft is all there is.
                    toHtml: () => ({ tag: 'span' }),
                    // Nothing pasted is a draft.
                    parse: [],
                }),
            },
        }),
        toolbar: [{ render: EmojiToolbar }],
        edit: {
            emojiDraft: ({ isFocused, remove, api }) => (
                <EmojiDraft
                    emojis={emojis}
                    focused={isFocused}
                    onChoose={(item) => {
                        remove();
                        api.focus();
                        api.insertText(item.emoji);
                    }}
                    onCancel={(text) => {
                        remove();
                        api.focus();
                        api.insertText(text);
                    }}
                    onRemove={() => {
                        remove();
                        api.focus();
                    }}
                />
            ),
        },
        hotkeys: {
            // Inserts an empty draft that the `edit` view takes over. The editor
            // fires it only at a word start, so `10:30` and `https:` stay as typed.
            [TRIGGER]: (api) => api.insert('emojiDraft'),
        },
    });
};
