/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flyout } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react';

import { type EditProps } from '#/core';
import { useTranslate } from '#/ui/translation';

import { isSafeHref } from '../../shared/helpers/href';
import { isButtonLink, linkClassName } from '../helpers/appearance';
import { type LinkSearch } from '../helpers/destination';
import { NEW_TAB_REL, NEW_TAB_TARGET } from '../helpers/newTab';
import { type LinkAppearance, type LinkValue } from '../helpers/value';
import styles from '../link.module.scss';

import { LinkTargetForm } from './LinkTargetForm';

const PANEL_CONTROLS = 'a[href], button:not([disabled])';

type LinkEditorProps = EditProps<LinkValue> & {
    search?: LinkSearch;
    appearances?: readonly LinkAppearance[];
};

/**
 * A link while editing: the anchor around the editable text, with a flyout.
 * With the caret inside it shows the target, Edit and Remove; when `isOpen`
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
    search,
    appearances,
}: LinkEditorProps): ReactNode => {
    const translate = useTranslate();
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
    if (isSafeHref(value.href)) {
        href = value.href;
    }

    let appearance: LinkAppearance | undefined;
    if (isButtonLink(value)) {
        appearance = value.appearance;
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
                    className={linkClassName(appearance)}
                    // ARIA 1.3 global attribute that the lint rule's table does not know yet.
                    // oxlint-disable-next-line jsx-a11y/role-supports-aria-props
                    aria-description={
                        value.openInNewTab === true ? translate('RichTextEditor_linkOpensInNewTab') : undefined
                    }
                    // A click places the caret; it must neither follow the link nor toggle the flyout.
                    onClick={(event) => event.preventDefault()}
                >
                    {children}
                </a>
            </Flyout.Trigger>
            <Flyout.Content
                ref={contentRef}
                side="bottom"
                align="start"
                padding="compact"
                aria-label={isOpen ? translate('RichTextEditor_linkEdit') : translate('RichTextEditor_link')}
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
                            search={search}
                            appearances={appearances}
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
                        <div // NOSONAR
                            className={styles.panel}
                            onKeyDown={backToText}
                        >
                            <a href={href} target={NEW_TAB_TARGET} rel={NEW_TAB_REL} className={styles.target}>
                                {value.href}
                                <span className={styles.visuallyHidden}>
                                    {' '}
                                    {translate('RichTextEditor_linkOpensInNewTab')}
                                </span>
                            </a>
                            <Button size="small" emphasis="weak" onPress={() => setOpen(true)}>
                                {translate('RichTextEditor_edit')}
                            </Button>
                            <Button
                                size="small"
                                emphasis="weak"
                                onPress={() => {
                                    remove();
                                    api.focus();
                                }}
                            >
                                {translate('RichTextEditor_remove')}
                            </Button>
                        </div>
                    )}
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
