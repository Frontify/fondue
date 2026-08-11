/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Flyout, Label, TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from 'react';

import { type EditorControlApi, type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './link.module.scss';

/**
 * The value this plugin sets on text nodes. `openInNewTab` is stored only when
 * it is on — its attribute defaults to null, which is dropped on the way into
 * the document, so an ordinary link stays `{ link: { href } }`.
 */
export type LinkMark = {
    link?: { href: string; openInNewTab?: true };
};

/** Same rule the legacy editor used, so links that validated there still do. */
const isValidHref = (href: string): boolean => /^(https?:\/\/|mailto:|tel:).+/.test(href);

/** Anything that already names a scheme is left alone; a bare domain gets https. */
const hasScheme = (href: string): boolean => /^[a-z][a-z\d+.-]*:/i.test(href);

/**
 * What to store for what was typed, or null when it cannot be a link. Typing
 * `example.com` is the common case and means https, so it is completed rather
 * than rejected.
 */
const toHref = (typed: string): string | null => {
    const trimmed = typed.trim();
    if (trimmed === '') {
        return null;
    }
    const candidate = hasScheme(trimmed) ? trimmed : `https://${trimmed}`;
    return isValidHref(candidate) ? candidate : null;
};

/**
 * The link modal: a flyout anchored to the toolbar button, holding both halves
 * of a link — the text it reads as and the target it points at. Opening it
 * fills the text field from the selection (and from the whole link when the
 * caret sits inside one, which is why it selects that link first, so every
 * command acts on all of it rather than on the caret). With nothing selected
 * there is nothing to fill it with, so the text is typed here instead and the
 * link is created out of it.
 */
const LinkFlyout = ({ api }: { api: EditorControlApi }): ReactNode => {
    const active = api.isMarkActive('link');
    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState('');
    const [text, setText] = useState('');
    const [openInNewTab, setOpenInNewTab] = useState(false);
    // What the document already reads as, so the text is written back only when
    // the user actually changed it: rewriting it would flatten anything else the
    // selection carries (bold inside it, a mention next to it).
    const [documentText, setDocumentText] = useState('');
    const textId = useId();
    const urlId = useId();
    const textFieldRef = useRef<HTMLInputElement>(null);
    const urlFieldRef = useRef<HTMLInputElement>(null);

    const href = toHref(typed);
    const complete = href !== null && text.trim() !== '';

    const handleOpenChange = (next: boolean): void => {
        if (next) {
            api.selectMark('link');
            const value = api.getMarkValue('link');
            const selected = api.getSelectedText();
            setTyped(typeof value?.href === 'string' ? value.href : '');
            setOpenInNewTab(value?.openInNewTab === true);
            setText(selected);
            setDocumentText(selected);
        }
        setOpen(next);
    };

    // The flyout hands focus back to its own trigger as it closes, which would
    // undo the focus the mark commands already restored.
    const close = (): void => {
        setOpen(false);
        requestAnimationFrame(() => api.focus());
    };

    const commit = (): void => {
        if (!complete || href === null) {
            return;
        }
        // Writing the text puts it in the selection, so the mark below lands on
        // exactly it — the same path whether it was typed here or in the editor.
        if (text !== documentText) {
            api.replaceSelectionWithText(text);
        }
        // A value-carrying mark has to be cleared before it can be re-set:
        // toggling on top of an existing link would only remove it.
        if (api.isMarkActive('link')) {
            api.toggleMark('link');
        }
        api.toggleMark('link', openInNewTab ? { href, openInNewTab: true } : { href });
        close();
    };

    const remove = (): void => {
        api.toggleMark('link');
        close();
    };

    /** Enter submits from either field — a two-field form still behaves like one. */
    const submitOnEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            commit();
        }
    };

    const title = active ? 'Edit link' : 'Add link';

    return (
        <Flyout.Root open={open} onOpenChange={handleOpenChange}>
            <Flyout.Trigger>
                <ToolbarButton active={active} title={title} className={styles.label}>
                    Link
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content
                width="280px"
                // Whichever field still needs filling: with text selected the
                // target is all that is missing, so typing starts there.
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    (documentText === '' ? textFieldRef : urlFieldRef).current?.focus();
                }}
            >
                <Flyout.Header showCloseButton>{title}</Flyout.Header>
                <Flyout.Body>
                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <Label htmlFor={textId}>Text</Label>
                            <TextInput
                                id={textId}
                                ref={textFieldRef}
                                placeholder="Text to link"
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                                onKeyDown={submitOnEnter}
                            />
                        </div>
                        <div className={styles.field}>
                            <Label htmlFor={urlId}>Link to</Label>
                            <TextInput
                                id={urlId}
                                ref={urlFieldRef}
                                type="url"
                                placeholder="example.com"
                                value={typed}
                                status={typed !== '' && href === null ? 'error' : 'neutral'}
                                onChange={(event) => setTyped(event.target.value)}
                                onKeyDown={submitOnEnter}
                            />
                        </div>
                        <div className={styles.newTab}>
                            <Checkbox
                                aria-label="Open in new tab"
                                value={openInNewTab}
                                onChange={() => setOpenInNewTab((previous) => !previous)}
                            />
                            <span>Open in new tab</span>
                        </div>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    {active ? (
                        <Button emphasis="weak" onPress={remove}>
                            Remove
                        </Button>
                    ) : null}
                    <Button disabled={!complete} onPress={commit}>
                        {active ? 'Save' : 'Add'}
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};

export const LinkPlugin: RtePlugin = {
    id: 'link',
    schema: {
        marks: [
            {
                key: 'link',
                attributes: {
                    href: { parseFromDomAttribute: true },
                    // No parse rule: `target` is a string in HTML and a flag
                    // here, so a pasted link keeps its href but not this.
                    openInNewTab: { default: null },
                },
                // Outside every other mark, so a link whose text is styled only
                // in part still renders as ONE anchor: an element stays open
                // across text runs only while the marks around it are the same,
                // and a colour or an emphasis inside would otherwise cut it up.
                nesting: -2,
                render: ({ value, children }) => (
                    <a
                        href={String(value.href)}
                        className={styles.link}
                        {...(value.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {children}
                    </a>
                ),
            },
        ],
    },
    toolbar: (api) => <LinkFlyout api={api} />,
};
