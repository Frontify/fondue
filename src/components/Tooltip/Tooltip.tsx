/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Popper, PopperPlacement } from '@components/Popper';
import { merge } from '@utilities/merge';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Z_INDEX_TOOLTIP } from '@utilities/dialogs/constants';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { ARROW_DARK_THEME, OVERLAY_CONTAINER_DARK_THEME_STYLING } from '@utilities/overlayStyle';

export type TooltipProps = {
    id?: string;
    children?: ReactElement;
    openOnMount?: boolean;
    placement?: PopperPlacement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
    content: string;
    withArrow?: boolean;
    size?: 'spacious' | 'compact';
    maxWidth?: string | number;
    maxHeight?: string | number;
    enterDelay?: number;
    leaveDelay?: number;
    'data-test-id'?: string;
    zIndex?: number;
    disabled?: boolean;
    'aria-label'?: string;
};

const formatTooltipText = (text: string) => {
    const lineBreakRegex = /<br\s*\/?>/;
    return text.split(lineBreakRegex).join('\n');
};

export const Tooltip = ({
    id: customId,
    children,
    offset = [0, 8],
    flip = true,
    content,
    placement = 'bottom',
    withArrow = true,
    size = 'spacious',
    openOnMount = false,
    maxWidth = 200,
    maxHeight = 'auto',
    enablePortal = true,
    enterDelay = 0,
    leaveDelay = 200,
    disabled = false,
    zIndex = Z_INDEX_TOOLTIP,
    'data-test-id': dataTestId = 'fondue-tooltip',
    'aria-label': ariaLabel = 'fondue-tooltip-trigger',
}: TooltipProps) => {
    const id = useMemoizedId(customId);
    const [open, setOpen] = useToggleOverlay(openOnMount);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleHideTooltip = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setOpen(false), leaveDelay);
    }, [leaveDelay, setOpen]);

    const handleShowTooltip = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (enterDelay) {
            timeoutRef.current = setTimeout(() => setOpen(true), enterDelay);
            return;
        }

        setOpen(true);
    }, [enterDelay, setOpen]);

    useEffect(() => {
        if (timeoutRef.current && !open) {
            clearTimeout(timeoutRef.current);
        }
    }, [open]);

    return (
        <>
            <button
                ref={triggerRef}
                onMouseEnter={handleShowTooltip}
                onFocus={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onBlur={handleHideTooltip}
                aria-label={ariaLabel}
                aria-disabled={disabled}
                aria-describedby={id}
                disabled={disabled}
                className="disabled:tw-text-text-disabled"
                data-test-id={`${dataTestId}-button`}
            >
                {children}
            </button>
            <Popper
                open={open}
                anchor={triggerRef}
                placement={placement}
                offset={offset}
                flip={flip}
                withArrow={withArrow}
                arrowCustomColors={ARROW_DARK_THEME}
                enablePortal={enablePortal}
                zIndex={Z_INDEX_TOOLTIP}
            >
                <div
                    data-test-id={dataTestId}
                    role="tooltip"
                    id={id}
                    aria-hidden={!open}
                    className={merge([
                        OVERLAY_CONTAINER_DARK_THEME_STYLING,
                        'tw-popper-container tw-inline-block tw-text-heading-medium',
                        size === 'spacious' ? 'tw-pt-2 tw-px-3 tw-pb-2.5' : 'tw-pt-1 tw-px-2 tw-pb-1.5',
                    ])}
                    style={{ maxWidth, maxHeight, zIndex }}
                >
                    <p className="tw-whitespace-pre-line">{formatTooltipText(content)}</p>
                </div>
            </Popper>
        </>
    );
};
Tooltip.displayName = 'FondueTooltip';
