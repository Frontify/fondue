/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineContent, defineInline, definePlugin, type RtePlugin, type ToolbarItemProps } from '#/core';

import { EmojiDraft, TRIGGER } from './components/EmojiDraft';
import { EmojiToolbarButton } from './components/EmojiToolbarButton';
import { defaultEmojis } from './helpers/emojis';
import { type EmojiItem } from './types';

export type EmojiPluginOptions = {
    /**
     * The emoji offered, in picker order. Spread `defaultEmojis` into your own list to add more.
     * @default defaultEmojis
     */
    emojis?: readonly EmojiItem[];
};

/**
 * Emoji inserted as plain text, from a toolbar picker or by typing `:` and a shortcode
 * (`:smi` lists matches, `:smile:` inserts it outright)
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
        toolbar: [{ label: 'Emoji', render: EmojiToolbar }],
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
