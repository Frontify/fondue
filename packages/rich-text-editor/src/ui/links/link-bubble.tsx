/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, Tooltip, useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';

import { AnnouncerContext } from '#/bridge/announcer';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { passEscape, useEditorOverlay, useOverlayContainer, useScopedFocus } from '#/bridge/overlays';
import { checkHref } from '#/model';
import { linkAt, linkAtPos, type LinkRun } from '#/runtime/links';
import { type EditorRuntime } from '#/runtime/runtime';
import { useApplePlatform } from '#/ui/shortcuts';
import { Icon, keepFocus, returnFocus } from '#/ui/toolbar/item';
import toolbarStyles from '#/ui/toolbar/styles/toolbar.module.scss';

import { rangeAnchor } from './range-anchor';
import styles from './styles/links.module.scss';

/** The commands the bubble runs. */
export const EDIT_LINK = 'link.edit';
export const REMOVE_LINK = 'link.remove';
// The bubble stays out of the Tab order; Alt+F10 reaches it.
const OUT_OF_TAB_ORDER = -1;

/** The link bubble's strings, in the UI locale. */
export interface LinkBubbleStrings {
    readonly label: string;
    readonly open: string;
    readonly edit: string;
    readonly copy: string;
    readonly remove: string;
    readonly copied: string;
}

/** The link at a caret in an editable surface, at either edge of it or inside it; none for a range or a read-only surface. */
const caretLink = (runtime: EditorRuntime | undefined): LinkRun | undefined => {
    if (runtime === undefined || runtime.handle.getSummary().mode !== 'editable' || !runtime.state.selection.empty) {
        return undefined;
    }
    return linkAt(runtime.state);
};

const sameLink = (a: LinkRun | undefined, b: LinkRun | undefined) =>
    a === b || (a !== undefined && b !== undefined && a.from === b.from && a.to === b.to && a.attrs === b.attrs);

// Only a caret at a link is read, so typing elsewhere never renders the bubble.
const caretOf = (runtime: EditorRuntime | undefined): number => {
    if (caretLink(runtime) === undefined) {
        return -1;
    }
    return runtime?.state.selection.head ?? -1;
};

/** Opens a checked `href` in a new tab that cannot reach this page. */
export const openLink = (owner: Window | null, href: unknown): void => {
    const checked = typeof href === 'string' ? checkHref(href) : undefined;
    if (owner !== null && checked !== undefined && checked.ok) {
        owner.open(checked.href, '_blank', 'noopener,noreferrer');
    }
};

const BubbleButton = ({
    label,
    icon,
    describedBy,
    onPress,
}: {
    readonly label: string;
    readonly icon: string;
    /** The URL, so each control says which destination it acts on. */
    readonly describedBy: string;
    readonly onPress: (button: HTMLButtonElement) => void;
}) => {
    const container = useOverlayContainer();
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <RadixToolbar.Button
                    type="button"
                    tabIndex={OUT_OF_TAB_ORDER}
                    className={toolbarStyles.item}
                    aria-label={label}
                    aria-describedby={describedBy}
                    onMouseDown={keepFocus}
                    onClick={(event) => onPress(event.currentTarget)}
                >
                    <Icon name={icon} />
                </RadixToolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                {label}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};

/**
 * The link bubble: a `Flyout` on the whole link while the caret is at it or inside it, with the link's URL and Open,
 * Edit, Copy and Remove. Focus stays in the surface until Alt+F10 moves it to Open; Escape closes the bubble until the
 * caret moves. Open opens the checked `href` in a new tab, Edit opens the link popover, and Remove unlinks the whole
 * link, keeping its text.
 */
export const LinkBubble = ({
    strings,
    hidden,
    testId,
    bubbleRef,
}: {
    readonly strings: LinkBubbleStrings;
    /** While the link popover is open, which edits the same link. */
    readonly hidden: boolean;
    readonly testId: string;
    /** The bubble's toolbar while it shows, which Alt+F10 focuses. */
    readonly bubbleRef: MutableRefObject<HTMLDivElement | null>;
}) => {
    const runtime = useContext(SessionContext);
    const announcer = useContext(AnnouncerContext);
    const { dir } = useFondueTheme();
    const link = useSessionValue(caretLink, sameLink);
    const caret = useSessionValue(caretOf, Object.is);
    const focus = useScopedFocus();
    const urlId = useId();
    const [closedAt, setClosedAt] = useState<number | null>(null);
    // A caret move ends the close, so moving again within or into the link shows the bubble once more.
    if (closedAt !== null && closedAt !== caret) {
        setClosedAt(null);
    }
    const caretRef = useRef(caret);
    useClientLayoutEffect(() => {
        caretRef.current = caret;
    });
    const setOpen = useCallback((next: boolean) => {
        if (!next) {
            setClosedAt(caretRef.current);
        }
    }, []);
    const open = !hidden && link !== undefined && focus !== null && closedAt !== caret;
    const overlay = useEditorOverlay(open, setOpen);
    // The session arrives after the first render, so the anchor reads the one in context.
    const anchor = useMemo(
        () =>
            rangeAnchor(
                () => runtime?.view,
                () => caretLink(runtime),
            ),
        [runtime],
    );
    const apple = useApplePlatform();
    useEffect(() => {
        const surface = runtime?.view?.dom;
        if (runtime === undefined || surface === undefined) {
            return undefined;
        }
        // A link in the surface never navigates the page while it is edited; Mod+click opens it in a new tab, and in a
        // read-only surface a plain click follows it as the reader's link does.
        const onClick = (event: MouseEvent) => {
            const element = event.target instanceof Element ? event.target.closest('a[href]') : null;
            const { view } = runtime;
            if (element === null || view === undefined || !surface.contains(element) || event.button !== 0) {
                return;
            }
            const clicked = linkAtPos(view.state, view.posAtDOM(element, 0));
            const modified = apple ? event.metaKey : event.ctrlKey;
            const editable = runtime.handle.getSummary().mode === 'editable';
            if (!editable && !modified && clicked?.attrs.openInNewWindow !== true) {
                return;
            }
            event.preventDefault();
            if (modified || !editable) {
                openLink(surface.ownerDocument.defaultView, clicked?.attrs.href);
            }
        };
        surface.addEventListener('click', onClick);
        return () => surface.removeEventListener('click', onClick);
    }, [runtime, apple]);
    if (link === undefined) {
        return null;
    }
    const href = typeof link.attrs.href === 'string' ? link.attrs.href : '';
    const back = (button: HTMLButtonElement) => {
        if (runtime !== undefined) {
            returnFocus(runtime, [button.closest('[role="toolbar"]')]);
        }
    };
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to.
                aria-label={strings.label}
                container={overlay.container}
                side="bottom"
                align="start"
                padding="tight"
                data-test-id={`${testId}-link-bubble`}
                onOpenAutoFocus={(event) => event.preventDefault()}
                onEscapeKeyDown={passEscape}
            >
                <RadixToolbar.Root
                    ref={bubbleRef}
                    className={styles.bubble}
                    // Radix writes `ltr` unless told, so the arrows follow the theme's visual order.
                    dir={dir}
                    aria-label={strings.label}
                    tabIndex={OUT_OF_TAB_ORDER}
                    data-rte-link-bubble=""
                >
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <span id={urlId} className={styles.url}>
                                <bdi>{href}</bdi>
                            </span>
                        </Tooltip.Trigger>
                        <Tooltip.Content padding="compact" container={overlay.container}>
                            <bdi>{href}</bdi>
                        </Tooltip.Content>
                    </Tooltip.Root>
                    <BubbleButton
                        label={strings.open}
                        icon="IconArrowOutExternal"
                        describedBy={urlId}
                        onPress={(button) => {
                            openLink(button.ownerDocument.defaultView, href);
                        }}
                    />
                    <BubbleButton
                        label={strings.edit}
                        icon="IconPen"
                        describedBy={urlId}
                        onPress={() => {
                            runtime?.handle.execute(EDIT_LINK);
                        }}
                    />
                    <BubbleButton
                        label={strings.copy}
                        icon="IconClipboard"
                        describedBy={urlId}
                        onPress={(button) => {
                            const clipboard = button.ownerDocument.defaultView?.navigator.clipboard;
                            clipboard
                                ?.writeText(href)
                                .then(() => announcer?.announce(strings.copied))
                                .catch(() => undefined);
                            back(button);
                        }}
                    />
                    <BubbleButton
                        label={strings.remove}
                        icon="IconTrashBin"
                        describedBy={urlId}
                        onPress={(button) => {
                            runtime?.handle.execute(REMOVE_LINK);
                            back(button);
                        }}
                    />
                </RadixToolbar.Root>
            </Flyout.Content>
        </Flyout.Root>
    );
};
