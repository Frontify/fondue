/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useEffect, useRef, useState } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from '#/core';

import { type EditorStateStore } from './useEditorHandle';

/** How long the formatting has to stay put before it is read out. */
export const ANNOUNCEMENT_DELAY = 250;

/** `heading2` → `Heading 2`, `bulletList` → `Bullet list`: a type name as words. */
const humanize = (name: string): string => {
    const words = name
        .replaceAll(/([a-z])([A-Z\d])/g, '$1 $2')
        .replaceAll(/[-_]+/g, ' ')
        .toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
};

type Formatting = { block: string; list: string | null; marks: readonly string[] };

/**
 * What the selection is formatted as, in words. Read off the snapshot alone, so
 * it holds for any plugin: a block is named by its `style` when it has one (a
 * text style) and by its type otherwise, a list by the innermost type around
 * the block whose name ends in "list", a mark by its type.
 */
const formattingOf = (selection: RteSelectionSnapshot): Formatting => {
    const { block, blocks, marks } = selection;
    const blockName = typeof block?.style === 'string' ? block.style : (block?.type ?? '');
    const list = blocks.slice(1).find((candidate) => /list$/i.test(candidate.type));
    return {
        block: humanize(blockName),
        list: list === undefined ? null : humanize(list.type),
        marks: Object.keys(marks).map(humanize),
    };
};

/** What changed between two readings, as one short phrase — empty when nothing worth saying did. */
export const describeChange = (before: Formatting, after: Formatting): string => {
    const said: string[] = [];
    if (after.list !== before.list) {
        said.push(after.list ?? `${before.list ?? 'List'} off`);
    }
    if (after.block !== before.block && after.block !== '') {
        said.push(after.block);
    }
    for (const mark of after.marks) {
        if (!before.marks.includes(mark)) {
            said.push(`${mark} on`);
        }
    }
    for (const mark of before.marks) {
        if (!after.marks.includes(mark)) {
            said.push(`${mark} off`);
        }
    }
    return said.join(', ');
};

/**
 * The flag `useStatusAnnouncement` reads: raised by `expectAnnouncement` while
 * a command or an edit is being handled, and dropped again once that event is
 * over (end of the microtask), so only its own changes are spoken.
 */
export const useExpectedAnnouncement = (): {
    expectedRef: MutableRefObject<boolean>;
    expectAnnouncement: () => void;
} => {
    const expectedRef = useRef(false);
    const expectAnnouncement = (): void => {
        expectedRef.current = true;
        queueMicrotask(() => {
            expectedRef.current = false;
        });
    };
    return { expectedRef, expectAnnouncement };
};

/**
 * The text for the editor's status region: a formatting change the user just
 * made, read out once it has settled — "Bold on", "Heading 2", "Bullet list".
 *
 * Only changes the user asked for are spoken. `expectedRef` is set by the
 * editor while it handles a command (a shortcut, a toolbar control) or an edit
 * to the text (which is how a typing rule like `## ` ends up here), and cleared
 * once that event is over; a caret moved through differently formatted text is
 * not announced, since a screen reader already reads where the caret went.
 */
export const useStatusAnnouncement = ({
    api,
    editorState,
    expectedRef,
}: {
    api: EditorControlApi | null;
    editorState: EditorStateStore;
    expectedRef: MutableRefObject<boolean>;
}): string => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (api === null) {
            return;
        }
        let previous = formattingOf(api.selection.get());
        // Where the formatting stood before the changes waiting to be read
        // out: a command may take several steps (reset formatting does four),
        // and what is said is where they ended up.
        let baseline: Formatting | null = null;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const unsubscribe = editorState.subscribe(() => {
            const next = formattingOf(api.selection.get());
            if (expectedRef.current) {
                baseline ??= previous;
                const from = baseline;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    baseline = null;
                    const change = describeChange(from, previous);
                    if (change !== '') {
                        setMessage(change);
                    }
                }, ANNOUNCEMENT_DELAY);
            }
            previous = next;
        });
        return () => {
            clearTimeout(timer);
            unsubscribe();
        };
    }, [api, editorState, expectedRef]);

    return message;
};
