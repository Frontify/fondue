/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Popper } from '@components/Popper';
import React, { Children, cloneElement, isValidElement, useRef } from 'react';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { OVERLAY_CONTAINER_CLASSES } from '@utilities/overlayStyle';
import { BaseDialogProps, Modality, OverlayProps } from '../../types/dialog';
import { merge } from '@utilities/merge';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { useClickOutside } from '@hooks/useClickOutside';

export const Overlay = ({
    open,
    placement,
    offset,
    flip,
    enablePortal,
    children,
    role,
    'data-test-id': dataTestId,
    maxWidth = 'auto',
    maxHeight = 'auto',
    handleClose,
    modality,
}: OverlayProps & BaseDialogProps) => {
    const id = useMemoizedId();
    const ref = useFocusTrap(modality);
    const handleClosingInteraction = () => {
        if (open && modality !== Modality.BlockingModal) {
            if (handleClose) {
                handleClose();
            }
        }
        return;
    };
    useClickOutside(ref.current, handleClosingInteraction);
    return (
        <Popper open={open} placement={placement} offset={offset} flip={flip} enablePortal={enablePortal}>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    const { name } = child.type;

                    if (name === Trigger.name) {
                        return (
                            <Popper.Reference>
                                <div className="tw-w-fit" id={id}>
                                    {cloneElement(child, {
                                        ...child.props,
                                    })}
                                </div>
                            </Popper.Reference>
                        );
                    }

                    if (name === Content.name) {
                        return (
                            <Popper.Content>
                                <div
                                    ref={ref}
                                    data-test-id={dataTestId}
                                    className={merge(['tw-flex tw-flex-col', OVERLAY_CONTAINER_CLASSES])}
                                    role={role}
                                    id={id}
                                    aria-hidden={!open}
                                    aria-labelledby={id}
                                    style={{ maxWidth, maxHeight }}
                                >
                                    {cloneElement(child, { ...child.props })}
                                </div>
                            </Popper.Content>
                        );
                    }
                }
            })}
        </Popper>
    );
};
