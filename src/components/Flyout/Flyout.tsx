/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeader } from "@components/FieldsetHeader/FieldsetHeader";
import { Badge, BadgeProps } from "@components/Badge/Badge";
import { Button, ButtonStyle } from "@components/Button/Button";
import IconCheck from "@foundation/Icon/Generated/IconCheck";
import { watchModals } from "@react-aria/aria-modal-polyfill";
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
import React, {
    Children,
    FC,
    forwardRef,
    ForwardRefRenderFunction,
    HTMLAttributes,
    MouseEvent,
    PropsWithChildren,
    ReactNode,
    RefObject,
    useEffect,
    useRef,
} from "react";

export const FLYOUT_DIVIDER_COLOR = "#eaebeb";
export const FLYOUT_DIVIDER_HEIGHT = "10px";

export type FlyoutProps = PropsWithChildren<{
    trigger: ReactNode;
    onClose?: () => void;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
    hug?: boolean;
    isOpen?: boolean;
    onOpenChange: (isOpen: boolean) => void;
    /**
     * The legacy footer buttons section inside of the flyout will be deleted in the future.
     * @deprecated Pass the FlyoutFooter component with buttons to the Flyout component.
     */
    legacyFooter?: boolean;
}>;

type OverlayProps = Omit<FlyoutProps, "trigger" | "onOpenChange"> & {
    positionProps: HTMLAttributes<Element>;
    overlayTriggerProps: HTMLAttributes<Element>;
    scrollRef: RefObject<HTMLDivElement>;
};

const OverlayComponent: ForwardRefRenderFunction<HTMLDivElement, OverlayProps> = (
    {
        title,
        decorator,
        badges = [],
        onClick,
        onClose,
        children,
        isOpen,
        positionProps,
        overlayTriggerProps,
        scrollRef,
        legacyFooter,
    },
    ref,
) => {
    const { overlayProps } = useOverlay({ onClose, isOpen, isDismissable: true }, ref as RefObject<HTMLDivElement>);
    const { modalProps } = useModal();
    const { dialogProps, titleProps } = useDialog({}, ref as RefObject<HTMLDivElement>);

    return (
        <div
            {...mergeProps(overlayProps, dialogProps, modalProps, positionProps, overlayTriggerProps)}
            ref={ref}
            className="tw-max-h-full tw-overflow-y-scroll tw-shadow-mid tw-min-w-[400px] tw-outline-none"
        >
            <div
                ref={scrollRef}
                className="tw-flex tw-flex-col tw-divide-y tw-divide tw-divide-black-10 tw-rounded tw-bg-white tw-text-black dark:tw-text-white dark:tw-bg-black-95"
            >
                {title && (
                    <div className="tw-flex tw-justify-between tw-flex-wrap tw-gap-3 tw-p-8">
                        <div {...titleProps} className="tw-inline-flex">
                            <FieldsetHeader decorator={decorator}>{title}</FieldsetHeader>
                        </div>
                        <div className="tw-inline-flex tw-gap-2 tw-flex-wrap">
                            {badges.map((badgeProps, index) => (
                                <Badge {...badgeProps} key={`flyout-badge-${index}`} />
                            ))}
                        </div>
                    </div>
                )}
                {Children.map(children, (child, index) => (
                    <div key={index}>{child}</div>
                ))}
                {legacyFooter && (
                    <div className="tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-sticky tw-bottom-0 tw-bg-white dark:tw-bg-black-95">
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
                )}
                <DismissButton onDismiss={onClose} />
            </div>
        </div>
    );
};

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(OverlayComponent);

export const Flyout: FC<FlyoutProps> = ({
    trigger,
    decorator,
    onClick,
    onClose,
    children,
    onOpenChange,
    isOpen = false,
    title = "",
    badges = [],
    hug = true,
    legacyFooter = true,
}) => {
    const state = useOverlayTriggerState({ isOpen, onOpenChange });
    const { toggle, close } = state;
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
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
        scrollRef: scrollRef,
        isOpen,
    });
    const { buttonProps } = useButton({ onPress: () => toggle() }, triggerRef);
    useEffect(() => {
        const revert = watchModals();

        return () => revert();
    }, []);

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
                            onClick={
                                onClick
                                    ? () => {
                                          onClick();
                                          close();
                                      }
                                    : undefined
                            }
                            onClose={() => {
                                onClose && onClose();
                                close();
                            }}
                            ref={overlayRef}
                            scrollRef={scrollRef}
                            legacyFooter={legacyFooter}
                        >
                            {overlayRef?.current && children}
                        </Overlay>
                    </FocusScope>
                </OverlayContainer>
            )}
        </OverlayProvider>
    );
};
