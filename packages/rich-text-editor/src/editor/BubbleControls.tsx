/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown, Flyout } from '@frontify/fondue-components';
import { IconCaretDown, IconCheckMark, IconDotsHorizontal } from '@frontify/fondue-icons';
import { type ComponentProps, type MouseEvent, type ReactNode, useRef, useState } from 'react';

import { type EditorControlApi, type RteBlockCommand, type RteSelectionSnapshot } from '#/core';

import { activeCommand, TEXT_COMMAND } from './blockCommands';
import styles from './richTextEditor.module.scss';

/** Never take the selection away from the text: the controls act on it. */
const keepSelection = (event: MouseEvent<HTMLElement>): void => event.preventDefault();

/**
 * Fondue's Button declares only the props it acts on and spreads the rest onto
 * the `<button>`, so the mousedown handler reaches the DOM all the same.
 */
const keepsSelection = { onMouseDown: keepSelection } as ComponentProps<typeof Button>;

/**
 * Where focus goes once a menu has closed: back to the text when the user ended
 * it from inside (a choice, Escape), and wherever they went when they clicked
 * away.
 */
const useReturnToText = (
    api: EditorControlApi,
): { returnToText: () => void; contentProps: { onCloseAutoFocus: (event: Event) => void } } => {
    const wantedRef = useRef(false);
    return {
        returnToText: () => {
            wantedRef.current = true;
        },
        contentProps: {
            onCloseAutoFocus: (event) => {
                event.preventDefault();
                if (wantedRef.current) {
                    wantedRef.current = false;
                    api.focus();
                }
            },
        },
    };
};

/**
 * The "Turn into" menu: a button naming what the block is now, listing what it
 * can become. Every command that converts a block, the built-in Text first.
 */
export const TurnInto = ({
    api,
    commands,
    selection,
}: {
    api: EditorControlApi;
    /** The `'turnInto'` commands. */
    commands: readonly RteBlockCommand[];
    selection: RteSelectionSnapshot;
}): ReactNode => {
    const active = activeCommand(commands, selection);
    const { returnToText, contentProps } = useReturnToText(api);
    const label = active?.label ?? TEXT_COMMAND.label;

    return (
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button
                    type="button"
                    size="medium"
                    emphasis="weak"
                    aria-label={`Turn into: ${label}`}
                    title="Turn into"
                    {...keepsSelection}
                    className={styles.turnInto}
                >
                    <span>{label}</span>
                    <IconCaretDown size={16} />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Content {...contentProps} onEscapeKeyDown={returnToText}>
                {commands.map((command) => {
                    const isActive = command === active;
                    return (
                        <Dropdown.Item
                            key={command.id}
                            textValue={command.label}
                            aria-label={isActive ? `${command.label}, current` : command.label}
                            onSelect={() => {
                                returnToText();
                                // Idempotent: picking what the block already is changes nothing
                                // (a list entry would otherwise toggle the list off).
                                if (!isActive) {
                                    command.run(api);
                                }
                            }}
                        >
                            {command.icon === undefined ? null : (
                                <Dropdown.Slot name="left">{command.icon}</Dropdown.Slot>
                            )}
                            {/* An element of its own: the menu keys only the ones it is handed, and wraps bare text without. */}
                            <span>{command.label}</span>
                            {isActive ? (
                                <Dropdown.Slot name="right">
                                    <IconCheckMark size={16} />
                                </Dropdown.Slot>
                            ) : null}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

/**
 * The "More" menu: the controls the floating bar has no room for, drawn as
 * they are in the top toolbar. A flyout rather than a menu, because they are
 * arbitrary controls (a group of alignment buttons) and not a list of actions.
 */
export const MoreControls = ({
    api,
    children,
}: {
    api: EditorControlApi;
    /** The overflow items, already rendered. */
    children: ReactNode;
}): ReactNode => {
    const [open, setOpen] = useState(false);
    const { returnToText, contentProps } = useReturnToText(api);

    return (
        <Flyout.Root open={open} onOpenChange={setOpen}>
            <Flyout.Trigger>
                <Button type="button" size="medium" emphasis="weak" aria-label="More" title="More" {...keepsSelection}>
                    <IconDotsHorizontal size={16} />
                </Button>
            </Flyout.Trigger>
            <Flyout.Content {...contentProps} onEscapeKeyDown={returnToText} aria-label="More formatting" width="auto">
                <Flyout.Body>
                    <div className={styles.overflow} role="group" aria-label="More formatting">
                        {children}
                    </div>
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
