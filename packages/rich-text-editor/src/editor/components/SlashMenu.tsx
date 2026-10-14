/* (c) Copyright Frontify Ltd., all rights reserved. */

// The `/` block-command menu: session tracking and keys in `SlashMenu`, the popup in `SlashList`.

import { type ReactNode, type RefObject, useEffect, useId, useReducer, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { PARAGRAPH, type RteBlockCommand } from '#/core';

import { matchCommands } from '../helpers/blockCommands';
import { type EditorStateStore } from '../hooks/useEditorHandle';
import { readSelectionRect, useFollowViewport } from '../hooks/useSelectionRect';
import { type EditorHandle, type FloatingRect } from '../port';

import styles from './slashMenu.module.scss';

/** The character that opens the menu. */
const TRIGGER = '/';

/** The gap between the caret and the list. */
const LIST_OFFSET = 4;

/** The list's tallest: what has to fit under the caret for it to open downward. */
const LIST_HEIGHT = 288;

const GROUPS: readonly { group: RteBlockCommand['group']; label: string }[] = [
    { group: 'turnInto', label: 'Turn into' },
    { group: 'insert', label: 'Insert' },
];

type Session = { query: string; index: number };

/**
 * The commands in the order they are listed: grouped, each group in the order
 * the plugins gave them. The arrow keys and the highlight walk this order.
 */
const inListOrder = (commands: readonly RteBlockCommand[]): RteBlockCommand[] =>
    GROUPS.flatMap(({ group }) => commands.filter((command) => command.group === group));

/** `n commands`, or none — what the status region says as the list narrows. */
const describeCount = (count: number): string =>
    count === 0 ? 'No results' : `${count} ${count === 1 ? 'command' : 'commands'}`;

/**
 * The `/` menu: typed at the start of an empty paragraph it lists every block
 * command, narrowing as the rest of the word is typed. Notion's behaviour:
 *
 * - Arrow keys move, Enter or Tab runs the highlighted command, Escape closes
 *   and leaves the typed text, a click elsewhere closes.
 * - Backspacing over the `/` — or anything moving the caret out of the text it
 *   is in — closes it too, and so does a space typed where nothing matches.
 * - Running a command first removes the `/query`, then runs it on what is left.
 *
 * Focus never leaves the text: the menu is a listbox the editable element
 * points at with `aria-activedescendant`. The keys it takes are caught before
 * the editor sees them, on the container holding the editable element — the
 * shell never knows which engine that is.
 */
export const SlashMenu = ({
    handle,
    editorState,
    editableRef,
    commands,
}: {
    handle: EditorHandle;
    editorState: EditorStateStore;
    editableRef: RefObject<HTMLElement | null>;
    commands: readonly RteBlockCommand[];
}): ReactNode => {
    const { api } = handle;
    // Null while closed. Escape closes it and it stays shut until a `/` is
    // typed afresh — the text left behind does not reopen it. Mirrored in a
    // ref so the listeners below, set up once, always read the latest.
    const [session, setSession] = useState<Session | null>(null);
    const sessionRef = useRef<Session | null>(null);
    const updateSession = (next: Session | null): void => {
        sessionRef.current = next;
        setSession(next);
    };

    const listed = inListOrder(commands);
    const matches = session === null ? [] : inListOrder(matchCommands(listed, session.query));
    const matchesRef = useRef(matches);
    matchesRef.current = matches;
    const listedRef = useRef(listed);
    listedRef.current = listed;

    // Opening, narrowing and closing all follow the text, read after every
    // editor state change whoever caused it.
    useEffect(() => {
        let previous = '';
        return editorState.subscribe(() => {
            const selection = api.selection.get();
            // Only the empty paragraph at the top level: not a heading, not a list item.
            const eligible =
                selection.isCollapsed && selection.block?.type === PARAGRAPH && selection.blocks.length === 1;
            const before = eligible ? api.text.beforeCaret() : '';
            const current = sessionRef.current;
            if (current === null) {
                // The `/` just arrived, alone in its block — typed, not walked into.
                if (before === TRIGGER && previous === '' && api.text.afterCaret() === '') {
                    updateSession({ query: '', index: 0 });
                }
            } else if (!eligible || !before.startsWith(TRIGGER)) {
                updateSession(null);
            } else if (before.slice(1) !== current.query) {
                const query = before.slice(1);
                // A space typed where nothing matches: it was only text.
                const stuck = /\s$/.test(query) && matchCommands(listedRef.current, query).length === 0;
                updateSession(stuck ? null : { query, index: 0 });
            }
            previous = before;
        });
    }, [api, editorState]);

    const run = (command: RteBlockCommand): void => {
        const typed = api.text.beforeCaret().length;
        updateSession(null);
        api.text.deleteBefore(typed);
        command.run(api);
    };
    const runRef = useRef(run);
    runRef.current = run;

    // The keys, before the editor's own handling of them.
    const open = session !== null;
    useEffect(() => {
        // The element the engine mounts into: the editable one is inside it.
        const container = editableRef.current;
        if (!open || container === null) {
            return;
        }
        const onKeyDown = (event: KeyboardEvent): void => {
            const current = sessionRef.current;
            const matched = matchesRef.current;
            if (current === null || event.isComposing || event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }
            const consume = (): void => {
                event.preventDefault();
                event.stopPropagation();
            };
            switch (event.key) {
                case 'ArrowDown':
                case 'ArrowUp': {
                    if (matched.length === 0) {
                        return;
                    }
                    consume();
                    const step = event.key === 'ArrowDown' ? 1 : -1;
                    updateSession({ ...current, index: (current.index + step + matched.length) % matched.length });
                    break;
                }
                case 'Enter':
                case 'Tab': {
                    const command = matched[Math.min(current.index, matched.length - 1)];
                    // Nothing to run: Enter and Tab do what they always do.
                    if (command === undefined) {
                        return;
                    }
                    consume();
                    runRef.current(command);
                    break;
                }
                case 'Escape':
                    consume();
                    updateSession(null);
                    break;
                default:
            }
        };
        container.addEventListener('keydown', onKeyDown, true);
        return () => container.removeEventListener('keydown', onKeyDown, true);
    }, [open, editableRef]);

    if (session === null) {
        return null;
    }
    return (
        <SlashList
            handle={handle}
            editableRef={editableRef}
            commands={matches}
            index={Math.min(session.index, Math.max(matches.length - 1, 0))}
            onHover={(index) => updateSession({ ...session, index })}
            onRun={run}
            onDismiss={() => updateSession(null)}
        />
    );
};

/** The open menu: its position, its listbox, and what is said about it. */
const SlashList = ({
    handle,
    editableRef,
    commands,
    index,
    onHover,
    onRun,
    onDismiss,
}: {
    handle: EditorHandle;
    editableRef: RefObject<HTMLElement | null>;
    /** The matches, in list order. */
    commands: readonly RteBlockCommand[];
    index: number;
    onHover: (index: number) => void;
    onRun: (command: RteBlockCommand) => void;
    onDismiss: () => void;
}): ReactNode => {
    const listId = useId();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const optionId = (position: number): string => `${listId}-option-${position}`;
    const [, rerender] = useReducer((count: number) => count + 1, 0);

    // Placed from the caret as of this render, and followed while the page scrolls.
    useFollowViewport(rerender);
    const rect = readSelectionRect({ handle, editableRef, caret: true });

    // The editable element names the highlighted option, so a screen reader
    // follows the list while the caret stays in the text.
    const activeId = commands.length === 0 ? undefined : optionId(index);
    useEffect(() => {
        const editable = editableRef.current?.querySelector<HTMLElement>('[contenteditable]');
        if (!editable) {
            return;
        }
        editable.setAttribute('aria-controls', listId);
        if (activeId === undefined) {
            editable.removeAttribute('aria-activedescendant');
        } else {
            editable.setAttribute('aria-activedescendant', activeId);
        }
        return () => {
            editable.removeAttribute('aria-controls');
            editable.removeAttribute('aria-activedescendant');
        };
    }, [editableRef, listId, activeId]);

    // A press anywhere but the list ends it.
    useEffect(() => {
        const away = (event: Event): void => {
            if (!popupRef.current?.contains(event.target as Node)) {
                onDismiss();
            }
        };
        window.addEventListener('pointerdown', away, true);
        return () => window.removeEventListener('pointerdown', away, true);
    }, [onDismiss]);

    // Keep the highlighted row in view as the arrows walk the list.
    useEffect(() => {
        if (activeId !== undefined) {
            popupRef.current?.ownerDocument.getElementById(activeId)?.scrollIntoView?.({ block: 'nearest' });
        }
    }, [activeId]);

    if (rect === null) {
        return null;
    }
    const placement = placementOf(rect);

    let nextPosition = 0;
    return createPortal(
        <>
            <span role="status" className={styles.visuallyHidden}>
                {describeCount(commands.length)}
            </span>
            {/* The surface; the keyboard stays in the text, the mouse picks here. */}
            {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                ref={popupRef}
                className={styles.popup}
                style={placement}
                // Never take focus from the text: blurring it would end the session.
                onMouseDown={(event) => event.preventDefault()}
            >
                {commands.length === 0 ? (
                    <div className={styles.empty}>No results</div>
                ) : (
                    <div id={listId} role="listbox" aria-label="Commands" className={styles.list}>
                        {GROUPS.map(({ group, label }) => {
                            const inGroup = commands.filter((command) => command.group === group);
                            if (inGroup.length === 0) {
                                return null;
                            }
                            return (
                                <div key={group} role="group" aria-label={label}>
                                    <div aria-hidden className={styles.heading}>
                                        {label}
                                    </div>
                                    {inGroup.map((command) => {
                                        const position = nextPosition++;
                                        return (
                                            <SlashOption
                                                key={command.id}
                                                id={optionId(position)}
                                                command={command}
                                                isActive={position === index}
                                                onHover={() => onHover(position)}
                                                onRun={() => onRun(command)}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>,
        popupRoot(editableRef),
    );
};

const SlashOption = ({
    id,
    command,
    isActive,
    onHover,
    onRun,
}: {
    id: string;
    command: RteBlockCommand;
    isActive: boolean;
    onHover: () => void;
    onRun: () => void;
}): ReactNode => (
    // The keyboard drives the list from the text; the mouse picks here.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
        id={id}
        role="option"
        tabIndex={-1}
        aria-selected={isActive}
        onClick={onRun}
        onMouseMove={isActive ? undefined : onHover}
        className={isActive ? `${styles.option} ${styles.optionActive}` : styles.option}
    >
        <span aria-hidden className={styles.icon}>
            {command.icon}
        </span>
        <span>{command.label}</span>
    </div>
);

const popupRoot = (editableRef: RefObject<HTMLElement | null>): HTMLElement =>
    editableRef.current?.ownerDocument.body ?? document.body;

/** Fixed to the viewport under the caret, or above it where there is no room below. */
const placementOf = (rect: FloatingRect): { left: number; top?: number; bottom?: number } => {
    const below = window.innerHeight - (rect.top + rect.height);
    const left = Math.max(rect.left, LIST_OFFSET);
    return below >= LIST_HEIGHT || below >= rect.top
        ? { left, top: rect.top + rect.height + LIST_OFFSET }
        : { left, bottom: window.innerHeight - rect.top + LIST_OFFSET };
};
