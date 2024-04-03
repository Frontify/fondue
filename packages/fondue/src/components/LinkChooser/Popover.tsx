/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DismissButton, useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { type MouseEvent, type ReactElement, type TouchEvent, useRef } from 'react';

import { type PopoverProps } from './types';

export const Popover = (props: PopoverProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const { popoverRef = ref, isOpen, onClose, children, maxHeight } = props;

    const { overlayProps } = useOverlay(
        {
            isOpen,
            onClose,
            shouldCloseOnBlur: true,
            isDismissable: false,
        },
        popoverRef,
    );

    /* Focus must not be shifted to the popover when any buttons are pressed since this will close the input.
    There is a blur event fired on the input when clicking inside the popover which gets fired twice *sometimes*,
    (once with a relatedTarget and once without). This way all blur events are prevented */

    const bubblingEventProps = {
        onMouseDown: (event: MouseEvent<HTMLDivElement>) => event.preventDefault(),
        onTouchStart: (event: TouchEvent<HTMLDivElement>) => event.preventDefault(),
    };

    return (
        <div
            {...mergeProps(overlayProps, { style: { maxHeight } })}
            ref={popoverRef}
            className="tw-bg-white tw-border-black-10 tw-border tw-rounded tw-overflow-x-hidden tw-shadow-mid tw-overflow-y-auto"
        >
            <div {...bubblingEventProps}>
                {children}
                <DismissButton onDismiss={onClose} />
            </div>
        </div>
    );
};
