/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { merge } from "@utilities/merge";
import { usePopper } from "react-popper";

export enum PopoverPosition {
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left",
}

export enum PopoverAlignment {
    Start = "Start",
    Middle = "Middle",
    End = "End",
}

const alignementSuffix: Record<PopoverAlignment, string> = {
    [PopoverAlignment.Start]: "-start",
    [PopoverAlignment.Middle]: "",
    [PopoverAlignment.End]: "-end",
};

export type PopoverProps = {
    children: ReactNode;
    transactional?: boolean;
    point?: boolean;
    position?: PopoverPosition;
    alignment?: PopoverAlignment;
    maxHeight?: number | "Viewport";
    maxWidth?: number | "Viewport";
    flip?: boolean;
    trigger: ReactElement;
};

export const Popover: FC<PopoverProps> = ({
    trigger,
    children,
    position = PopoverPosition.Bottom,
    alignment = PopoverAlignment.Middle,
    point,
    flip = true,
    transactional = false,
    maxWidth = "Viewport",
    maxHeight = "Viewport",
}) => {
    const placement = position + alignementSuffix[alignment];
    const [isOpen, setIsOpen] = useState(false);
    const referenceElement = useRef<HTMLElement | null>(null);
    const popperElement = useRef<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

    const setArrowClasses = () => {
        const currentPlacement = popperInstance.state?.placement ?? position;
        switch (true) {
            case currentPlacement.toString().includes(PopoverPosition.Top):
                return "before:tw-border-t-0 before:tw-border-l-0 tw-bottom-[-6px] tw-bg-base";
            case currentPlacement.toString().includes(PopoverPosition.Right):
                return "before:tw-border-t-0 before:tw-border-r-0 tw-left-[-6px] tw-bg-base";
            case currentPlacement.toString().includes(PopoverPosition.Bottom):
                return "before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px] tw-bg-base";
            case currentPlacement.toString().includes(PopoverPosition.Left):
                return "before:tw-border-b-0 before:tw-border-l-0 tw-right-[-6px] tw-bg-base";
            default:
                return "before:tw-border-b-0 before:tw-border-r-0 tw-top-[-6px] tw-bg-base";
        }
    };

    const handleClickOutside = () => {
        if (!transactional && isOpen) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    const popperInstance = usePopper(referenceElement.current, popperElement.current, {
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
                    offset: [0, point ? 10 : 0],
                },
            },
            {
                name: "flip",
                enabled: flip,
            },
        ],
    });

    const arrowStyling = setArrowClasses();

    return (
        <div data-test-id="popover">
            <div data-test-id="popover-trigger" role="button" tabIndex={0} aria-haspopup={true} aria-expanded={isOpen}>
                {cloneElement(trigger, {
                    ...trigger.props,
                    onClick: () => setIsOpen(!isOpen),
                    ref: referenceElement,
                })}
            </div>
            {isOpen && (
                <div>
                    <div
                        data-test-id="popover-popper"
                        role="menu"
                        style={popperInstance.styles.popper}
                        {...popperInstance.attributes.popper}
                        ref={popperElement}
                        className={merge([
                            "tw-relative tw-p-3 tw-border tw-border-line tw-rounded tw-shadow ",
                            // eslint-disable-next-line
                            !maxHeight || maxHeight === "Viewport" ? "tw-max-h-full" : "tw-max-h-[" + maxHeight + "px]",
                            // eslint-disable-next-line
                            !maxWidth || maxWidth === "Viewport" ? "tw-max-h-full" : "tw-max-w-[" + maxWidth + "px]",
                        ])}
                    >
                        <div>{children}</div>

                        {point && (
                            <div
                                data-test-id="popover-arrow"
                                data-popper-arrow
                                ref={setArrowElement}
                                style={popperInstance.styles.arrow}
                                className={merge([
                                    "tw-popper-arrow tw-absolute tw-w-3 tw-h-3 tw-pointer-events-none before:tw-absolute before:tw-w-3 before:tw-h-3 before:tw-rotate-45 before:tw-border before:tw-border-line",
                                    arrowStyling,
                                ])}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
