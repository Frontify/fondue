/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeProps } from "@components/Badge/Badge";
import { watchModals } from "@react-aria/aria-modal-polyfill";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { OverlayContainer, OverlayProvider, useOverlayPosition, useOverlayTrigger } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, MouseEvent, PropsWithChildren, ReactNode, RefObject, useEffect, useMemo, useRef } from "react";
import { FlyoutLegacyFooter } from ".";
import { Overlay } from "./Overlay";
import { useContainScroll } from "./useContainScroll";

export const FLYOUT_DIVIDER_COLOR = "#eaebeb";
export const FLYOUT_DIVIDER_HEIGHT = "10px";

export type FlyoutProps = PropsWithChildren<{
    trigger: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
    hug?: boolean;
    fitContent?: boolean;
    isOpen?: boolean;
    onOpenChange: (isOpen: boolean) => void;
    fixedHeader?: ReactNode;
    fixedFooter?: ReactNode;
    /**
     * The legacy footer buttons section inside of the flyout will be deleted in the future.
     * @deprecated Pass the FlyoutFooter component with buttons to the Flyout component.
     */
    legacyFooter?: boolean;
}>;

export const Flyout: FC<FlyoutProps> = ({
    trigger,
    decorator,
    onClick,
    children,
    onOpenChange,
    isOpen = false,
    title = "",
    badges = [],
    hug = true,
    fitContent = false,
    legacyFooter = true,
    fixedHeader,
    fixedFooter,
}) => {
    const state = useOverlayTriggerState({ isOpen, onOpenChange });
    const { toggle, close } = state;
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const innerOverlayRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();

    const { triggerProps, overlayProps: overlayTriggerProps } = useOverlayTrigger(
        { type: "dialog" },
        state,
        triggerRef,
    );

    const ariaScrollCalculationRef = useMemo(() => {
        if (scrollRef.current && innerOverlayRef.current) {
            const outerScrollHeight = innerOverlayRef.current.scrollHeight;
            const { scrollHeight: innerScrollHeight, clientHeight: innerClientHeight } = scrollRef.current;
            /* The scrollRef passed to useOverlayPosition is used by react-aria to determine if the height should flip.
            Since the only properties it needs are the 4 below, and since it expects the scrollable content to be the
            outermost container, we need to combine the scrollHeights of the innerOverlay and the scrollRef so that it
            can properly calculate if it must flip the position */

            return {
                current: {
                    ...scrollRef.current,
                    scrollHeight: outerScrollHeight + (innerScrollHeight - innerClientHeight),
                },
            } as RefObject<HTMLDivElement>;
        }

        return scrollRef;
    }, [innerOverlayRef.current, scrollRef.current?.scrollHeight, scrollRef.current?.clientHeight]);

    const { overlayProps: positionProps } = useOverlayPosition({
        targetRef: triggerRef,
        overlayRef,
        placement: "bottom left",
        offset: 5,
        scrollRef: ariaScrollCalculationRef,
        isOpen,
    });

    const { buttonProps } = useButton({ onPress: () => toggle() }, triggerRef);
    useEffect(() => {
        const revert = watchModals();

        return () => revert();
    }, []);

    useContainScroll(overlayRef, { isDisabled: !isOpen });

    return (
        <OverlayProvider className="tw-flex tw-h-full tw-items-center">
            <div
                {...mergeProps(buttonProps, triggerProps, focusProps)}
                ref={triggerRef}
                className={merge([
                    "tw-outline-none tw-rounded",
                    hug ? "tw-mx-3" : "tw-w-full",
                    isFocusVisible && FOCUS_STYLE,
                ])}
                data-test-id="flyout-trigger"
            >
                {trigger}
            </div>
            {isOpen && (
                <OverlayContainer>
                    <FocusScope restoreFocus>
                        <Overlay
                            title={title}
                            badges={badges}
                            decorator={decorator}
                            isOpen={isOpen}
                            overlayTriggerProps={overlayTriggerProps}
                            positionProps={positionProps}
                            fixedHeader={fixedHeader}
                            fixedFooter={
                                legacyFooter ? <FlyoutLegacyFooter onClick={onClick} onClose={close} /> : fixedFooter
                            }
                            onClose={close}
                            ref={overlayRef}
                            scrollRef={scrollRef}
                            innerOverlayRef={innerOverlayRef}
                            fitContent={fitContent}
                        >
                            {overlayRef?.current && children}
                        </Overlay>
                    </FocusScope>
                </OverlayContainer>
            )}
        </OverlayProvider>
    );
};
