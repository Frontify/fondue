/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, Flyout } from '@frontify/fondue-components';
import { type ComponentType, useEffect, useId, useState } from 'react';

import { OverlayBody, useEditorOverlay } from '#/bridge/define';
import { useEditorHandle } from '#/index';

/** The commands the stand-ins run: the link stand-in's and `core`'s text insertion. */
interface FixtureCommands {
    readonly 'fixture.link.edit': undefined;
    readonly 'text.insert': { readonly text: string };
}

/** A fixture overlay, which its probe opens and closes. */
export interface FixtureOverlayProps {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
}

/** The link popover's form: a labelled URL field and Apply, which sets the link on the selection. */
export const LinkForm = ({ onApply }: { readonly onApply: () => void }) => {
    const fieldId = useId();
    return (
        <form
            aria-label="Link"
            onSubmit={(event) => {
                event.preventDefault();
                onApply();
            }}
        >
            <label htmlFor={fieldId}>URL</label>
            <input id={fieldId} defaultValue="https://example.com/fixture" />
            {/* An explicit tabindex, since WebKit leaves buttons out of the Tab order by default. */}
            <button type="submit" tabIndex={0}>
                Apply
            </button>
        </form>
    );
};

/**
 * Stands in for the link popover until TASK-rte-references ships it: a non-modal Fondue `Flyout` on the selection,
 * whose form may load lazily as `Body`.
 */
export const FixtureLinkPopover = ({
    open,
    onOpenChange,
    Body = LinkForm,
}: FixtureOverlayProps & { readonly Body?: ComponentType<{ readonly onApply: () => void }> }) => {
    const overlay = useEditorOverlay(open, onOpenChange);
    const handle = useEditorHandle<FixtureCommands>();
    const apply = () => {
        if (handle === null) {
            return;
        }
        handle.execute('fixture.link.edit');
        onOpenChange(false);
        handle.focus();
    };
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                aria-label="Link"
                container={overlay.container}
                side="bottom"
                data-test-id="fixture-link-popover"
            >
                <OverlayBody>
                    <Body onApply={apply} />
                </OverlayBody>
            </Flyout.Content>
        </Flyout.Root>
    );
};

const MENTIONS = ['Ada', 'Grace', 'Linus'];

/**
 * Stands in for the mention list until TASK-rte-references ships it: a Fondue `Flyout` at the caret that never takes
 * focus, whose active option the arrow keys move and Enter or Tab accepts.
 */
export const FixtureSuggestions = ({ open, onOpenChange }: FixtureOverlayProps) => {
    const overlay = useEditorOverlay(open, onOpenChange);
    const handle = useEditorHandle<FixtureCommands>();
    const [active, setActive] = useState(0);
    const accept = (index: number) => {
        if (handle !== null) {
            handle.execute('text.insert', { text: MENTIONS[index] ?? '' });
        }
        onOpenChange(false);
    };
    const { container } = overlay;
    // The keys reach the list through the surface, which keeps focus, as a suggestion plugin's keymap does.
    useEffect(() => {
        if (!open || container === null) {
            return undefined;
        }
        const owner = container.ownerDocument;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActive((active + 1) % MENTIONS.length);
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActive((active + MENTIONS.length - 1) % MENTIONS.length);
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
                event.preventDefault();
                accept(active);
            }
        };
        owner.addEventListener('keydown', onKey, true);
        return () => owner.removeEventListener('keydown', onKey, true);
    });
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                aria-label="Mentions"
                container={overlay.container}
                side="bottom"
                onOpenAutoFocus={(event) => event.preventDefault()}
                data-test-id="fixture-suggestions"
            >
                <div role="listbox" aria-label="Mentions">
                    {MENTIONS.map((label, index) => (
                        // oxlint-disable-next-line jsx-a11y/click-events-have-key-events -- keys reach the list through the surface.
                        <div
                            key={label}
                            role="option"
                            tabIndex={-1}
                            aria-selected={index === active}
                            onClick={() => accept(index)}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </Flyout.Content>
        </Flyout.Root>
    );
};

/** Stands in for the context menu until TASK-rte-tables ships it: a Fondue `Dropdown` on the selection's rectangle. */
export const FixtureMenu = ({ open, onOpenChange }: FixtureOverlayProps) => {
    const overlay = useEditorOverlay(open, onOpenChange);
    const handle = useEditorHandle<FixtureCommands>();
    return (
        <Dropdown.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Dropdown.Content
                ref={overlay.contentRef}
                container={overlay.container}
                aria-label="Block actions"
                data-test-id="fixture-menu"
            >
                <Dropdown.Item onSelect={() => handle?.execute('text.insert', { text: 'duplicate' })}>
                    Duplicate
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => handle?.execute('text.insert', { text: '' })}>Delete</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
