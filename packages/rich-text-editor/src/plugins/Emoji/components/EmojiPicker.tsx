/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@frontify/fondue-components';
import { type ReactNode, type Ref, useMemo, useState } from 'react';

import styles from '../emoji.module.scss';
import { byCategory, searchEmojis } from '../helpers/search';
import { type EmojiItem } from '../types';

/** One emoji to click: the glyph, named for screen readers and on hover with its shortcode. */
const EmojiButton = ({ item, onPick }: { item: EmojiItem; onPick: (item: EmojiItem) => void }): ReactNode => (
    <button
        type="button"
        aria-label={item.name}
        title={item.shortcodes[0] === undefined ? item.name : `${item.name} (:${item.shortcodes[0]}:)`}
        className={styles.cell}
        onClick={() => onPick(item)}
    >
        {item.emoji}
    </button>
);

/**
 * The toolbar's picker: a search field over every emoji, by section. Typing
 * narrows it to the matches, best first, and Enter picks the first of them.
 */
export const EmojiPicker = ({
    emojis,
    onPick,
    searchRef,
}: {
    emojis: readonly EmojiItem[];
    onPick: (item: EmojiItem) => void;
    /** The search field, which the flyout focuses as it opens. */
    searchRef?: Ref<HTMLInputElement>;
}): ReactNode => {
    const [query, setQuery] = useState('');
    const sections = useMemo(() => byCategory(emojis), [emojis]);
    const matches = useMemo(() => searchEmojis(emojis, query), [emojis, query]);
    const searching = query.trim() !== '';

    return (
        <div className={styles.picker}>
            <TextInput
                ref={searchRef}
                type="search"
                aria-label="Search emoji"
                placeholder="Search emoji"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                    const first = matches[0];
                    if (event.key === 'Enter' && first) {
                        event.preventDefault();
                        onPick(first);
                    }
                }}
            />
            <div className={styles.sections}>
                {searching ? (
                    matches.length === 0 ? (
                        <div className={styles.empty} role="status">
                            No matches
                        </div>
                    ) : (
                        <div role="group" aria-label="Search results" className={styles.grid}>
                            {matches.map((item) => (
                                <EmojiButton key={item.emoji} item={item} onPick={onPick} />
                            ))}
                        </div>
                    )
                ) : (
                    sections.map(([category, items]) => (
                        <section key={category} aria-label={category}>
                            <div aria-hidden className={styles.sectionTitle}>
                                {category}
                            </div>
                            <div className={styles.grid}>
                                {items.map((item) => (
                                    <EmojiButton key={item.emoji} item={item} onPick={onPick} />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
};
