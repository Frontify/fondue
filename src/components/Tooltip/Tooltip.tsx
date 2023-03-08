/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { IconSize } from '@foundation/Icon/IconSize';
import { useLink } from '@react-aria/link';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, {
    FocusEvent,
    HTMLAttributes,
    PropsWithChildren,
    ReactChild,
    ReactElement,
    ReactNode,
    cloneElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { BrightHeader, BrightHeaderStyle, brightHeaderArrowBackgroundColors } from './BrightHeader';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { useMemoizedId } from '@hooks/useMemoizedId';

export type TooltipButton = {
    label: string;
    action: () => void;
};

export type TooltipProps = PropsWithChildren<{
    triggerElement?: ReactElement;
    content: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton] | [TooltipButton];
    children?: ReactChild;
    position?: TooltipPosition;
    alignment?: TooltipAlignment;
    flip?: boolean;
    withArrow?: boolean;
    hoverDelay?: number;
    enterDelay?: number;
    open?: boolean;
    disabled?: boolean;
    /** @deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore */
    hidden?: boolean;
}>;

/**
 * This is a temporary workaround because for some yet unknown reasons `tailwindcss` in clarify purges the `tw-pb-3.5` and `tw-pt-3.5` class.
 */
const paddingsTop = {
    small: 'tw-pt-3.5',
    large: 'tw-pt-4',
};

const paddingsBottom = {
    small: 'tw-pb-3.5',
    large: 'tw-pb-4',
};

export enum TooltipPosition {
    Top = 'Top',
    Right = 'Right',
    Bottom = 'Bottom',
    Left = 'Left',
}

export enum TooltipAlignment {
    Start = 'Start',
    Middle = 'Middle',
    End = 'End',
}

const placementMap: Record<`${TooltipPosition}-${TooltipAlignment}`, Placement> = {
    ['Top-Start']: 'top-start',
    ['Top-End']: 'top-end',
    ['Bottom-Start']: 'bottom-start',
    ['Bottom-End']: 'bottom-end',
    ['Left-Start']: 'left-start',
    ['Left-End']: 'left-end',
    ['Right-Start']: 'right-start',
    ['Right-End']: 'right-end',
    ['Top-Middle']: 'top',
    ['Right-Middle']: 'right',
    ['Bottom-Middle']: 'bottom',
    ['Left-Middle']: 'left',
};

const getArrowClasses = (currentPlacement: string, brightHeader: BrightHeaderStyle | undefined, alignment: string) => {
    switch (true) {
        case currentPlacement.toString().includes(TooltipPosition.Top.toLowerCase()):
            return 'before:tw-border-t-0 before:tw-border-l-0 tw-bottom-[-6px] before:tw-bg-black-100 before:dark:tw-bg-white';
        case currentPlacement.toString().includes(TooltipPosition.Right.toLowerCase()):
            return merge([
                'before:tw-border-t-0 before:tw-border-r-0 tw-left-[-5px]',
                brightHeader &&
                alignment === TooltipAlignment.Start &&
                currentPlacement.toString().includes(TooltipAlignment.Start.toLowerCase())
                    ? brightHeaderArrowBackgroundColors[brightHeader]
                    : 'before:tw-bg-black-100 before:dark:tw-bg-white',
            ]);
        case currentPlacement.toString().includes(TooltipPosition.Bottom.toLowerCase()):
            return merge([
                'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]',
                brightHeader
                    ? brightHeaderArrowBackgroundColors[brightHeader]
                    : 'before:tw-bg-black-100 before:dark:tw-bg-white',
            ]);
        case currentPlacement.toString().includes(TooltipPosition.Left.toLowerCase()):
            return merge([
                'before:tw-border-b-0 before:tw-border-l-0 tw-right-[-5px]',
                brightHeader &&
                alignment === TooltipAlignment.Start &&
                currentPlacement.toString().includes(TooltipAlignment.Start.toLowerCase())
                    ? brightHeaderArrowBackgroundColors[brightHeader]
                    : 'before:tw-bg-black-100 before:dark:tw-bg-white',
            ]);
        default:
            return 'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px] before:tw-bg-black-100 before:dark:tw-bg-white';
    }
};

export const Tooltip = ({
    content,
    tooltipIcon,
    heading,
    headingIcon,
    linkUrl,
    linkLabel,
    brightHeader,
    buttons,
    children,
    position = TooltipPosition.Bottom,
    alignment = TooltipAlignment.Middle,
    withArrow,
    flip = true,
    triggerElement,
    hoverDelay = 200,
    enterDelay = 0,
    open = false,
    disabled = false,
    hidden = false,
}: TooltipProps) => {
    const [triggerElementRef, setTriggerElementRef] = useState<HTMLElement | HTMLDivElement | HTMLButtonElement | null>(
        null,
    );
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const { linkProps } = useLink({}, linkRef);
    const hasLargePaddingTop = useMemo(
        () => linkUrl || brightHeader || buttons || heading || headingIcon,
        [linkUrl, brightHeader, buttons, heading, headingIcon],
    );

    const placement = placementMap[`${position}-${alignment}`];
    const [tooltipContainerRef, setTooltipContainerRef] = useState<HTMLDivElement | null>(null);
    const [triggerElementContainerRef, setTriggerElementContainerRef] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const id = useMemoizedId();

    const tooltipOffset = withArrow ? 10 : 5;
    const popperInstance = usePopper(triggerElementRef, tooltipContainerRef, {
        placement,
        strategy: 'fixed',
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                },
            },
            {
                name: 'offset',
                options: {
                    offset: [0, tooltipOffset],
                },
            },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
    });

    const currentPlacement = popperInstance.state?.placement ?? position;
    const arrowStyling = getArrowClasses(currentPlacement, brightHeader, alignment);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleHideTooltipOnHover = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setIsOpen(false), hoverDelay);
    }, [hoverDelay]);

    const handleShowTooltipOnHover = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (enterDelay) {
            timeoutRef.current = setTimeout(() => setIsOpen(true), enterDelay);
            return;
        }

        setIsOpen(true);
    }, [enterDelay]);

    const checkIfHovered = useCallback(
        (event) => {
            const hoveredElement = event.path ?? event.composedPath?.();
            const hoverSources = [triggerElementRef, triggerElementContainerRef, tooltipContainerRef];

            if (hoveredElement && hoverSources.some((el) => hoveredElement.includes(el))) {
                handleShowTooltipOnHover();
            }
        },
        [handleShowTooltipOnHover, triggerElementRef, triggerElementContainerRef, tooltipContainerRef],
    );

    const triggerProps: HTMLAttributes<HTMLElement> = {
        onMouseOver: (event) => checkIfHovered(event.nativeEvent),
        onMouseLeave: handleHideTooltipOnHover,
        onFocus: () => setIsOpen(true),
        onBlur: (event: FocusEvent) => {
            if (!tooltipContainerRef?.contains(event.relatedTarget)) {
                setIsOpen(false);
            }
        },
    };

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    useLayoutEffect(() => {
        if (typeof popperInstance.update === 'function' && isOpen) {
            popperInstance.update();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <>
            <div {...triggerProps} ref={setTriggerElementContainerRef}>
                {triggerElement &&
                    cloneElement(triggerElement, {
                        ref: setTriggerElementRef,
                        'aria-describedby': id,
                        'aria-disabled': disabled ? true : false,
                    })}
            </div>
            <div
                ref={setTooltipContainerRef}
                aria-hidden={disabled ? true : false}
                className={merge([
                    'tw-popper-container tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-[120000]',
                    (hidden || disabled) && 'tw-hidden',
                    !isOpen && 'tw-opacity-0 tw-h-0 tw-w-0 tw-overflow-hidden',
                ])}
                data-test-id="tooltip"
                role="tooltip"
                id={id}
                style={popperInstance.styles.popper}
                {...popperInstance.attributes.popper}
                onFocus={() => setIsOpen(true)}
                onMouseOver={(event) => checkIfHovered(event.nativeEvent)}
                onMouseLeave={handleHideTooltipOnHover}
            >
                {brightHeader && <BrightHeader headerStyle={brightHeader} />}
                <div
                    className={merge([
                        'tw-px-4 tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-relative tw-z-[120000]',
                        hasLargePaddingTop ? paddingsTop.small : paddingsTop.large,
                        linkUrl ? paddingsBottom.small : paddingsBottom.large,
                    ])}
                >
                    {heading && (
                        <h4 className="tw-flex tw-text-m tw-font-bold tw-mb-1">
                            {headingIcon && (
                                <span className="tw-mr-1.5">
                                    {cloneElement(headingIcon, { size: IconSize.Size20 })}
                                </span>
                            )}
                            {heading}
                        </h4>
                    )}
                    <div className="tw-flex">
                        {tooltipIcon && (
                            <span
                                aria-label="Tooltip trigger icon"
                                role="button"
                                className="tw-shrink-0 tw-mr-1 tw-leading-4"
                            >
                                {cloneElement(tooltipIcon, { size: IconSize.Size16 })}
                            </span>
                        )}
                        <span className="tw-text-s tw-min-w-0 tw-break-words">{content}</span>
                    </div>
                    {linkUrl && (
                        <a
                            {...linkProps}
                            data-test-id="tooltip-link"
                            ref={linkRef}
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={merge([
                                'tw-text-xs tw-text-black-40 dark:tw-text-black-80 tw-underline tw-mt-1',
                                FOCUS_VISIBLE_STYLE,
                            ])}
                            onBlur={() => (buttons && buttons.length > 0 ? null : setIsOpen(false))}
                        >
                            {linkLabel ?? 'Click here to learn more.'}
                        </a>
                    )}
                    {buttons && (
                        <div className="tw-flex tw-flex-row-reverse tw-gap-x-1 tw-mt-4">
                            {buttons.length > 0 && (
                                <div onBlur={() => (buttons && buttons.length < 2 ? setIsOpen(false) : null)}>
                                    <Button
                                        style={ButtonStyle.Default}
                                        emphasis={ButtonEmphasis.Strong}
                                        size={ButtonSize.Small}
                                        onClick={buttons[0].action}
                                    >
                                        {buttons[0].label}
                                    </Button>
                                </div>
                            )}
                            {buttons.length === 2 && (
                                <div onBlur={() => setIsOpen(false)}>
                                    <Button
                                        style={ButtonStyle.Default}
                                        emphasis={ButtonEmphasis.Default}
                                        size={ButtonSize.Small}
                                        onClick={buttons[1].action}
                                    >
                                        {buttons[1].label}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/**
                 * This container is needed for the arrow element to not be styled by popperJS
                 * selectors for its immediate children .tw-popper-container > .tw-popper-arrow
                 * */}
                <div aria-hidden="true">
                    <div
                        data-test-id="popover-arrow"
                        data-popper-arrow={withArrow}
                        ref={setArrowElement}
                        style={popperInstance.styles.arrow}
                        className={merge([
                            withArrow &&
                                'tw-popper-arrow tw-z-[110000] tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45 before:tw-border before:tw-border-line',
                            withArrow && arrowStyling,
                        ])}
                    />
                </div>
                {children}
            </div>
        </>
    );
};
Tooltip.displayName = 'FondueTooltip';
