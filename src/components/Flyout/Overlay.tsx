/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge } from "@components/Badge/Badge";
import { FieldsetHeader } from "@components/FieldsetHeader/FieldsetHeader";
import { useDialog } from "@react-aria/dialog";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { merge } from "@utilities/merge";
import React, { Children, forwardRef, ForwardRefRenderFunction, HTMLAttributes, RefObject } from "react";
import { FlyoutProps } from ".";

type OverlayProps = Omit<FlyoutProps, "trigger" | "onOpenChange" | "onClick" | "legacyFooter"> & {
    positionProps: HTMLAttributes<Element>;
    overlayTriggerProps: HTMLAttributes<Element>;
    scrollRef: RefObject<HTMLDivElement>;
    innerOverlayRef: RefObject<HTMLDivElement>;
};

const OverlayComponent: ForwardRefRenderFunction<HTMLDivElement, OverlayProps> = (
    {
        title,
        decorator,
        badges = [],
        onClose,
        children,
        isOpen,
        positionProps,
        overlayTriggerProps,
        scrollRef,
        innerOverlayRef,
        fixedHeader,
        fixedFooter,
        fitContent,
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
            className={merge([
                "tw-max-h-full tw-flex tw-shadow-mid tw-outline-none",
                fitContent ? "tw-min-w-0" : "tw-min-w-[400px]",
            ])}
        >
            <div className="tw-flex tw-flex-col tw-flex-auto tw-min-h-0" ref={innerOverlayRef}>
                {fixedHeader}
                <div
                    ref={scrollRef}
                    className="tw-flex tw-overflow-y-auto tw-overflow-x-hidden tw-flex-col tw-divide-y tw-divide tw-divide-black-10 tw-rounded tw-bg-white tw-text-black dark:tw-text-white dark:tw-bg-black-95"
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

                    <DismissButton onDismiss={onClose} />
                </div>
                {fixedFooter}
            </div>
        </div>
    );
};

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(OverlayComponent);
