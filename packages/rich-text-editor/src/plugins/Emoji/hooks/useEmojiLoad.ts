/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';

import { loadEmoji } from '../helpers/data';
import { type EmojiData } from '../helpers/emojiControls';

/** Loads the emoji data for `lang` and resets the active option when it arrives. */
export const useEmojiLoad = (lang: string, setData: (data: EmojiData) => void, setIndex: (index: number) => void) => {
    useEffect(() => {
        let current = true;
        const show = (next: EmojiData) => {
            if (current) {
                setData(next);
                setIndex(0);
            }
        };

        loadEmoji(lang)
            .then((entries) => show({ status: 'ready', entries }))
            .catch(() => show({ status: 'failed' }));

        return () => {
            current = false;
        };
    }, [lang, setData, setIndex]);
};
