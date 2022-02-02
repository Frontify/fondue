/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle } from "@components/Button/Button";
import { IconSize } from "@foundation/Icon/IconSize";
import { useFocusRing } from "@react-aria/focus";
import { useLink } from "@react-aria/link";
import { useTooltip } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { AriaTooltipProps } from "@react-types/tooltip";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, {
    cloneElement,
    CSSProperties,
    forwardRef,
    ForwardRefRenderFunction,
    ReactChild,
    ReactElement,
    ReactNode,
    useRef,
} from "react";
import { BrightHeader, BrightHeaderStyle } from "./BrightHeader";

export type TooltipButton = {
    label: string;
    action: () => void;
};

type PopperAttributes = { [key: string]: string };

export type TooltipProps = {
    content: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton] | [TooltipButton];
    tooltipAriaProps?: AriaTooltipProps;
    style?: CSSProperties;
    children?: ReactChild;
    popperAttributes?: PopperAttributes;
};

const TooltipComponent: ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (
    {
        content,
        tooltipIcon,
        heading,
        headingIcon,
        linkUrl,
        linkLabel,
        brightHeader,
        buttons,
        tooltipAriaProps = {},
        style,
        children,
        popperAttributes,
    },
    tooltipContainerRef,
) => {
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const { linkProps } = useLink({}, linkRef);

    const { isFocusVisible, focusProps } = useFocusRing();

    const { tooltipProps } = useTooltip(tooltipAriaProps);

    return (
        <>
            <div
                ref={tooltipContainerRef}
                className="tw-popper-container tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-20"
                style={style}
                data-test-id="tooltip"
                {...popperAttributes}
                {...tooltipProps}
            >
                {brightHeader && <BrightHeader headerStyle={brightHeader} />}
                <div
                    className={merge([
                        "tw-px-4",
                        linkUrl || brightHeader || buttons || heading || headingIcon ? "tw-pt-3.5" : "tw-pt-4",
                        linkUrl ? "tw-pb-3.5" : "tw-pb-4",
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
                </div>
                {children}
            </div>
        </>
    );
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(TooltipComponent);
