/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Flyout, Tooltip } from '@frontify/fondue-components';
import { IconDotsHorizontal } from '@frontify/fondue-icons';
import { type ComponentProps, type MouseEvent, type MutableRefObject, type ReactNode, useRef, useState } from 'react';

import { MORE_ATTRIBUTE } from '../hooks/useToolbarFit';
import { useToolbarRoving } from '../hooks/useToolbarRoving';
import { type RichTextEditorLabels } from '../labels';
import styles from '../richTextEditor.module.scss';

/**
 * The More button at the end of the top row and the panel it opens, a toolbar
 * of its own holding the controls the row has no room for.
 *
 * Opened from the keyboard, the panel takes focus; opened with a click, focus
 * stays in the text, as with every toolbar button. Escape in the panel closes
 * it and puts focus back on More.
 */
export const ToolbarMore = ({
    labels,
    children,
}: {
    labels: RichTextEditorLabels;
    /** The groups the row has no room for. */
    children: ReactNode;
}): ReactNode => {
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const moreRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const focusRequestRef = useRef(false);

    // Fondue's Button spreads undeclared props onto the <button>, so these still reach the DOM.
    const buttonProps = {
        [MORE_ATTRIBUTE]: '',
        // Keep the selection in the editor; runs before the flyout trigger's own handler.
        onMouseDown: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
        // Runs before the trigger toggles the panel; a keyboard's click has no pointer detail.
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
            focusRequestRef.current = event.detail === 0;
        },
    } as ComponentProps<typeof Button>;

    const closeToMore = (): void => {
        setOpen(false);
        moreRef.current?.focus();
    };

    return (
        <Flyout.Root open={open} onOpenChange={setOpen}>
            {/* The panel is the layer Escape belongs to while open; a tooltip over it would take the key first. */}
            <Tooltip.Root open={tooltipOpen && !open} onOpenChange={setTooltipOpen}>
                <Tooltip.Trigger asChild>
                    <Flyout.Trigger>
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
                    </Flyout.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content padding="compact">{labels.more}</Tooltip.Content>
            </Tooltip.Root>
            <Flyout.Content
                ref={contentRef}
                // The panel is a dialog to assistive technology, which needs a name of its own.
                aria-label={labels.more}
                side="bottom"
                align="end"
                padding="tight"
                // Focus is placed by the panel on open and by Escape on close.
                onOpenAutoFocus={(event) => event.preventDefault()}
                onCloseAutoFocus={(event) => event.preventDefault()}
                // Inside the panel, its toolbar decides: a control's open menu keeps Escape.
                onEscapeKeyDown={(event) => {
                    if (contentRef.current?.contains(event.target as Node)) {
                        event.preventDefault();
                    }
                }}
            >
                <MorePanel label={labels.more} focusRequestRef={focusRequestRef} onEscape={closeToMore}>
                    {children}
                </MorePanel>
            </Flyout.Content>
        </Flyout.Root>
    );
};

/** Mounted with the panel's content, which a portal draws a render later, so its stops exist when the hook looks. */
const MorePanel = ({
    label,
    focusRequestRef,
    onEscape,
    children,
}: {
    label: string;
    focusRequestRef: MutableRefObject<boolean>;
    onEscape: () => void;
    children: ReactNode;
}): ReactNode => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const roving = useToolbarRoving({ toolbarRef: panelRef, focusRequestRef, onEscape });

    return (
        <div
            ref={panelRef}
            role="toolbar"
            // Focusable in code only: the keyboard moves between the controls inside.
            tabIndex={-1}
            aria-label={label}
            aria-orientation="horizontal"
            onMouseDown={roving.onMouseDown}
            onKeyDown={roving.onKeyDown}
            onFocus={roving.onFocus}
            className={styles.panel}
        >
            {children}
        </div>
    );
};
