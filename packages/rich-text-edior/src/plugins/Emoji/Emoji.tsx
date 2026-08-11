/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

/**
 * An emoji is plain text, so this plugin contributes no schema: `:` opens a
 * picker and choosing an entry types the character. The set is bundled rather
 * than pulled from a data package — a spike does not need ten thousand of them.
 */
const EMOJIS: [glyph: string, name: string][] = [
    ['😀', 'grinning'],
    ['😃', 'smiley'],
    ['😄', 'smile'],
    ['😁', 'grin'],
    ['😂', 'joy'],
    ['🙂', 'slightly smiling'],
    ['😉', 'wink'],
    ['😊', 'blush'],
    ['😍', 'heart eyes'],
    ['😘', 'kiss'],
    ['😎', 'sunglasses cool'],
    ['🤔', 'thinking'],
    ['🤗', 'hugs'],
    ['🤩', 'star struck'],
    ['😐', 'neutral'],
    ['😴', 'sleeping'],
    ['😢', 'cry'],
    ['😭', 'sob'],
    ['😅', 'sweat smile'],
    ['😬', 'grimacing'],
    ['😳', 'flushed'],
    ['🥳', 'partying'],
    ['🤯', 'mind blown'],
    ['😤', 'triumph'],
    ['😱', 'scream'],
    ['🙃', 'upside down'],
    ['🤷', 'shrug'],
    ['🙌', 'raised hands'],
    ['👏', 'clap'],
    ['👍', 'thumbs up'],
    ['👎', 'thumbs down'],
    ['👌', 'ok hand'],
    ['🤝', 'handshake'],
    ['🙏', 'pray thanks'],
    ['💪', 'muscle'],
    ['✌️', 'victory peace'],
    ['👀', 'eyes'],
    ['🧠', 'brain'],
    ['❤️', 'heart red'],
    ['🧡', 'heart orange'],
    ['💚', 'heart green'],
    ['💙', 'heart blue'],
    ['💜', 'heart purple'],
    ['🖤', 'heart black'],
    ['💔', 'broken heart'],
    ['✨', 'sparkles'],
    ['🌟', 'star glowing'],
    ['⭐', 'star'],
    ['🔥', 'fire'],
    ['💥', 'boom'],
    ['🎉', 'tada party'],
    ['🎊', 'confetti'],
    ['🎂', 'cake birthday'],
    ['🎁', 'gift'],
    ['🏆', 'trophy'],
    ['🥇', 'first place medal'],
    ['🚀', 'rocket ship'],
    ['✅', 'check mark done'],
    ['☑️', 'checkbox'],
    ['❌', 'cross wrong'],
    ['⚠️', 'warning'],
    ['❓', 'question'],
    ['❗', 'exclamation'],
    ['💡', 'bulb idea'],
    ['📌', 'pushpin'],
    ['📎', 'paperclip'],
    ['📝', 'memo note'],
    ['📄', 'page document'],
    ['📊', 'bar chart'],
    ['📈', 'chart increasing'],
    ['📉', 'chart decreasing'],
    ['📅', 'calendar'],
    ['⏰', 'alarm clock'],
    ['⏳', 'hourglass'],
    ['🔍', 'magnifying glass search'],
    ['🔒', 'lock'],
    ['🔑', 'key'],
    ['🔧', 'wrench'],
    ['🛠️', 'tools'],
    ['🐛', 'bug'],
    ['💻', 'laptop computer'],
    ['🖥️', 'desktop'],
    ['📱', 'mobile phone'],
    ['⌨️', 'keyboard'],
    ['🖨️', 'printer'],
    ['💾', 'floppy save'],
    ['🗑️', 'wastebasket delete'],
    ['📦', 'package'],
    ['✉️', 'envelope mail'],
    ['📢', 'loudspeaker announce'],
    ['🔔', 'bell'],
    ['🎨', 'art palette'],
    ['🎯', 'target dart'],
    ['🧩', 'puzzle'],
    ['🗺️', 'map'],
    ['🌍', 'earth globe'],
    ['☀️', 'sun'],
    ['🌙', 'moon'],
    ['☁️', 'cloud'],
    ['🌧️', 'rain'],
    ['❄️', 'snowflake'],
    ['🌱', 'seedling'],
    ['🌳', 'tree'],
    ['🌸', 'blossom'],
    ['🍀', 'four leaf clover luck'],
    ['☕', 'coffee'],
    ['🍕', 'pizza'],
    ['🍺', 'beer'],
    ['🥂', 'cheers'],
    ['🍎', 'apple'],
    ['🐱', 'cat'],
    ['🐶', 'dog'],
    ['🦄', 'unicorn'],
    ['🐢', 'turtle slow'],
    ['🚗', 'car'],
    ['✈️', 'airplane'],
    ['🏠', 'house'],
    ['🏢', 'office building'],
];

/** Word-prefix matching, so `:tha` finds "pray thanks" but `:ank` does not. */
const matches = (name: string, query: string): boolean =>
    query === '' || name.split(' ').some((word) => word.startsWith(query));

export const EmojiPlugin: RtePlugin = {
    id: 'emoji',
    combobox: {
        trigger: ':',
        items: (query) => {
            const needle = query.toLowerCase();
            return EMOJIS.filter(([, name]) => matches(name, needle)).map(([glyph, name]) => ({
                // The glyph is the identity here: it is unique, and it is what
                // gets inserted.
                id: glyph,
                label: name,
                hint: glyph,
            }));
        },
        onSelect: (item, api) => api.insertText(item.id),
    },
    // The button opens the same picker the trigger does, at the caret.
    toolbar: (api) => (
        <ToolbarButton title="Emoji" onClick={() => api.insertText(':')}>
            🙂
        </ToolbarButton>
    ),
};
