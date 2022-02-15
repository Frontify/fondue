/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeProps } from "@components/Badge/Badge";
import { watchModals } from "@react-aria/aria-modal-polyfill";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { OverlayContainer, OverlayProvider, useOverlayTrigger, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, MouseEvent, PropsWithChildren, ReactNode, useEffect, useMemo, useRef } from "react";
import { LegacyFlyoutFooter } from ".";
import { Overlay } from "./Overlay";
import { shouldDisplayAbove } from "./shouldDisplayAbove";
import { useContainScroll } from "./useContainScroll";

export const FLYOUT_DIVIDER_COLOR = "#eaebeb";
export const FLYOUT_DIVIDER_HEIGHT = "10px";
const FLYOUT_OVERLAY_OFFSET = 5;
const DEFAULT_OVERLAY_PADDING = 12;

type VerticalMargin = {
    top?: number;
    bottom?: number;
};

export type FlyoutProps = PropsWithChildren<{
    trigger: ReactNode;
    onCancel?: () => void;
    onConfirm?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
    hug?: boolean;
    fitContent?: boolean;
    isOpen?: boolean;
    onOpenChange: (isOpen: boolean) => void;
    fixedHeader?: ReactNode;
    fixedFooter?: ReactNode;
    verticalMargin?: VerticalMargin;
    /**
     * The legacy footer buttons section inside of the flyout will be deleted in the future.
     * @deprecated Pass the FlyoutFooter component with buttons to the Flyout component.
     */
    legacyFooter?: boolean;
}>;

export const Flyout: FC<FlyoutProps> = ({
    trigger,
    decorator,
    onConfirm,
    onCancel,
    children,
    onOpenChange,
    isOpen = false,
    title = "",
    badges = [],
    hug = true,
    fitContent = false,
    fixedHeader,
    fixedFooter,
    verticalMargin,
    legacyFooter = true,
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

    const overlayHeight = useMemo(() => {
        let height = 0;
        if (scrollRef.current && innerOverlayRef.current) {
            const outerScrollHeight = innerOverlayRef.current.scrollHeight;
            const { scrollHeight: innerScrollHeight, clientHeight: innerClientHeight } = scrollRef.current;
            height = outerScrollHeight + (innerScrollHeight - innerClientHeight);
        }

        return height;
    }, [innerOverlayRef.current, scrollRef.current?.scrollHeight, scrollRef.current?.clientHeight]);

    const padding = {
        top: verticalMargin?.top || DEFAULT_OVERLAY_PADDING,
        bottom: verticalMargin?.bottom || DEFAULT_OVERLAY_PADDING,
    };

    const isFlipped = shouldDisplayAbove({
        triggerRef,
        overlayHeight,
        padding,
        offset: FLYOUT_OVERLAY_OFFSET,
    });

    const { overlayProps: positionProps } = useOverlayPosition({
        targetRef: triggerRef,
        overlayRef,
        shouldFlip: false,
        containerPadding: isFlipped ? padding.top : padding.bottom,
        placement: isFlipped ? "top left" : "bottom left",
        offset: FLYOUT_OVERLAY_OFFSET,
        scrollRef,
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
                            onClose={close}
                            overlayTriggerProps={overlayTriggerProps}
                            positionProps={positionProps}
                            fixedHeader={fixedHeader}
                            fixedFooter={
                                legacyFooter ? (
                                    <LegacyFlyoutFooter onConfirm={onConfirm} onCancel={onCancel} />
                                ) : (
                                    fixedFooter
                                )
                            }
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
