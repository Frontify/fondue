/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaAttributes, ReactElement, useState } from 'react';
import { PopperPlacement } from '@components/Popper';
import { usePopper } from 'react-popper';
import { merge } from '@utilities/merge';
import { useToggleOverlay } from '@hooks/useToggleOverlay';
import { Z_INDEX_TOOLTIP } from '@utilities/dialogs/constants';

// TODO still pending... Add mighty tokens, add enterDelay and leaveDelay, add enablePortal logic. Trigger should be a button (What about Dialog Triggers with Tooltip)

export type TooltipSize = 'spacious' | 'compact';
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
    size?: TooltipSize;
    maxWidth?: string | number;
    maxHeight?: string | number;
    enterDelay?: number;
    leaveDelay?: number;
    'data-test-id'?: string;
    zIndex?: number;
    disabled?: boolean;
} & AriaAttributes;

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
    id,
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
    enterDelay = 0,
    leaveDelay = 200,
    disabled = false,
    zIndex = Z_INDEX_TOOLTIP,
    'data-test-id': dataTestId = 'fondue-tooltip',
}: TooltipProps) => {
    const [open, setOpen] = useToggleOverlay(openOnMount);
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            { name: 'offset', options: { offset } },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
    });
    const currentPlacement = state?.placement ?? placement;
    const arrowStyling = getArrowClasses(currentPlacement);

    return (
        <>
            <button
                ref={setReferenceElement}
                onMouseEnter={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onBlur={() => setOpen(false)}
                aria-labelledby={id}
                disabled={disabled}
            >
                {children}
            </button>
            {open && (
                <div
                    data-test-id={dataTestId}
                    role="tooltip"
                    id={id}
                    aria-hidden={!open}
                    ref={setPopperElement}
                    className={merge([
                        'tw-popper-container tw-dark tw-inline-block tw-bg-box-neutral tw-rounded-md tw-shadow-mid tw-text-box-neutral-inverse tw-border tw-border-line-strong',
                        size === 'spacious' ? 'tw-pt-2 tw-px-3 tw-pb-2.5' : 'tw-pt-1 tw-px-2 tw-pb-1.5',
                    ])}
                    style={{ ...styles.popper, maxWidth, maxHeight, zIndex }}
                    {...attributes.popper}
                >
                    <p className="tw-whitespace-pre-line">{formatTooltipText(content)}</p>
                    <div
                        data-test-id="popover-arrow"
                        data-popper-arrow={withArrow}
                        aria-hidden="true"
                        ref={setArrowElement}
                        style={styles.arrow}
                        className={merge([
                            withArrow &&
                                'tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45 before:tw-dark before:tw-border before:tw-border-line-strong before:tw-bg-box-neutral',
                            withArrow && arrowStyling,
                        ])}
                    />
                </div>
            )}
        </>
    );
};
Tooltip.displayName = 'FondueTooltip';
