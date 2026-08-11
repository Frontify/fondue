/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Flyout, TextInput } from '@frontify/fondue-components';
import { type ReactNode, useState } from 'react';

import { type EditorControlApi, type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

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
 * The link modal: a flyout anchored to the toolbar button, in one of two modes.
 * With no link at the selection it adds one; with the caret inside a link it
 * edits or removes that link — which is why opening it selects the whole link
 * first, so every command acts on all of it rather than on the caret.
 */
const LinkFlyout = ({ api }: { api: EditorControlApi }): ReactNode => {
    const active = api.isMarkActive('link');
    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState('');
    const [openInNewTab, setOpenInNewTab] = useState(false);

    const href = toHref(typed);

    const handleOpenChange = (next: boolean): void => {
        if (next) {
            api.selectMark('link');
            const value = api.getMarkValue('link');
            setTyped(typeof value?.href === 'string' ? value.href : '');
            setOpenInNewTab(value?.openInNewTab === true);
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
        if (href === null) {
            return;
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

    const title = active ? 'Edit link' : 'Add link';

    return (
        <Flyout.Root open={open} onOpenChange={handleOpenChange}>
            <Flyout.Trigger>
                <ToolbarButton
                    active={active}
                    // Nothing to attach a new link to, and nothing to edit.
                    disabled={!active && api.isSelectionCollapsed()}
                    title={title}
                    style={{ textDecoration: 'underline' }}
                >
                    Link
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content width="280px">
                <Flyout.Header showCloseButton>{title}</Flyout.Header>
                <Flyout.Body>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <TextInput
                            aria-label="Link URL"
                            type="url"
                            placeholder="example.com"
                            value={typed}
                            status={typed !== '' && href === null ? 'error' : 'neutral'}
                            onChange={(event) => setTyped(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    commit();
                                }
                            }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Checkbox
                                aria-label="Open in new tab"
                                value={openInNewTab}
                                onChange={() => setOpenInNewTab((previous) => !previous)}
                            />
                            <span style={{ fontSize: 13 }}>Open in new tab</span>
                        </div>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    {active ? (
                        <Button emphasis="weak" onPress={remove}>
                            Remove
                        </Button>
                    ) : null}
                    <Button disabled={href === null} onPress={commit}>
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
                render: ({ value, children }) => (
                    <a
                        href={String(value.href)}
                        {...(value.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {children}
                    </a>
                ),
            },
        ],
    },
    // A stylesheet rule rather than an inline style on the anchor, so an
    // explicit font colour still wins: that mark writes `color` inline, and
    // inline beats a stylesheet whichever way round the two marks nest.
    styles: `
a {
    color: #2563eb;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
}
`,
    toolbar: (api) => <LinkFlyout api={api} />,
};
