/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { PopperPlacement } from '@components/Popper';
import { merge } from '@utilities/merge';
import { Z_INDEX_TOOLTIP } from '@utilities/dialogs/constants';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { ARROW_DARK_THEME } from '@utilities/overlayStyle';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Modality } from '../../types';

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
    const [open, setOpen] = useState(openOnMount);
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
            <Overlay
                open={open}
                theme="dark"
                withArrow={withArrow}
                arrowCustomColors={ARROW_DARK_THEME}
                anchor={triggerRef}
                placement={placement}
                offset={offset}
                flip={flip}
                enablePortal={enablePortal}
                role="tooltip"
                data-test-id={dataTestId}
                modality={Modality.NonModal}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                zIndex={zIndex}
                handleClose={() => setOpen(false)}
                shadow="none"
                isDialog={false}
            >
                <p
                    className={merge([
                        size === 'spacious' ? 'tw-pt-2 tw-px-3 tw-pb-2.5' : 'tw-pt-1 tw-px-2 tw-pb-1.5',
                        'tw-text-heading-medium tw-whitespace-pre-line',
                    ])}
                >
                    {formatTooltipText(content)}
                </p>
            </Overlay>
        </>
    );
};
Tooltip.displayName = 'FondueTooltip';
