/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ThemeProvider, Tooltip } from '@frontify/fondue-components';
import { IconDotsHorizontal } from '@frontify/fondue-icons';
import {
    Content as PopoverContent,
    Portal as PopoverPortal,
    Root as PopoverRoot,
    Trigger as PopoverTrigger,
} from '@radix-ui/react-popover';
import {
    type ComponentProps,
    type KeyboardEvent,
    type MouseEvent,
    type MutableRefObject,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { MORE_ATTRIBUTE } from '../hooks/useToolbarFit';
import { useToolbarRoving } from '../hooks/useToolbarRoving';
import { type RichTextEditorLabels } from '../labels';
import styles from '../richTextEditor.module.scss';

/**
 * The More button at the end of the top row and the panel it opens, a toolbar
 * of its own holding the controls the row has no room for.
 *
 * The panel stays mounted while closed, hidden, so the controls in it keep
 * working: a plugin's hotkey can still open the flyout of a control behind
 * More, which opens the panel too, for that flyout to hang from.
 *
 * Opened from the keyboard, the panel takes focus; opened with a click, focus
 * stays in the text, as with every toolbar button. Escape and Tab in the panel
 * close it and put focus back on More, Tab carrying on from there.
 */
export const ToolbarMore = ({
    labels,
    onPanel,
    children,
}: {
    labels: RichTextEditorLabels;
    /** Called with the panel's element as it mounts and unmounts, for the row to measure the slots in it. */
    onPanel: (panel: HTMLElement | null) => void;
    /** The groups the row has no room for. */
    children: ReactNode;
}): ReactNode => {
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const moreRef = useRef<HTMLButtonElement | null>(null);
    const focusRequestRef = useRef(false);

    const contentRef = useCallback(
        (element: HTMLDivElement | null) => {
            setContent(element);
            onPanel(element);
        },
        [onPanel],
    );

    // A control behind More that opens its own flyout (Mod+K's link form) needs the panel shown to anchor it.
    useEffect(() => {
        if (content === null) {
            return undefined;
        }
        const observer = new MutationObserver((mutations) => {
            if (mutations.some((mutation) => (mutation.target as Element).getAttribute('aria-expanded') === 'true')) {
                setOpen(true);
            }
        });
        observer.observe(content, { subtree: true, attributes: true, attributeFilter: ['aria-expanded'] });
        return () => observer.disconnect();
    }, [content]);

    // Fondue's Button spreads undeclared props onto the <button>, so these still reach the DOM.
    const buttonProps = {
        [MORE_ATTRIBUTE]: '',
        // Keep the selection in the editor; runs before the trigger's own handler.
        onMouseDown: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
        // Runs before the trigger toggles the panel; a keyboard's click has no pointer detail.
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
            focusRequestRef.current = event.detail === 0;
        },
    } as ComponentProps<typeof Button>;

    const onOpenChange = (next: boolean): void => {
        // The closed panel is still a layer, which reports every outside click and Escape as a close.
        if (next === open) {
            return;
        }
        // Closing hides the panel and any focus in it; More is where the panel was opened from.
        const { activeElement, body } = window.document;
        if (!next && (activeElement === null || activeElement === body || content?.contains(activeElement) === true)) {
            moreRef.current?.focus();
        }
        setOpen(next);
    };

    const closeToMore = (): void => {
        moreRef.current?.focus();
        setOpen(false);
    };

    return (
        <PopoverRoot open={open} onOpenChange={onOpenChange}>
            {/* The panel is the layer Escape belongs to while open; a tooltip over it would take the key first. */}
            <Tooltip.Root open={tooltipOpen && !open} onOpenChange={setTooltipOpen}>
                <Tooltip.Trigger asChild>
                    <PopoverTrigger asChild>
                        <Button
                            {...buttonProps}
                            ref={moreRef}
                            type="button"
                            size="small"
                            aspect="square"
                            emphasis="weak"
                            className={styles.more}
                            aria-label={labels.more}
                        >
                            <IconDotsHorizontal size={20} />
                        </Button>
                    </PopoverTrigger>
                </Tooltip.Trigger>
                <Tooltip.Content padding="compact">{labels.more}</Tooltip.Content>
            </Tooltip.Root>
            {/* Mounted while closed too, so the controls in it keep their state and hotkeys. */}
            <PopoverPortal forceMount>
                <ThemeProvider>
                    <PopoverContent
                        ref={contentRef}
                        // The panel is a dialog to assistive technology, which needs a name of its own.
                        aria-label={labels.more}
                        aria-hidden={!open}
                        side="bottom"
                        align="end"
                        sideOffset={8}
                        collisionPadding={8}
                        className={styles.morePanel}
                        // Focus is placed by the panel on open and by its closing.
                        onOpenAutoFocus={(event) => event.preventDefault()}
                        onCloseAutoFocus={(event) => event.preventDefault()}
                        onEscapeKeyDown={(event) => {
                            if (!open) {
                                return;
                            }
                            // Inside the panel, its toolbar decides: a control's open menu keeps Escape.
                            if (content?.contains(event.target as Node) === true) {
                                event.preventDefault();
                                return;
                            }
                            // From the text or More, Escape only closes the panel; the editor must not leave the text too.
                            event.stopPropagation();
                        }}
                    >
                        <MorePanel label={labels.more} focusRequestRef={focusRequestRef} onLeave={closeToMore}>
                            {children}
                        </MorePanel>
                    </PopoverContent>
                </ThemeProvider>
            </PopoverPortal>
        </PopoverRoot>
    );
};

/** The panel's toolbar, with the roving focus the row has. */
const MorePanel = ({
    label,
    focusRequestRef,
    onLeave,
    children,
}: {
    label: string;
    focusRequestRef: MutableRefObject<boolean>;
    /** Escape or Tab in the panel: close it, focus on More. */
    onLeave: () => void;
    children: ReactNode;
}): ReactNode => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const roving = useToolbarRoving({ toolbarRef: panelRef, focusRequestRef, onEscape: onLeave });

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        // Not prevented: the browser's Tab carries on from More.
        if (event.key === 'Tab' && event.currentTarget.contains(event.target as Node)) {
            onLeave();
            return;
        }
        roving.onKeyDown(event);
    };

    return (
        <div
            ref={panelRef}
            role="toolbar"
            // Focusable in code only: the keyboard moves between the controls inside.
            tabIndex={-1}
            aria-label={label}
            aria-orientation="horizontal"
            onMouseDown={roving.onMouseDown}
            onKeyDown={onKeyDown}
            onFocus={roving.onFocus}
            className={styles.panel}
        >
            {children}
        </div>
    );
};
