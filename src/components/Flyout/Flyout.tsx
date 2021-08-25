/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeader } from "@compositions/FieldsetHeader/FieldsetHeader";
import { Badge, BadgeProps } from "@elements/Badge/Badge";
import { Button, ButtonStyle } from "@elements/Button/Button";
import { Divider, DividerHeight } from "@elements/Divider/Divider";
import IconCheck from "@elements/Icon/Generated/IconCheck";
import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import {
    DismissButton,
    OverlayContainer,
    OverlayProvider,
    useModal,
    useOverlay,
    useOverlayPosition,
    useOverlayTrigger,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { Children, FC, forwardRef, HTMLAttributes, ReactNode, RefObject, useRef } from "react";
import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { watchModals } from "@react-aria/aria-modal-polyfill";

export const FLYOUT_DIVIDER_COLOR = "#eaebeb";

export type FlyoutProps = PropsWithChildren<{
    trigger: ReactNode;
    onClose: () => void;
    onClick?: () => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
}>;

type OverlayProps = Omit<FlyoutProps, "trigger"> & {
    isOpen?: boolean;
    positionProps: HTMLAttributes<Element>;
    overlayTriggerProps: HTMLAttributes<Element>;
};
const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
    ({ title, decorator, badges, onClick, onClose, children, isOpen, positionProps, overlayTriggerProps }, ref) => {
        const { overlayProps } = useOverlay({ onClose, isOpen, isDismissable: true }, ref as RefObject<HTMLDivElement>);
        const { modalProps } = useModal();
        const { dialogProps, titleProps } = useDialog({}, ref as RefObject<HTMLDivElement>);

        return (
            <div
                {...mergeProps(overlayProps, dialogProps, modalProps, positionProps, overlayTriggerProps)}
                ref={ref}
                className="tw-flex tw-flex-col tw-rounded tw-bg-white tw-text-black dark:tw-text-white dark:tw-bg-black-95 tw-shadow-mid tw-outline-none"
            >
                {title && (
                    <>
                        <div className="tw-flex tw-justify-between tw-flex-wrap tw-gap-3 tw-p-8">
                            <div {...titleProps} className="tw-inline-flex">
                                <FieldsetHeader decorator={decorator}>{title}</FieldsetHeader>
                            </div>
                            <div className="tw-inline-flex tw-gap-2 tw-flex-wrap">
                                {badges &&
                                    badges.map((badge, index) => <Badge key={`flyout-badge-${index}`} {...badge} />)}
                            </div>
                        </div>
                        <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />
                    </>
                )}
                {Children.map(children, (child, index) => (
                    <>
                        {index !== 0 && <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />}

                        <div key={index} className="tw-p-8">
                            {child}
                        </div>

                        {index === Children.count(children) - 1 && (
                            <Divider color={FLYOUT_DIVIDER_COLOR} height={DividerHeight.Height10} />
                        )}
                    </>
                ))}
                <div className="tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8">
                    {onClick ? (
                        <>
                            <Button onClick={onClose} style={ButtonStyle.Secondary}>
                                Cancel
                            </Button>
                            <Button onClick={onClick} icon={<IconCheck />}>
                                Confirm
                            </Button>
                        </>
                    ) : (
                        <Button onClick={onClose} style={ButtonStyle.Secondary}>
                            Close
                        </Button>
                    )}
                </div>
                <DismissButton onDismiss={onClose} />
            </div>
        );
    },
);

export const Flyout: FC<FlyoutProps> = (props) => {
    const state = useOverlayTriggerState({});
    const { isOpen } = state;
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();
    const { triggerProps, overlayProps: overlayTriggerProps } = useOverlayTrigger(
        { type: "dialog" },
        state,
        triggerRef,
    );
    const { overlayProps: positionProps } = useOverlayPosition({
        targetRef: triggerRef,
        overlayRef,
        placement: "bottom left",
        offset: 5,
        isOpen,
    });
    const { buttonProps } = useButton({ onPress: () => state.toggle() }, triggerRef);
    useEffect(() => {
        const revert = watchModals();

        return () => revert();
    }, []);

    return (
        <OverlayProvider className="tw-flex tw-h-full tw-items-center">
            <button
                {...mergeProps(buttonProps, triggerProps, focusProps)}
                ref={triggerRef}
                className={merge(["tw-outline-none tw-mx-3 tw-rounded", isFocusVisible && FOCUS_STYLE])}
                data-test-id="flyout-trigger"
            >
                {props.trigger}
            </button>
            {isOpen && (
                <OverlayContainer>
                    <FocusScope restoreFocus>
                        <Overlay
                            title={props.title}
                            badges={props.badges}
                            decorator={props.decorator}
                            isOpen={isOpen}
                            overlayTriggerProps={overlayTriggerProps}
                            positionProps={positionProps}
                            onClick={props.onClick}
                            onClose={() => {
                                props.onClose();
                                state.close();
                            }}
                            ref={overlayRef}
                        >
                            {props.children}
                        </Overlay>
                    </FocusScope>
                </OverlayContainer>
            )}
        </OverlayProvider>
    );
};
