/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, cloneElement } from 'react';
import { Popover } from '@components/Popover';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { PopperProps } from '@components/Popper/types';
import { Modality } from '../../types/dialog';
import { useClickOutside } from '@hooks/useClickOutside';

export type InlineDialogProps = {
    triggerElement: ReactElement;
    open: boolean;
    modality?: Modality;
    handleClose: () => void;
} & PopperProps;

export const InlineDialog = ({
    children,
    triggerElement,
    open = false,
    handleClose,
    modality = Modality.NonModal,
}: InlineDialogProps): ReactElement => {
    const ref = useFocusTrap(modality);
    const handleClosingInteraction = () => {
        if (open && modality !== Modality.BlockingModal) {
            handleClose();
        }
        return;
    };
    useClickOutside(ref.current, handleClosingInteraction);
    return (
        <div data-test-id="fondue-inlineDialog" ref={ref}>
            <Popover open={open} role="dialog">
                <Popover.Trigger>{triggerElement && cloneElement(triggerElement)}</Popover.Trigger>
                <Popover.Content>
                    <div className="tw-min-w-0 tw-max-w-[400px]">{children}</div>
                </Popover.Content>
            </Popover>
        </div>
    );
};
