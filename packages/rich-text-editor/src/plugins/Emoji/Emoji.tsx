/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineInline, type RtePlugin } from '#/core';

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
 * inline through an ordinary hotkey, as a mention does; its `render.edit`
 * draws the query and list, and on a choice takes itself away and leaves the
 * emoji behind as text.
 */
export const emojiPlugin = (options: EmojiPluginOptions = {}): RtePlugin => {
    const { emojis = defaultEmojis } = options;
    return {
        id: 'emoji',
        inlines: {
            emojiDraft: defineInline({
                // Never stored with a value, so never drawn from one: the draft is all there is.
                toHtml: () => ({ tag: 'span' }),
                // Nothing pasted is a draft.
                parse: [],
                render: {
                    edit: ({ isFocused, remove, api }) => (
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
            }),
        },
        toolbarItem: ({ api }) => <EmojiToolbarButton api={api} emojis={emojis} />,
        hotkeys: {
            // Inserts an empty draft that `render.edit` takes over. The editor
            // fires it only at a word start, so `10:30` and `https:` stay as typed.
            [TRIGGER]: (api) => api.insert('emojiDraft'),
        },
    };
};
