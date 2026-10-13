/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flyout } from '@frontify/fondue-components';
import { type ReactNode, useState } from 'react';

import { type MarkEditorProps } from '#/core';

import { type LinkValue } from '../helpers/draft';
import styles from '../link.module.scss';

import { LinkTargetForm } from './LinkTargetForm';

/**
 * A link while editing: the anchor around the editable text, and a flyout
 * hanging off it.
 *
 * - With the caret in the link it shows the target, Edit and Remove.
 * - Open (`isOpen` — from Edit, or from the toolbar button) it shows the form.
 *
 * Open state is the editor's, which is what lets the toolbar open this flyout
 * rather than one of its own. A link the toolbar has just made has no target
 * yet; closing the form without saving one takes that link away again.
 */
export const LinkEditor = ({
    value,
    children,
    setValue,
    isFocused,
    isOpen,
    setOpen,
    remove,
    api,
}: MarkEditorProps<LinkValue>): ReactNode => {
    // Closed by hand (Escape, a click elsewhere) stays closed until the caret
    // leaves the link and comes back.
    const [dismissed, setDismissed] = useState(false);
    const [wasFocused, setWasFocused] = useState(isFocused);
    if (wasFocused !== isFocused) {
        setWasFocused(isFocused);
        setDismissed(false);
    }

    const close = (): void => {
        setOpen(false);
        setDismissed(true);
        if (value.href === '') {
            remove();
        }
        api.focus();
    };

    return (
        <Flyout.Root open={isOpen || (isFocused && !dismissed)} onOpenChange={(open) => (open ? undefined : close())}>
            <Flyout.Trigger asChild>
                <a
                    href={value.href}
                    className={styles.link}
                    // Placing the caret, not following the link, and not
                    // toggling the flyout: the caret decides whether it is open.
                    onClick={(event) => event.preventDefault()}
                >
                    {children}
                </a>
            </Flyout.Trigger>
            <Flyout.Content
                side="bottom"
                align="start"
                padding="compact"
                // The caret stays in the text until the user reaches in.
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                {isOpen ? (
                    <LinkTargetForm
                        initial={value}
                        onSave={(next) => {
                            // Closed first: the link is rebuilt with its new
                            // value, and would come back still open.
                            setOpen(false);
                            setValue(next);
                            api.focus();
                        }}
                        onCancel={close}
                    />
                ) : (
                    <div className={styles.panel}>
                        <a href={value.href} target="_blank" rel="noopener noreferrer" className={styles.target}>
                            {value.href}
                        </a>
                        <Button size="small" emphasis="weak" onPress={() => setOpen(true)}>
                            Edit
                        </Button>
                        <Button
                            size="small"
                            emphasis="weak"
                            onPress={() => {
                                remove();
                                api.focus();
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                )}
            </Flyout.Content>
        </Flyout.Root>
    );
};
