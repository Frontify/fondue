/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, Tooltip } from '@frontify/fondue-components';
import { IconArrowOutExternal, IconClipboard, IconPen, IconTrashBin } from '@frontify/fondue-icons';
import { type ReactNode } from 'react';

import { ChromeToolbarButton, NodeChromeToolbar } from '#/bridge/define';
import { passEscape, type StandingOverlayProps } from '#/bridge/plugin';

import { EDIT_LINK, openLink, REMOVE_LINK } from './linkBubbleModel';
import styles from './styles/links.module.scss';
import { useLinkBubbleState } from './useLinkBubbleState';

export { EDIT_LINK, type LinkBubbleStrings, linkBubbleStrings, openLink, REMOVE_LINK } from './linkBubbleModel';

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
}) => <ChromeToolbarButton label={label} icon={icon} describedBy={describedBy} onPress={onPress} />;

/**
 * The link bubble: a `Flyout` on the whole link while the caret is at it or inside it, with the link's URL and Open,
 * Edit, Copy and Remove. Focus stays in the surface until Alt+F10 moves it to Open; Escape closes the bubble until the
 * caret moves. It stays on the link it shows while the pointer is over it or focus is in it, until both leave. Open
 * opens the checked `href` in a new tab, Edit opens the link popover, and Remove unlinks the whole link, keeping its
 * text.
 */
export const LinkBubble = (props: StandingOverlayProps) => {
    const state = useLinkBubbleState(props);
    if (state === undefined) {
        return null;
    }
    const { api, strings, testId, open, overlay, anchor, bubbleRef, urlId, href, setHovered, back, runOnShown } = state;
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
