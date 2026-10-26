/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { useCallback, useState } from 'react';

import { type JsonValue } from '#/model';

import { useEditorOverlay } from '../../overlays/hooks/useEditorOverlay';
import { useEditorApi } from '../../pluginApi/hooks/useEditorApi';
import { type EditorApi, type OverlayProps } from '../../pluginApi/plugin';

import { OptionItem } from './OptionItem';

/** One choice of an options menu: the command it runs, with its payload, on the node the menu opened for. */
export type MenuOption = {
    key: string;
    label: string;
    command: string;
    payload?: JsonValue;
    /** A radio item, checked or not; a plain item without. */
    checked?: boolean;
    /** The option runs nothing and keeps the selection: it only closes the menu and returns focus to the surface. */
    inert?: boolean;
};

/**
 * A node chrome menu that a command opens at the selection, as a More row does: focus on the checked item, else the
 * first; an item selects the node the menu opened for, then runs its command and returns focus to the surface, and
 * Escape returns focus to the opener.
 */
export const OptionsMenu = ({
    label,
    options,
    node,
    close: onClose,
}: OverlayProps & {
    label: string;
    options: readonly MenuOption[];
    /** The node the menu acts on, wherever the selection goes while it is open. */
    node: Parameters<EditorApi['select']>[0];
}) => {
    const api = useEditorApi();
    const [open, setOpen] = useState(true);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };

    const overlay = useEditorOverlay(open, close);
    const { contentRef } = overlay;
    // Radix focuses the content of a menu with no trigger, so the checked item takes focus a frame later.
    const focusChecked = useCallback(
        (content: HTMLDivElement | null) => {
            contentRef(content);
            if (content === null) {
                return;
            }

            requestAnimationFrame(() =>
                (
                    content.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]') ??
                    content.querySelector<HTMLElement>('[role^="menuitem"]')
                )?.focus(),
            );
        },
        [contentRef],
    );

    return (
        <Dropdown.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Dropdown.Content ref={focusChecked} aria-label={label} container={overlay.container}>
                {options.map((option) => (
                    <OptionItem
                        key={option.key}
                        checked={option.checked}
                        onSelect={() => {
                            overlay.returnFocusTo(null);
                            close(false);
                            if (option.inert === true) {
                                api?.focus();

                                return;
                            }

                            api?.select(node);
                            api?.commands.execute(option.command, option.payload);
                        }}
                    >
                        {option.label}
                    </OptionItem>
                ))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
