/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, ReactElement, ReactNode, RefObject, useState } from "react";
import { merge } from "@utilities/merge";
import { usePopper } from "react-popper";
import { DismissButton, OverlayContainer, OverlayProvider, useOverlay } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";

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
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
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

    // @ts-ignore
    const popperInstance = usePopper(referenceElement, popperElement, {
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

    // React-aria
    const { overlayProps } = useOverlay({ isDismissable: true }, popperElement as unknown as RefObject<HTMLDivElement>);

    return (
        <OverlayProvider>
            <div data-test-id="popover-trigger" role="button" tabIndex={0} aria-haspopup={true} aria-expanded={isOpen}>
                {cloneElement(trigger, {
                    ...trigger.props,
                    onClick: () => setIsOpen(!isOpen),
                    ref: setReferenceElement,
                })}
            </div>
            {isOpen && (
                <OverlayContainer>
                    <div data-test-id="popover">
                        <FocusScope restoreFocus>
                            <div
                                {...overlayProps}
                                data-test-id="popover-popper"
                                role="menu"
                                tabIndex={0}
                                style={popperInstance.styles.popper}
                                {...popperInstance.attributes.popper}
                                ref={setPopperElement}
                                className={merge([
                                    "tw-relative tw-p-3 tw-border tw-border-line tw-rounded tw-shadow ",
                                    !maxHeight || maxHeight === "Viewport"
                                        ? "tw-max-h-full"
                                        : "tw-max-h-[" + maxHeight + "px]",
                                    !maxWidth || maxWidth === "Viewport"
                                        ? "tw-max-h-full"
                                        : "tw-max-w-[" + maxWidth + "px]",
                                ])}
                            >
                                <div>{children}</div>
                                <DismissButton onDismiss={() => setIsOpen(!isOpen)} />
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
                        </FocusScope>
                    </div>
                </OverlayContainer>
            )}
        </OverlayProvider>
    );
};
