/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { PopperPlacement } from '@components/Popper';
import { usePopper } from 'react-popper';
import { merge } from '@utilities/merge';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Z_INDEX_TOOLTIP } from '@utilities/dialogs/constants';
import { EnablePortalWrapper } from '@utilities/dialogs/EnablePortalWrapper';
import { useMemoizedId } from '@hooks/useMemoizedId';

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

const getArrowClasses = (currentPlacement: string) => {
    switch (true) {
        case currentPlacement.includes('top'):
            return 'before:tw-border-t-0 before:tw-border-l-0 tw-bottom-[-6px]';
        case currentPlacement.includes('right'):
            return 'before:tw-border-t-0 before:tw-border-r-0 tw-left-[-6px]';
        case currentPlacement.includes('bottom'):
            return 'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]';
        case currentPlacement.includes('left'):
            return 'before:tw-border-b-0 before:tw-border-l-0 tw-right-[-6px]';
        default:
            return 'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]';
    }
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
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            { name: 'offset', options: { offset } },
            { name: 'flip', enabled: flip },
        ],
    });

    const currentPlacement = state?.placement ?? placement;
    const arrowStyling = getArrowClasses(currentPlacement);
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
                ref={setReferenceElement}
                onMouseEnter={handleShowTooltip}
                onFocus={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onBlur={handleHideTooltip}
                aria-label={ariaLabel}
                aria-disabled={disabled}
                aria-labelledby={id}
                disabled={disabled}
                className="disabled:tw-text-text-disabled"
                data-test-id={`${dataTestId}-button`}
            >
                {children}
            </button>
            {open && (
                <EnablePortalWrapper enablePortal={enablePortal}>
                    <div
                        data-test-id={dataTestId}
                        role="tooltip"
                        id={id}
                        aria-hidden={!open}
                        ref={setPopperElement}
                        className={merge([
                            'tw-popper-container tw-inline-block tw-bg-box-neutral-mighty tw-rounded-md tw-shadow tw-text-heading-medium tw-text-box-neutral-mighty-inverse tw-border tw-border-line-mighty',
                            size === 'spacious' ? 'tw-pt-2 tw-px-3 tw-pb-2.5' : 'tw-pt-1 tw-px-2 tw-pb-1.5',
                        ])}
                        style={{ ...styles.popper, maxWidth, maxHeight, zIndex }}
                        {...attributes.popper}
                    >
                        <p className="tw-whitespace-pre-line">{formatTooltipText(content)}</p>
                        {withArrow && (
                            <div
                                data-test-id={`${dataTestId}-arrow`}
                                data-popper-arrow={withArrow}
                                aria-hidden="true"
                                ref={setArrowElement}
                                style={styles.arrow}
                                className={merge([
                                    'tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45 before:tw-border before:tw-border-line-mighty before:tw-bg-box-neutral-mighty',
                                    arrowStyling,
                                ])}
                            />
                        )}
                    </div>
                </EnablePortalWrapper>
            )}
        </>
    );
};
Tooltip.displayName = 'FondueTooltip';
