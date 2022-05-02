/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle } from "@components/Button/Button";
import { IconSize } from "@foundation/Icon/IconSize";
import { useFocusRing } from "@react-aria/focus";
import { useLink } from "@react-aria/link";
import { mergeProps } from "@react-aria/utils";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, {
    cloneElement,
    FC,
    MutableRefObject,
    ReactChild,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { BrightHeader, brightHeaderArrowBackgroundColors, BrightHeaderStyle } from "./BrightHeader";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";

export type TooltipButton = {
    label: string;
    action: () => void;
};

export type TooltipProps = {
    triggerRefElement?: MutableRefObject<any>;
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
};

/**
 * This is a temporary workaround because for some yet unknown reasons `tailwindcss` in clarify purges the `tw-pb-3.5` and `tw-pt-3.5` class.
 */
const paddingsTop = {
    small: "tw-pt-3.5",
    large: "tw-pt-4",
};

const paddingsBottom = {
    small: "tw-pb-3.5",
    large: "tw-pb-4",
};

export enum TooltipPosition {
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left",
}

export enum TooltipAlignment {
    Start = "Start",
    Middle = "Middle",
    End = "End",
}

const alignementSuffix: Record<TooltipAlignment, string> = {
    [TooltipAlignment.Start]: "-start",
    [TooltipAlignment.Middle]: "",
    [TooltipAlignment.End]: "-end",
};

export const Tooltip: FC<TooltipProps> = ({
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
    triggerRefElement,
    hoverDelay = 200,
}) => {
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const { linkProps } = useLink({}, linkRef);
    const { isFocusVisible, focusProps } = useFocusRing();
    const hasLargePaddingTop = linkUrl || brightHeader || buttons || heading || headingIcon;

    const placement = position + alignementSuffix[alignment];
    const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

    const setArrowClasses = () => {
        const currentPlacement = popperInstance.state?.placement ?? position;
        switch (true) {
            case currentPlacement.toString().includes(TooltipPosition.Top):
                return "before:tw-border-t-0 before:tw-border-l-0 tw-bottom-[-6px] before:tw-bg-black-100 before:dark:tw-bg-white";
            case currentPlacement.toString().includes(TooltipPosition.Right):
                return merge([
                    "before:tw-border-t-0 before:tw-border-r-0 tw-left-[-6px]",
                    brightHeader && alignment === TooltipAlignment.Start
                        ? brightHeaderArrowBackgroundColors[brightHeader]
                        : "before:tw-bg-black-100 before:dark:tw-bg-white",
                ]);
            case currentPlacement.toString().includes(TooltipPosition.Bottom):
                return merge([
                    "before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px]",
                    brightHeader
                        ? brightHeaderArrowBackgroundColors[brightHeader]
                        : "before:tw-bg-black-100 before:dark:tw-bg-white",
                ]);
            case currentPlacement.toString().includes(TooltipPosition.Left):
                return merge([
                    "before:tw-border-b-0 before:tw-border-l-0 tw-right-[-6px]",
                    brightHeader && alignment === TooltipAlignment.Start
                        ? brightHeaderArrowBackgroundColors[brightHeader]
                        : "before:tw-bg-black-100 before:dark:tw-bg-white",
                ]);
            default:
                return "before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px] before:tw-bg-black-100 before:dark:tw-bg-white";
        }
    };

    const tooltipOffset = withArrow ? 10 : 5;
    const popperInstance = usePopper(triggerRefElement?.current, tooltipContainerRef.current, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        placement: placement,
        modifiers: [
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                },
            },
            {
                name: "offset",
                options: {
                    offset: [0, tooltipOffset],
                },
            },
            {
                name: "flip",
                enabled: flip,
            },
        ],
    });

    const arrowStyling = setArrowClasses();
    const [isOpen, setIsOpen] = useState(false);

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const handleShowTooltipOnHover = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        setIsOpen(true);
    };

    const handleHideTooltipOnHover = () => {
        timeout = setTimeout(() => setIsOpen(false), hoverDelay);
    };

    const checkIfHovered = (e: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const hoveredElement = e.path;
        if (hoveredElement.includes(triggerRefElement?.current)) {
            handleShowTooltipOnHover();
        }

        if (hoveredElement.includes(tooltipContainerRef?.current)) {
            handleShowTooltipOnHover();
        }
    };

    useEffect(() => {
        triggerRefElement?.current.addEventListener("mouseover", (event: MouseEvent) => checkIfHovered(event));
        triggerRefElement?.current.addEventListener("mouseleave", handleHideTooltipOnHover);
        triggerRefElement?.current.addEventListener("focus", () => setIsOpen(true));
        triggerRefElement?.current.addEventListener("blur", () => setIsOpen(false));
        tooltipContainerRef?.current?.addEventListener("mouseover", (event: MouseEvent) => checkIfHovered(event));
        tooltipContainerRef?.current?.addEventListener("mouseleave", handleHideTooltipOnHover);

        return () => {
            triggerRefElement?.current.removeEventListener("mouseover", (event: MouseEvent) => checkIfHovered(event));
            triggerRefElement?.current.removeEventListener("mouseleave", handleHideTooltipOnHover);
            triggerRefElement?.current.removeEventListener("focus", () => setIsOpen(true));
            triggerRefElement?.current.addEventListener("blur", () => setIsOpen(false));
            tooltipContainerRef?.current?.removeEventListener("mouseover", (event: MouseEvent) =>
                checkIfHovered(event),
            );
            tooltipContainerRef?.current?.removeEventListener("mouseleave", handleHideTooltipOnHover);
        };
    }, [checkIfHovered]);

    return createPortal(
        <div>
            {isOpen && (
                <div
                    ref={tooltipContainerRef}
                    className="tw-popper-container tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-20"
                    data-test-id="tooltip"
                    role="tooltip"
                    style={popperInstance.styles.popper}
                    {...popperInstance.attributes.popper}
                >
                    {brightHeader && <BrightHeader headerStyle={brightHeader} />}
                    <div
                        className={merge([
                            "tw-px-4",
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
                                <span className="tw-shrink-0 tw-mr-1">
                                    {cloneElement(tooltipIcon, { size: IconSize.Size16 })}
                                </span>
                            )}
                            <p className="tw-text-s">{content}</p>
                        </div>
                        {linkUrl && (
                            <a
                                {...mergeProps(linkProps, focusProps)}
                                data-test-id="tooltip-link"
                                ref={linkRef}
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={merge([
                                    "tw-text-xs tw-text-black-40 dark:tw-text-black-80 tw-underline tw-mt-1",
                                    isFocusVisible && FOCUS_STYLE,
                                ])}
                            >
                                {linkLabel ?? "Click here to learn more."}
                            </a>
                        )}
                        {buttons && (
                            <div className="tw-flex tw-flex-row-reverse tw-gap-x-1 tw-mt-4">
                                {buttons.length > 0 && (
                                    <Button
                                        style={ButtonStyle.Primary}
                                        size={ButtonSize.Small}
                                        inverted
                                        onClick={buttons[0].action}
                                    >
                                        {buttons[0].label}
                                    </Button>
                                )}
                                {buttons.length === 2 && (
                                    <Button
                                        style={ButtonStyle.Secondary}
                                        size={ButtonSize.Small}
                                        inverted
                                        onClick={buttons[1].action}
                                    >
                                        {buttons[1].label}
                                    </Button>
                                )}
                            </div>
                        )}
                        <div
                            data-test-id="popover-arrow"
                            data-popper-arrow
                            ref={setArrowElement}
                            style={popperInstance.styles.arrow}
                            className={merge([
                                withArrow &&
                                    "tw-popper-arrow tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45 before:tw-border before:tw-border-line",
                                withArrow && arrowStyling,
                            ])}
                        />
                    </div>
                    {children}
                </div>
            )}
        </div>,
        document.body,
    );
};
