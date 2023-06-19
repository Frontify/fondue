/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Popper } from '@components/Popper';
import React, { Children, isValidElement, useCallback, useRef, useState } from 'react';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { OVERLAY_CONTAINER_CLASSES } from '@utilities/overlayStyle';
import { BaseDialogProps, Modality, OverlayProps } from '../../types/dialog';
import { merge } from '@utilities/merge';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { useClickOutside } from '@hooks/useClickOutside';
import { Portal } from '@components/Portal';
import { useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import { Z_INDEX_MODAL_BACKDROP } from '@utilities/dialogs/constants';

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
    minWidth = 0,
    minHeight = 0,
    handleClose,
    modality = Modality.NonModal,
    darkUnderlay,
    autoHeight,
    zIndex,
}: OverlayProps & BaseDialogProps) => {
    const id = useMemoizedId();
    const ref = useRef<HTMLDivElement | null>(null);
    const [triggerElementRef, setTriggerElementRef] = useState<HTMLDivElement | null>(null);
    const { maxHeight: maxAutoHeight } = useDropdownAutoHeight(
        { current: triggerElementRef },
        { isOpen: open, autoResize: true },
    );

    const maxContentHeight = autoHeight ? maxAutoHeight : maxHeight;
    const handleClosingInteraction = useCallback(() => {
        if (open && modality !== Modality.BlockingModal) {
            if (handleClose) {
                handleClose();
            }
        }
    }, [handleClose, modality, open]);

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
                zIndex={zIndex}
            >
                {Children.map(children, (child) => {
                    if (isValidElement(child) && typeof child.type === 'function') {
                        const { name } = child.type;

                        if (name === Trigger.name) {
                            return (
                                <Popper.Reference>
                                    <div id={id} ref={setTriggerElementRef} data-test-id={`${dataTestId}-trigger`}>
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
                                        style={{ minWidth, minHeight, maxWidth, maxHeight: maxContentHeight }}
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
                            'tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0',
                            darkUnderlay && 'tw-transition-opacity tw-bg-black tw-opacity-50',
                        ])}
                        style={{ zIndex: Z_INDEX_MODAL_BACKDROP }}
                    />
                </Portal>
            )}
        </>
    );
};
