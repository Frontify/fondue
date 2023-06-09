/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Popper } from '@components/Popper';
import React, { Children, isValidElement, useRef } from 'react';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { OVERLAY_CONTAINER_CLASSES } from '@utilities/overlayStyle';
import { BaseDialogProps, Modality, OverlayProps } from '../../types/dialog';
import { merge } from '@utilities/merge';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { useClickOutside } from '@hooks/useClickOutside';
import { Portal } from '@components/Portal';

export const Overlay = ({
    open,
    placement,
    offset,
    flip,
    enablePortal,
    children,
    role = 'region',
    'data-test-id': dataTestId = 'fondue-overlay',
    maxWidth = 'auto',
    maxHeight = 'auto',
    minWidth = 'auto',
    minHeight = 'auto',
    handleClose,
    modality = Modality.NonModal,
    darkUnderlay,
}: OverlayProps & BaseDialogProps) => {
    const id = useMemoizedId();
    const ref = useRef<HTMLDivElement | null>(null);
    const handleClosingInteraction = () => {
        if (open && modality !== Modality.BlockingModal) {
            if (handleClose) {
                handleClose();
            }
        }
    };

    useFocusTrap(ref.current, open, modality === Modality.NonModal);
    useClickOutside(ref.current, handleClosingInteraction);

    return (
        <>
            <Popper
                data-test-id={dataTestId}
                open={open}
                placement={placement}
                offset={offset}
                flip={flip}
                enablePortal={enablePortal}
            >
                {Children.map(children, (child) => {
                    if (isValidElement(child) && typeof child.type === 'function') {
                        const { name } = child.type;

                        if (name === Trigger.name) {
                            return (
                                <Popper.Reference>
                                    <div id={id} data-test-id={`${dataTestId}-trigger`}>
                                        {child}
                                    </div>
                                </Popper.Reference>
                            );
                        }

                        if (name === Content.name) {
                            return (
                                <Popper.Content>
                                    <div
                                        ref={ref}
                                        data-test-id={`${dataTestId}-content`}
                                        className={merge([
                                            'tw-flex tw-flex-col tw-pointer-events-auto',
                                            OVERLAY_CONTAINER_CLASSES,
                                        ])}
                                        role={role}
                                        id={id}
                                        aria-hidden={!open}
                                        aria-labelledby={id}
                                        style={{ minWidth, minHeight, maxWidth, maxHeight }}
                                    >
                                        {child}
                                    </div>
                                </Popper.Content>
                            );
                        }
                    }
                })}
            </Popper>

            {modality !== Modality.NonModal && open && (
                <Portal>
                    <div
                        data-test-id={`${dataTestId}-underlay`}
                        className={merge([
                            'tw-absolute tw-w-screen tw-h-screen tw-top-0 tw-left-0 tw-overflow-hidden tw-z-[9990]',
                            darkUnderlay && 'tw-transition-opacity tw-bg-black tw-opacity-50',
                        ])}
                    />
                </Portal>
            )}
        </>
    );
};
