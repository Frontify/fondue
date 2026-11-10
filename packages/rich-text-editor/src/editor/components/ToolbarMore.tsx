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
    forwardRef,
    type KeyboardEvent,
    type MouseEvent,
    type MutableRefObject,
    type ReactNode,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import { MORE_ATTRIBUTE } from '../hooks/useToolbarFit';
import { useToolbarRoving } from '../hooks/useToolbarRoving';
import { type RichTextEditorLabels } from '../labels';
import styles from '../richTextEditor.module.scss';

type ToolbarMoreProps = {
    labels: RichTextEditorLabels;
    /** Called with the element the controls live in as More mounts and unmounts, for the row to measure the slots in it. */
    onPanel: (panel: HTMLElement | null) => void;
    /** The groups the row has no room for. */
    children: ReactNode;
};

/**
 * The More button at the end of the top row and the panel it opens, a toolbar
 * of its own holding the controls the row has no room for.
 *
 * The controls stay mounted while the panel is closed, in an element parked
 * out of sight just below More and moved into the panel as it opens, so they
 * keep working: a plugin's hotkey can still open the flyout of a control
 * behind More, which hangs from where that control is parked, with no panel.
 * A closed panel is no layer, so Escape reaches the flyout, or whatever
 * dialog holds the editor.
 *
 * Opened from the keyboard, the panel takes focus; opened with a click, focus
 * stays in the text, as with every toolbar button. Escape and Tab in the panel
 * close it and put focus back on More, Tab carrying on from there.
 */
export const ToolbarMore = ({ labels, onPanel, children }: ToolbarMoreProps): ReactNode => {
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    // Made once and moved between the parking element and the open panel, which keeps the controls' state.
    const [host] = useState(() => window.document.createElement('div'));
    const [content, setContent] = useState<HTMLDivElement | null>(null);
    const parkedRef = useRef<HTMLDivElement | null>(null);
    const moreRef = useRef<HTMLButtonElement | null>(null);
    // Set by the click, passed on once the controls are in the panel, where a stop can take the focus.
    const wantsFocusRef = useRef(false);
    const focusRequestRef = useRef(false);

    const parkHost = useCallback(
        (element: HTMLDivElement | null) => {
            parkedRef.current = element;
            element?.append(host);
        },
        [host],
    );

    const contentRef = useCallback(
        (element: HTMLDivElement | null) => {
            if (element === null) {
                parkedRef.current?.append(host);
                setContent(null);
                return;
            }
            element.append(host);
            focusRequestRef.current = wantsFocusRef.current;
            wantsFocusRef.current = false;
            // Draws the panel's toolbar again, now its controls are in view, to find its stops and take the focus.
            setContent(element);
        },
        [host],
    );

    useLayoutEffect(() => {
        onPanel(host);
        return () => onPanel(null);
    }, [host, onPanel]);

    const buttonProps = {
        // Keep the selection in the editor; runs before the trigger's own handler.
        onMouseDown: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
        // Runs before the trigger toggles the panel; a keyboard's click has no pointer detail.
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
            wantsFocusRef.current = event.detail === 0;
        },
    };

    const onOpenChange = (next: boolean): void => {
        // Closing hides the panel and any focus in it; More is where the panel was opened from.
        const { activeElement, body } = window.document;
        if (!next && (activeElement === null || activeElement === body || content?.contains(activeElement) === true)) {
            moreRef.current?.focus();
        }
        // Nor does a tooltip come back as the panel closes, over a pointer that rested on More, to take the next Escape.
        if (next) {
            setTooltipOpen(false);
        }
        setOpen(next);
    };

    const closeToMore = (): void => {
        moreRef.current?.focus();
        setOpen(false);
    };

    return (
        <>
            <PopoverRoot open={open} onOpenChange={onOpenChange}>
                {/* The panel is the layer Escape belongs to while open; a tooltip over it would take the key first. */}
                <Tooltip.Root
                    open={tooltipOpen}
                    onOpenChange={(next) => {
                        if (!open) {
                            setTooltipOpen(next);
                        }
                    }}
                >
                    <span className={styles.moreAnchor}>
                        <Tooltip.Trigger asChild>
                            <PopoverTrigger asChild>
                                <MoreButton {...buttonProps} ref={moreRef} label={labels.more} />
                            </PopoverTrigger>
                        </Tooltip.Trigger>
                        {/* Out of sight and of the accessibility tree, yet laid out, so the row can measure the slots in it and a flyout can hang from them. */}
                        <div ref={parkHost} aria-hidden="true" className={styles.morePanelParked} />
                    </span>
                    <Tooltip.Content padding="compact">{labels.more}</Tooltip.Content>
                </Tooltip.Root>
                {/* Only while open: a closed panel would be a layer, taking Escape from a dialog holding the editor. */}
                {open ? (
                    <PopoverPortal>
                        <ThemeProvider>
                            <PopoverContent
                                ref={contentRef}
                                // The panel is a dialog to assistive technology, which needs a name of its own.
                                aria-label={labels.more}
                                side="bottom"
                                align="end"
                                sideOffset={8}
                                collisionPadding={8}
                                className={styles.morePanel}
                                // Focus is placed by the panel on open and by its closing.
                                onOpenAutoFocus={(event) => event.preventDefault()}
                                onCloseAutoFocus={(event) => event.preventDefault()}
                                // A flyout or menu a control in the panel has open portals out of it, so any press is the panel's own while one is open.
                                onInteractOutside={(event) => {
                                    if (host.querySelector('[aria-expanded="true"]') !== null) {
                                        event.preventDefault();
                                    }
                                }}
                                onEscapeKeyDown={(event) => {
                                    const { target } = event;
                                    if (target instanceof HTMLElement) {
                                        // A control's open menu, or the text's open suggestion list, keeps Escape; More's own state is this panel's.
                                        if (
                                            target !== moreRef.current &&
                                            target.getAttribute('aria-expanded') === 'true'
                                        ) {
                                            event.preventDefault();
                                            return;
                                        }
                                        // Inside the panel the close is the layer's own, and onOpenChange puts focus on More.
                                        if (content?.contains(target) === true) {
                                            return;
                                        }
                                    }
                                    // From the text or More, Escape only closes the panel; the editor must not leave the text too.
                                    event.stopPropagation();
                                }}
                            />
                        </ThemeProvider>
                    </PopoverPortal>
                ) : null}
            </PopoverRoot>
            {createPortal(
                <ThemeProvider>
                    <MorePanel label={labels.more} focusRequestRef={focusRequestRef} onLeave={closeToMore}>
                        {children}
                    </MorePanel>
                </ThemeProvider>,
                host,
            )}
        </>
    );
};

type ToolbarMoreProbeProps = { labels: RichTextEditorLabels };

/**
 * More's button alone, for the row to read its width before anything
 * overflows: the panel, its tooltip and its theme are not needed for that, and
 * a row that fits never mounts them.
 */
export const ToolbarMoreProbe = ({ labels }: ToolbarMoreProbeProps): ReactNode => (
    <span className={styles.moreAnchor}>
        <MoreButton label={labels.more} />
    </span>
);

type MoreButtonProps = { label: string } & Omit<ComponentProps<typeof Button>, 'children' | 'aria-label'>;

/** The More button as drawn; a trigger's injected props reach the <button> through Fondue's Button. */
const MoreButton = forwardRef<HTMLButtonElement, MoreButtonProps>(function MoreButton({ label, ...rest }, ref) {
    // Fondue's Button spreads undeclared props onto the <button>, so the marker still reaches the DOM.
    const marker = { [MORE_ATTRIBUTE]: '' } as ComponentProps<typeof Button>;
    return (
        <Button
            {...marker}
            {...rest}
            ref={ref}
            type="button"
            size="small"
            aspect="square"
            emphasis="weak"
            className={styles.more}
            aria-label={label}
        >
            <IconDotsHorizontal size={20} />
        </Button>
    );
});

type MorePanelProps = {
    label: string;
    focusRequestRef: MutableRefObject<boolean>;
    /** Escape or Tab in the panel: close it, focus on More. */
    onLeave: () => void;
    children: ReactNode;
};

/** The panel's toolbar, with the roving focus the row has. */
const MorePanel = ({ label, focusRequestRef, onLeave, children }: MorePanelProps): ReactNode => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const roving = useToolbarRoving({
        toolbarRef: panelRef,
        focusRequestRef,
        onEscape: onLeave,
    });

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        // Not prevented: the browser's Tab carries on from More.
        if (event.key === 'Tab' && event.target instanceof Node && event.currentTarget.contains(event.target)) {
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
