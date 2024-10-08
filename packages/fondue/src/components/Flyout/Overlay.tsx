/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDialog } from '@react-aria/dialog';
import { DismissButton, useModal, useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { Children, type ForwardRefRenderFunction, type HTMLAttributes, type RefObject, forwardRef } from 'react';

import { Badge } from '@components/Badge/Badge';
import { FieldsetHeader } from '@components/FieldsetHeader/FieldsetHeader';
import { merge } from '@utilities/merge';

import { type FlyoutProps } from './Flyout';

type OverlayProps = Omit<FlyoutProps, 'trigger' | 'onOpenChange' | 'onConfirm' | 'legacyFooter' | 'onCancel'> & {
    positionProps: HTMLAttributes<Element>;
    overlayTriggerProps: HTMLAttributes<Element>;
    scrollRef: RefObject<HTMLDivElement>;
    onClose: () => void;
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
        fixedHeader,
        fixedFooter,
        fitContent,
        contentMinHeight,
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
                'tw-rounded tw-flex tw-outline-none tw-relative',
                fitContent ? 'tw-min-w-0' : 'tw-min-w-[400px]',
            ])}
        >
            <div
                className={merge([
                    'tw-flex tw-flex-col tw-flex-auto tw-min-h-0 tw-rounded tw-shadow-mid tw-border tw-border-line-x-strong',
                ])}
            >
                {fixedHeader}
                <div
                    ref={scrollRef}
                    className={merge([
                        'tw-flex tw-overflow-y-auto tw-overflow-x-hidden tw-flex-col tw-divide-y tw-divide tw-divide-black-10 tw-bg-white tw-text-black dark:tw-text-white dark:tw-bg-black-95',
                        !fixedHeader && 'tw-rounded-t',
                        !fixedFooter && 'tw-rounded-b',
                    ])}
                    style={{
                        minHeight: `${contentMinHeight}px`,
                    }}
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
Overlay.displayName = 'FondueOverlay';
