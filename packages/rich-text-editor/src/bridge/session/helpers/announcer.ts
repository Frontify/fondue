/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

/** Messages with one coalescing key that arrive within this time announce only the latest. */
export const COALESCE_MS = 500;
const NO_BREAK_SPACE = ' ';
// A quoted value between U+2068 and U+2069, which the region writes into a `bdi` of its own.
const ISOLATED = /\u2068([^\u2069]*)\u2069/;

/** `value` between the first strong isolate and the pop directional isolate, as a message quotes it. */
export const isolate = (value: string): string => `\u2068${value}\u2069`;

/** `text` as one node, with each isolated value in a `bdi`, so its direction cannot reorder the text around it. */
const contentOf = (owner: Document, text: string): Node => {
    const parts = text.split(ISOLATED);
    if (parts.length === 1) {
        return owner.createTextNode(text);
    }

    const content = owner.createElement('span');
    for (const [index, part] of parts.entries()) {
        if (index % 2 === 0) {
            content.append(part);
        } else {
            const quoted = owner.createElement('bdi');
            quoted.textContent = part;
            content.append(quoted);
        }
    }

    return content;
};

/** What speaks in one polite live region. */
export type Announcer = {
    /** The ref of the polite live region it speaks in, which exists before any message. */
    setRegion: (element: HTMLElement | null) => void;
    /** Announces `message` now, or with a `key` once no other message with that key followed it for 500 ms. */
    announce: (message: string, key?: string) => void;
    /** Drops the messages that wait for their key's quiet time. */
    dispose: () => void;
};

/**
 * An announcer of its own, for a surface that renders outside the editor: render its `setRegion` on an `aria-live`
 * element. Inside the editor, `api.announce` speaks in the editor's live region, so it needs none.
 */
export const createAnnouncer = (): Announcer => {
    let region: HTMLElement | null = null;
    let previous = '';
    const waiting = new Map<string, ReturnType<typeof setTimeout>>();

    const speak = (message: string) => {
        if (region === null) {
            return;
        }

        // A cleared region and a changed text make a repeat read again, by VoiceOver in Safari too.
        region.textContent = '';
        let text = message;
        if (text === previous) {
            text += NO_BREAK_SPACE;
        }

        previous = text;
        region.append(contentOf(region.ownerDocument, text));
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
                clearTimeout(timer);
            }

            const next = setTimeout(() => {
                waiting.delete(key);
                speak(message);
            }, COALESCE_MS);
            waiting.set(key, next);
        },
        dispose: () => {
            for (const timer of waiting.values()) {
                clearTimeout(timer);
            }

            waiting.clear();
        },
    };
};

export const AnnouncerContext = createContext<Announcer | null>(null);
AnnouncerContext.displayName = 'RichTextEditorAnnouncerContext';
