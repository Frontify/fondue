/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flyout } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react';

import { type EditProps } from '#/core';
import { isApple } from '#/ui/platform';

import { type LinkSearch } from '../helpers/destination';
import { NEW_TAB_NOTE, NEW_TAB_REL, NEW_TAB_TARGET, NEW_TAB_WINDOW_FEATURES } from '../helpers/newTab';
import { allowsHref, type LinkPolicy } from '../helpers/policy';
import { type LinkValue } from '../helpers/value';
import styles from '../link.module.scss';

import { LinkTargetForm } from './LinkTargetForm';

/**
 * The controls Tab can reach in the panel.
 */
const PANEL_CONTROLS = 'a[href], button:not([disabled])';

const COPIED_TEXT = 'Link copied';
const COPY_FAILED_TEXT = 'Could not copy the link';

type CopyState = 'idle' | 'copied' | 'failed';

const describeCopy = (state: CopyState): string => {
    switch (state) {
        case 'idle':
            return '';
        case 'copied':
            return COPIED_TEXT;
        case 'failed':
            return COPY_FAILED_TEXT;
    }
};

type CopyLinkProps = {
    href: string;
};

/**
 * Copies the target and says whether it worked, in a live region that is always in the panel.
 */
const CopyLink = ({ href }: CopyLinkProps): ReactNode => {
    const [copyState, setCopyState] = useState<CopyState>('idle');
    const copy = (): void => {
        // Reset first, so the same outcome twice is announced twice.
        setCopyState('idle');
        // Inside a promise: a browser without the clipboard API throws before any promise exists.
        Promise.resolve()
            .then(() => navigator.clipboard.writeText(href))
            .then(() => setCopyState('copied'))
            .catch(() => setCopyState('failed'));
    };
    return (
        <>
            <Button size="small" emphasis="weak" onPress={copy}>
                Copy link
            </Button>
            <output className={styles.visuallyHidden}>{describeCopy(copyState)}</output>
        </>
    );
};

type LinkEditorProps = EditProps<LinkValue> & {
    policy: LinkPolicy;
    search?: LinkSearch;
};

/**
 * A link while editing: the anchor around the editable text, with a flyout.
 * With the caret inside it shows the target, Copy link, Edit and Remove; when `isOpen`
 * (Edit, the toolbar button, Mod-k) it shows the form instead.
 *
 * Open state belongs to the editor so the toolbar can open this flyout. Focus
 * returns to the text only on an explicit action (Escape, Save, Cancel, Remove).
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
    policy,
    search,
}: LinkEditorProps): ReactNode => {
    // A flyout closed by hand stays closed until the caret leaves the link and returns.
    const [dismissed, setDismissed] = useState(false);
    const [wasFocused, setWasFocused] = useState(isFocused);
    if (wasFocused !== isFocused) {
        setWasFocused(isFocused);
        setDismissed(false);
    }
    const anchorRef = useRef<HTMLAnchorElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    // Set by Escape just before the flyout reports itself closed.
    const escapedRef = useRef(false);
    const open = isOpen || (isFocused && !dismissed);

    const close = (refocus: boolean): void => {
        setOpen(false);
        setDismissed(true);
        // A link without a target is never left behind.
        if (value.href === '') {
            remove();
        }
        if (refocus) {
            api.focus();
        }
    };

    // Tab from the text enters the panel: it is portaled to the end of the page,
    // so the browser's tab order would skip it. Captured on the document, before
    // the editor sees the key.
    useEffect(() => {
        if (!open || isOpen) {
            return;
        }
        const anchor = anchorRef.current;
        const ownerDocument = anchor?.ownerDocument;
        if (!anchor || !ownerDocument) {
            return;
        }
        const enterPanel = (event: globalThis.KeyboardEvent): void => {
            const active = ownerDocument.activeElement;
            if (event.key !== 'Tab' || event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) {
                return;
            }
            if (!active?.contains(anchor)) {
                return;
            }
            const first = contentRef.current?.querySelector<HTMLElement>(PANEL_CONTROLS);
            if (first) {
                event.preventDefault();
                event.stopPropagation();
                first.focus();
            }
        };
        ownerDocument.addEventListener('keydown', enterPanel, true);
        return () => ownerDocument.removeEventListener('keydown', enterPanel, true);
    }, [open, isOpen]);

    // Shift-Tab from the panel's first control goes back where Tab came from.
    const backToText = (event: KeyboardEvent<HTMLDivElement>): void => {
        if (event.key !== 'Tab' || !event.shiftKey) {
            return;
        }
        if (event.target === event.currentTarget.querySelector(PANEL_CONTROLS)) {
            event.preventDefault();
            api.focus();
        }
    };

    let href: string | undefined;
    if (allowsHref(policy, value.href)) {
        href = value.href;
    }

    return (
        <Flyout.Root
            open={open}
            onOpenChange={(next) => {
                if (!next) {
                    close(escapedRef.current);
                    escapedRef.current = false;
                }
            }}
        >
            <Flyout.Trigger asChild>
                <a
                    ref={anchorRef}
                    href={href}
                    className={styles.link}
                    // ARIA 1.3 global attribute that the lint rule's table does not know yet.
                    // oxlint-disable-next-line jsx-a11y/role-supports-aria-props
                    aria-description={value.openInNewTab === true ? 'Opens in a new tab' : undefined}
                    // A click places the caret; it must neither follow the link nor toggle the flyout. Mod+click opens it.
                    onClick={(event) => {
                        event.preventDefault();
                        let modified = event.ctrlKey;
                        if (isApple()) {
                            modified = event.metaKey;
                        }
                        if (modified && href !== undefined) {
                            window.open(href, NEW_TAB_TARGET, NEW_TAB_WINDOW_FEATURES);
                        }
                    }}
                >
                    {children}
                </a>
            </Flyout.Trigger>
            <Flyout.Content
                ref={contentRef}
                side="bottom"
                align="start"
                padding="compact"
                aria-label={isOpen ? 'Edit link' : 'Link'}
                onEscapeKeyDown={() => {
                    escapedRef.current = true;
                }}
                // The caret stays in the text; the form focuses its own field.
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <Flyout.Body>
                    {isOpen ? (
                        <LinkTargetForm
                            initial={value}
                            kind="edit"
                            policy={policy}
                            search={search}
                            onSave={(next) => {
                                // Close first: the link is rebuilt with its new value and would reopen.
                                setOpen(false);
                                setValue(next);
                                api.focus();
                            }}
                            onCancel={() => close(true)}
                            onRemove={
                                value.href === ''
                                    ? undefined
                                    : () => {
                                          remove();
                                          api.focus();
                                      }
                            }
                        />
                    ) : (
                        // The div only catches the Tab key bubbling up from the controls inside it; it is not a control itself.
                        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
                        <div className={styles.panel} onKeyDown={backToText}>
                            <a href={href} target={NEW_TAB_TARGET} rel={NEW_TAB_REL} className={styles.target}>
                                {value.href}
                                <span className={styles.visuallyHidden}>{NEW_TAB_NOTE}</span>
                            </a>
                            {href !== undefined && <CopyLink href={href} />}
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
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
