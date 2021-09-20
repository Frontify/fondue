/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, ReactElement, ReactNode, useRef } from "react";
import { merge } from "@utilities/merge";
import { useLink } from "@react-aria/link";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import { IconSize } from "@elements/Icon/IconSize";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { BrightHeader, BrightHeaderStyle } from "./BrightHeader";
import { Button, ButtonStyle, ButtonSize } from "@elements/Button/Button";

export type TooltipButton = {
    label: string;
    action: () => void;
};

export type TooltipProps = {
    tooltip: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton] | [TooltipButton];
};

export const Tooltip: FC<TooltipProps> = ({
    tooltip,
    tooltipIcon,
    heading,
    headingIcon,
    linkUrl,
    linkLabel,
    brightHeader,
    buttons,
}) => {
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const { linkProps } = useLink({}, linkRef);

    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <>
            <div
                className="tw-inline-block tw-max-w-[200px] tw-bg-black-100 dark:tw-bg-white tw-rounded-md tw-shadow-mid tw-text-white dark:tw-text-black-100 tw-z-20"
                data-test-id="tooltip"
            >
                {brightHeader && <BrightHeader headerStyle={brightHeader} />}
                <div className="tw-p-4">
                    {heading && (
                        <h4 className="tw-flex tw-text-m tw-font-bold tw-mb-1">
                            <span className="tw-mr-1.5">
                                {headingIcon && cloneElement(headingIcon, { size: IconSize.Size20 })}
                            </span>
                            {heading}
                        </h4>
                    )}
                    <div className="tw-flex">
                        {tooltipIcon && (
                            <span className="tw-flex-shrink-0 tw-mr-1">
                                {cloneElement(tooltipIcon, { size: IconSize.Size16 })}
                            </span>
                        )}
                        <p className="tw-text-s">{tooltip}</p>
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
            </div>
        </>
    );
};
