/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Placement } from '@popperjs/core';
import { useLink } from '@react-aria/link';
import {
    type FocusEvent,
    type HTMLAttributes,
    type ReactElement,
    type ReactNode,
    cloneElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { usePopper } from 'react-popper';

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { Portal } from '@components/Portal';
import { IconSize } from '@foundation/Icon/IconSize';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { BrightHeader, type BrightHeaderStyle, brightHeaderArrowBackgroundColors } from './BrightHeader';

export type TooltipButton = {
    label: string;
    action: () => void;
};

export type LegacyTooltipProps = {
    triggerElement?: ReactElement;
    content: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton] | [TooltipButton];
    children?: ReactNode;
    position?: TooltipPosition;
    alignment?: TooltipAlignment;
    flip?: boolean;
    withArrow?: boolean;
    withStrongBorder?: boolean;
    hoverDelay?: number;
    enterDelay?: number;
    open?: boolean;
    disabled?: boolean;
    /** @deprecated use disabled since the tooltip is always present in the DOM now so hidden has no effect anymore */
    hidden?: boolean;
    enablePortal?: boolean;
    'data-test-id'?: string;
};

const paddingsTop = {
    small: 'tw-pt-2',
    large: 'tw-pt-3',
};

const paddingsBottom = {
    small: 'tw-pb-2',
    large: 'tw-pb-3',
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
    'Top-Start': 'top-start',
    'Top-End': 'top-end',
    'Bottom-Start': 'bottom-start',
    'Bottom-End': 'bottom-end',
    'Left-Start': 'left-start',
    'Left-End': 'left-end',
    'Right-Start': 'right-start',
    'Right-End': 'right-end',
    'Top-Middle': 'top',
    'Right-Middle': 'right',
    'Bottom-Middle': 'bottom',
    'Left-Middle': 'left',
};

const getArrowClasses = (currentPlacement: string, brightHeader: BrightHeaderStyle | undefined, alignment: string) => {
    switch (true) {
        case currentPlacement.toString().includes(TooltipPosition.Top.toLowerCase()):
            return 'before:tw-border-t-0 before:tw-border-l-0 tw-bottom-[-6px] before:tw-dark before:tw-bg-base';
        case currentPlacement.toString().includes(TooltipPosition.Right.toLowerCase()):
            return merge([
                'before:tw-border-t-0 before:tw-border-r-0 tw-left-[-5px]',
                brightHeader &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                alignment === TooltipAlignment.Start &&
                currentPlacement.toString().includes(TooltipAlignment.Start.toLowerCase())
                    ? brightHeaderArrowBackgroundColors[brightHeader]
                    : 'before:tw-dark before:tw-bg-base',
            ]);
        case currentPlacement.toString().includes(TooltipPosition.Bottom.toLowerCase()):
            return merge([
                'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]',
                brightHeader ? brightHeaderArrowBackgroundColors[brightHeader] : 'before:tw-dark before:tw-bg-base',
            ]);
        case currentPlacement.toString().includes(TooltipPosition.Left.toLowerCase()):
            return merge([
                'before:tw-border-b-0 before:tw-border-l-0 tw-right-[-5px]',
                brightHeader &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                alignment === TooltipAlignment.Start &&
                currentPlacement.toString().includes(TooltipAlignment.Start.toLowerCase())
                    ? brightHeaderArrowBackgroundColors[brightHeader]
                    : 'before:tw-dark before:tw-bg-base',
            ]);
        default:
            return 'before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px] before:tw-dark before:tw-bg-base';
    }
};

const TooltipWrapper = ({
    enablePortal = false,
    children,
}: {
    enablePortal?: boolean;
    children?: ReactNode | ReactNode[];
}) => {
    if (enablePortal) {
        return (<Portal>{children}</Portal>) as JSX.Element;
    }

    return children as JSX.Element;
};

export const LegacyTooltip = ({
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
    withStrongBorder = false,
    withArrow,
    flip = true,
    triggerElement,
    hoverDelay = 200,
    enterDelay = 0,
    open = false,
    disabled = false,
    enablePortal = false,
    hidden = false,
    'data-test-id': dataTestId = 'tooltip',
}: LegacyTooltipProps) => {
    const [triggerElementRef, setTriggerElementRef] = useState<HTMLElement | HTMLDivElement | HTMLButtonElement | null>(
        null,
    );
    const [isOpen, setIsOpen] = useState(false);
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    const shouldPreventTooltipOpening = hidden || disabled;
    const { linkProps } = useLink({ isDisabled: shouldPreventTooltipOpening }, linkRef);
    const hasLargePaddingTop = useMemo(
        () => linkUrl || buttons || heading || headingIcon,
        [linkUrl, buttons, heading, headingIcon],
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
                name: 'eventListeners',
                options: { scroll: isOpen, resize: isOpen },
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
        (event: MouseEvent) => {
            const hoveredElement = event.composedPath?.();
            const hoverSources = [triggerElementRef, triggerElementContainerRef, tooltipContainerRef];

            if (hoveredElement && hoverSources.some((el) => el && hoveredElement.includes(el))) {
                handleShowTooltipOnHover();
            }
        },
        [handleShowTooltipOnHover, tooltipContainerRef, triggerElementContainerRef, triggerElementRef],
    );

    const handleCloseIfFocusedOutside = useCallback(
        (event: FocusEvent<HTMLElement>) => {
            const { relatedTarget } = event;
            const elements = [tooltipContainerRef, triggerElementContainerRef];

            if (!relatedTarget || !elements.some((element) => element?.contains(relatedTarget))) {
                setIsOpen(false);
            }
        },
        [tooltipContainerRef, triggerElementContainerRef],
    );

    const openingEvents: HTMLAttributes<HTMLElement> = shouldPreventTooltipOpening
        ? {}
        : {
              onMouseOver: (event) => checkIfHovered(event.nativeEvent),
              onMouseLeave: handleHideTooltipOnHover,
              onFocus: () => setIsOpen(true),
              onBlur: handleCloseIfFocusedOutside,
          };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(shouldPreventTooltipOpening ? false : open);
    }, [open, shouldPreventTooltipOpening]);

    const listenForEsc = useCallback(
        (event: KeyboardEvent) => {
            if (isOpen && event.key === 'Escape') {
                setIsOpen(false);
            }
        },
        [isOpen],
    );

    useLayoutEffect(() => {
        if (typeof popperInstance.update === 'function' && isOpen) {
            popperInstance.update();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', listenForEsc);
        } else {
            window.removeEventListener('keydown', listenForEsc);
        }

        return () => {
            window.removeEventListener('keydown', listenForEsc);
        };
    }, [listenForEsc, isOpen]);

    return (
        <>
            <div {...openingEvents} ref={setTriggerElementContainerRef}>
                <div ref={setTriggerElementRef} aria-describedby={id} role="tooltip">
                    {triggerElement}
                </div>
            </div>
            <TooltipWrapper enablePortal={enablePortal}>
                <div
                    ref={setTooltipContainerRef}
                    aria-hidden={shouldPreventTooltipOpening}
                    className={merge([
                        'tw-popper-container tw-inline-block tw-max-w-[200px] tw-dark tw-bg-base tw-rounded-md tw-shadow-mid tw-text-text tw-z-[120000]',
                        !isOpen && 'tw-opacity-0 tw-h-0 tw-w-0 tw-overflow-hidden',
                        withStrongBorder && 'tw-border tw-border-line-strong',
                    ])}
                    data-test-id={dataTestId}
                    role="tooltip"
                    id={id}
                    style={popperInstance.styles.popper}
                    {...popperInstance.attributes.popper}
                    {...openingEvents}
                >
                    {brightHeader && <BrightHeader headerStyle={brightHeader} />}
                    <div
                        className={merge([
                            'tw-px-3 tw-dark tw-bg-base tw-rounded-md tw-relative tw-z-[120000]',
                            hasLargePaddingTop ? paddingsTop.large : paddingsTop.small,
                            linkUrl ? paddingsBottom.large : paddingsBottom.small,
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
                                <span className="tw-shrink-0 tw-mr-1 tw-leading-4">
                                    {cloneElement(tooltipIcon, { size: IconSize.Size16 })}
                                </span>
                            )}
                            <span className="tw-text-s tw-min-w-0 tw-break-words">{content}</span>
                        </div>
                        {linkUrl && (
                            <a
                                {...linkProps}
                                data-test-id={`${dataTestId}-link`}
                                ref={linkRef}
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={merge([
                                    'tw-text-xs tw-text-black-40 tw-underline tw-mt-1',
                                    FOCUS_VISIBLE_STYLE,
                                ])}
                            >
                                {linkLabel ?? 'Click here to learn more.'}
                            </a>
                        )}
                        {buttons && (
                            <div className="tw-flex tw-flex-row-reverse tw-gap-x-1 tw-mt-4">
                                {buttons.length > 0 && (
                                    <Button
                                        style={ButtonStyle.Default}
                                        emphasis={ButtonEmphasis.Strong}
                                        size={ButtonSize.Small}
                                        onClick={buttons[0].action}
                                        disabled={shouldPreventTooltipOpening}
                                    >
                                        {buttons[0].label}
                                    </Button>
                                )}
                                {buttons.length === 2 && (
                                    <Button
                                        style={ButtonStyle.Default}
                                        emphasis={ButtonEmphasis.Default}
                                        size={ButtonSize.Small}
                                        onClick={buttons[1].action}
                                        disabled={shouldPreventTooltipOpening}
                                    >
                                        {buttons[1].label}
                                    </Button>
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
                                    'tw-popper-arrow tw-z-[110000] tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45 before:tw-border',
                                withArrow && arrowStyling,
                                withStrongBorder
                                    ? 'before:tw-border-line-strong'
                                    : withArrow && 'before:tw-border-line',
                            ])}
                        />
                    </div>
                    {children}
                </div>
            </TooltipWrapper>
        </>
    );
};
LegacyTooltip.displayName = 'FondueLegacyTooltip';
