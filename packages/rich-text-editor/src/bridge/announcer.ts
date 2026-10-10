/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { type RuntimeEnvironment } from '#/model';

/** Messages with one coalescing key that arrive within this time announce only the latest (SPEC-rich-text-accessibility/AC-040). */
export const COALESCE_MS = 500;
const NO_BREAK_SPACE = ' ';

export interface Announcer {
    /** The ref of the editor's one polite live region, which exists before any message (SPEC-rich-text-accessibility/AC-037). */
    readonly setRegion: (element: HTMLElement | null) => void;
    /** Announces `message` now, or with a `key` once no other message with that key followed it for 500 ms. */
    readonly announce: (message: string, key?: string) => void;
    /** Drops the messages that wait for their key's quiet time. */
    readonly dispose: () => void;
}

export const createAnnouncer = (clock: RuntimeEnvironment['clock']): Announcer => {
    let region: HTMLElement | null = null;
    let previous = '';
    const waiting = new Map<string, number>();

    const speak = (message: string) => {
        if (region === null) {
            return;
        }
        // A cleared region and a changed text make a repeat read again, by VoiceOver in Safari too (SPEC-rich-text-accessibility/AC-039, CL-3082).
        region.textContent = '';
        let text = message;
        if (text === previous) {
            text += NO_BREAK_SPACE;
        }
        previous = text;
        region.textContent = text;
    };

    return {
        setRegion: (element) => {
            region = element;
        },
        announce: (message, key) => {
            if (key === undefined) {
                speak(message);
                return;
            }
            const timer = waiting.get(key);
            if (timer !== undefined) {
                clock.clearTimeout(timer);
            }
            const next = clock.setTimeout(() => {
                waiting.delete(key);
                speak(message);
            }, COALESCE_MS);
            waiting.set(key, next);
        },
        dispose: () => {
            for (const timer of waiting.values()) {
                clock.clearTimeout(timer);
            }
            waiting.clear();
        },
    };
};

export const AnnouncerContext = createContext<Announcer | null>(null);
AnnouncerContext.displayName = 'RichTextEditorAnnouncerContext';

/** Announces through the live region of the editor around the caller. */
export const useAnnounce = (): Announcer['announce'] => {
    const announcer = useContext(AnnouncerContext);
    if (announcer === null) {
        throw new Error('useAnnounce must be called inside RichTextEditor.Root.');
    }
    return announcer.announce;
};
