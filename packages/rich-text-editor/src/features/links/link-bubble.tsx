/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, Tooltip } from '@frontify/fondue-components';
import { IconArrowOutExternal, IconClipboard, IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { keepFocus, NodeChromeButton, NodeChromeToolbar } from '#/bridge/define';
import {
    type EditorApi,
    type MarkRunValue,
    passEscape,
    sameRange,
    type StandingOverlayProps,
    useApplePlatform,
    useClientLayoutEffect,
    useEditorApi,
    useEditorOverlay,
    useEditorValue,
    useScopedFocus,
} from '#/bridge/plugin';
import { checkHref, type CodecContext } from '#/model';

import styles from './styles/links.module.scss';

/** The commands the bubble runs. */
export const EDIT_LINK = 'link.edit';
export const REMOVE_LINK = 'link.remove';

/** The link bubble's strings, in the UI locale. */
export interface LinkBubbleStrings {
    readonly label: string;
    readonly open: string;
    readonly edit: string;
    readonly copy: string;
    readonly remove: string;
    readonly copied: string;
}

/** The link bubble's strings, in the UI locale. */
export const linkBubbleStrings = (t: CodecContext['t']): LinkBubbleStrings => ({
    label: t('RichTextEditor_link'),
    open: t('RichTextEditor_linkOpenInNewTab'),
    edit: t('RichTextEditor_linkEdit'),
    copy: t('RichTextEditor_linkCopy'),
    remove: t('RichTextEditor_linkRemove'),
    copied: t('RichTextEditor_linkCopied'),
});

/** The link at a caret in an editable surface, at either edge of it or inside it; none for a range or a read-only surface. */
const caretLink = (api: EditorApi | undefined): MarkRunValue | undefined => {
    if (api === undefined || !api.editable() || !api.selection().collapsed) {
        return undefined;
    }
    return api.marks.run('link', { extendToMarkRange: 'touching' });
};

const sameLink = (a: MarkRunValue | undefined, b: MarkRunValue | undefined) =>
    a === b ||
    (a !== undefined &&
        b !== undefined &&
        sameRange(a.range, b.range) &&
        JSON.stringify(a.attrs) === JSON.stringify(b.attrs));

// Only a caret at a link is read, so typing elsewhere never renders the bubble.
const caretOf = (api: EditorApi | undefined) => {
    if (caretLink(api) === undefined) {
        return undefined;
    }
    return api?.selectedRange();
};

/** Moves focus back to the surface unless the author moved it elsewhere meanwhile, as a toolbar press does. */
const returnFocus = (api: EditorApi, within: Element | null) => {
    const { activeElement, body } = document;
    if (activeElement === body || (within !== null && within.contains(activeElement))) {
        api.focus();
    }
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
    readonly icon: ReactNode;
    /** The URL, so each control says which destination it acts on. */
    readonly describedBy: string;
    readonly onPress: (control: Element) => void;
}) => {
    const controlRef = useRef<HTMLSpanElement>(null);
    // `NodeChromeButton` takes no ref, so the focus-keeping press sits on a wrapper around it; it shows its own tooltip.
    return (
        <span ref={controlRef} role="presentation" className={styles.control} onMouseDown={keepFocus}>
            <NodeChromeButton
                label={label}
                icon={icon}
                describedBy={describedBy}
                onClick={() => {
                    if (controlRef.current !== null) {
                        onPress(controlRef.current);
                    }
                }}
            />
        </span>
    );
};

/**
 * The link bubble: a `Flyout` on the whole link while the caret is at it or inside it, with the link's URL and Open,
 * Edit, Copy and Remove. Focus stays in the surface until Alt+F10 moves it to Open; Escape closes the bubble until the
 * caret moves. It stays on the link it shows while the pointer is over it or focus is in it, until both leave. Open
 * opens the checked `href` in a new tab, Edit opens the link popover, and Remove unlinks the whole link, keeping its
 * text.
 */
export const LinkBubble = ({ toolbarRef, covered }: StandingOverlayProps) => {
    const api = useEditorApi();
    let translate: CodecContext['t'] = (key) => key;
    let testId = '';
    if (api !== undefined) {
        translate = api.t;
        testId = api.testId();
    }
    const strings = linkBubbleStrings(translate);
    const link = useEditorValue(caretLink, sameLink);
    const caret = useEditorValue(caretOf, sameRange);
    const focus = useScopedFocus();
    const urlId = useId();
    const [closed, setClosed] = useState<{ readonly at: ReturnType<typeof caretOf> }>();
    // A caret move ends the close, so moving again within or into the link shows the bubble once more.
    if (closed !== undefined && !sameRange(closed.at, caret)) {
        setClosed(undefined);
    }
    const [hovered, setHovered] = useState(false);
    // A bubble an overlay hides hears no pointer leave, so the hold ends when it hides.
    if (covered && hovered) {
        setHovered(false);
    }
    // The link last shown, which the bubble keeps while held once the caret leaves it.
    const [kept, setKept] = useState(link);
    if (link !== undefined && !sameLink(kept, link)) {
        setKept(link);
    }
    // A document change can leave the kept range pointing at nothing, which the writer then refuses to read, ending the hold.
    const targetable = useEditorValue((read) => kept === undefined || read?.content.read(kept.range) !== undefined);
    const stale = link === undefined && !targetable;
    if (stale && hovered) {
        setHovered(false);
    }
    const held = !stale && (hovered || (focus !== null && focus.closest('[data-rte-link-bubble]') !== null));
    let shown = link;
    if (shown === undefined && held) {
        shown = kept;
    }
    const caretRef = useRef(caret);
    const keptRef = useRef(kept);
    useClientLayoutEffect(() => {
        caretRef.current = caret;
        keptRef.current = kept;
    });
    const setOpen = useCallback((next: boolean) => {
        if (!next) {
            // A bubble that closes under the pointer hears no pointer leave.
            setHovered(false);
            setClosed({ at: caretRef.current });
        }
    }, []);
    // Hidden while an overlay a command opened shows, such as the link popover editing this link.
    const open = !covered && shown !== undefined && (focus !== null || held) && closed === undefined;
    const overlay = useEditorOverlay(open, setOpen);
    // The session arrives after the first render, so the anchor reads the API once it exists.
    const anchor = useMemo(() => api?.anchor(() => caretLink(api)?.range ?? keptRef.current?.range), [api]);
    const apple = useApplePlatform();
    // The toolbar inside the wrapper is in the DOM by the time React sets the wrapper's ref.
    const bubbleRef = useCallback(
        (element: HTMLDivElement | null) => toolbarRef(element?.querySelector<HTMLElement>('[role="toolbar"]') ?? null),
        [toolbarRef],
    );
    useEffect(() => {
        const surface = api?.surface();
        if (api === undefined || surface === undefined) {
            return undefined;
        }
        // A link in the surface never navigates the page while it is edited; Mod+click opens it in a new tab, and in a
        // read-only surface a plain click follows it as the reader's link does.
        const onClick = (event: MouseEvent) => {
            const element = event.target instanceof Element ? event.target.closest('a[href]') : null;
            if (element === null || !surface.contains(element) || event.button !== 0) {
                return;
            }
            const clicked = api.marks.run('link', { at: element });
            const modified = apple ? event.metaKey : event.ctrlKey;
            const editable = api.editable();
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
    }, [api, apple]);
    if (shown === undefined || api === undefined || anchor === undefined) {
        return null;
    }
    const href = typeof shown.attrs.href === 'string' ? shown.attrs.href : '';
    const back = (control: Element) => returnFocus(api, control.closest('[role="toolbar"]'));
    const { range } = shown;
    // A held bubble shows the link it kept, so its actions run there, not at the selection that left it.
    const runOnShown = (command: string) => {
        if (link !== undefined) {
            api.commands.execute(command);
            return;
        }
        const target = api.targets.capture(range);
        if (target !== undefined) {
            api.commands.execute(command, undefined, { target });
            api.targets.release(target);
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
                <div
                    ref={bubbleRef}
                    className={styles.bubble}
                    data-rte-link-bubble=""
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    <NodeChromeToolbar aria-label={strings.label}>
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
                            icon={<IconArrowOutExternal size={20} aria-hidden />}
                            describedBy={urlId}
                            onPress={(control) => {
                                openLink(control.ownerDocument.defaultView, href);
                            }}
                        />
                        <BubbleButton
                            label={strings.edit}
                            icon={<IconPen size={20} aria-hidden />}
                            describedBy={urlId}
                            onPress={() => {
                                runOnShown(EDIT_LINK);
                            }}
                        />
                        <BubbleButton
                            label={strings.copy}
                            icon={<IconClipboard size={20} aria-hidden />}
                            describedBy={urlId}
                            onPress={(control) => {
                                const clipboard = control.ownerDocument.defaultView?.navigator.clipboard;
                                clipboard
                                    ?.writeText(href)
                                    .then(() => api.announce(strings.copied))
                                    .catch(() => undefined);
                                back(control);
                            }}
                        />
                        <BubbleButton
                            label={strings.remove}
                            icon={<IconTrashBin size={20} aria-hidden />}
                            describedBy={urlId}
                            onPress={(control) => {
                                runOnShown(REMOVE_LINK);
                                back(control);
                            }}
                        />
                    </NodeChromeToolbar>
                </div>
            </Flyout.Content>
        </Flyout.Root>
    );
};
