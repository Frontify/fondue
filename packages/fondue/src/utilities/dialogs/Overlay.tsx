/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { Popper } from '@components/Popper';
import { useCallback, useEffect, useState } from 'react';
import { OVERLAY_CONTAINER_DARK_THEME_STYLING, OVERLAY_CONTAINER_LIGHT_THEME_STYLING } from '@utilities/overlayStyle';
import { BaseDialogProps, Modality, OverlayProps, overlayBorderRadius, overlayShadowMap } from '../../types';
import { merge, mergeRefs } from '@utilities/merge';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { useClickOutside } from '@hooks/useClickOutside';
import { Portal } from '@components/Portal';
import { useDropdownAutoHeight } from '@hooks/useDropdownAutoHeight';
import { Z_INDEX_MODAL_BACKDROP } from '@utilities/dialogs/constants';
import useMobileDetection from '@hooks/useMobileDetection';
import { useHandleCloseOnEscape } from '@hooks/useHandleCloseOnEscape';

export const Overlay = ({
    id: customId,
    open,
    anchor,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = true,
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
    darkUnderlay = true,
    autoHeight,
    zIndex,
    isDetached,
    verticalAlignment,
    strategy,
    theme = 'light',
    withArrow,
    arrowCustomColors,
    roundedCorners = true,
    shadow = 'large',
    isDialog = true,
    width,
    borderRadius = 'small',
}: OverlayProps & BaseDialogProps & { borderRadius?: 'small' | 'large' }) => {
    const id = useMemoizedId(customId);
    const [triggerElementRef, setTriggerElementRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const trigger = anchor?.current;

        if (trigger) {
            setTriggerElementRef(trigger as HTMLElement);
        }
    }, [anchor]);

    const { maxHeight: maxAutoHeight } = useDropdownAutoHeight(
        { current: triggerElementRef },
        { isOpen: open, autoResize: true },
    );

    const maxContentHeight = autoHeight ? maxAutoHeight : maxHeight;
    const handleClosingInteraction = useCallback(() => {
        if (open && modality !== Modality.BlockingModal) {
            if (handleClose) {
                handleClose();
                triggerElementRef?.focus();
            }
        }
    }, [handleClose, modality, open, triggerElementRef]);

    const { elementRef } = useFocusTrap<HTMLDivElement>(open, modality === Modality.NonModal, triggerElementRef);
    const { dismissibleElementRef } = useClickOutside<HTMLDivElement>(handleClosingInteraction);
    useHandleCloseOnEscape(open, {
        isBlockingModal: modality === Modality.BlockingModal,
        callback: handleClosingInteraction,
    });

    useEffect(() => {
        if (modality !== Modality.NonModal) {
            if (open) {
                document.body.style.pointerEvents = 'none';
                if (strategy === 'fixed') {
                    document.body.style.overflow = 'hidden';
                }
            }
            if (!open) {
                document.body.style.pointerEvents = 'auto';
                document.body.style.overflow = 'auto';
            }
        }

        return () => {
            if (modality !== Modality.NonModal) {
                document.body.style.pointerEvents = 'auto';
            }
        };
    }, [open, modality, strategy]);

    const isMobile = useMobileDetection();

    return (
        <>
            <Popper
                anchor={anchor}
                data-test-id={dataTestId}
                open={open}
                placement={placement}
                offset={offset}
                flip={flip}
                enablePortal={enablePortal}
                zIndex={zIndex}
                isDetached={isDetached}
                verticalAlignment={verticalAlignment}
                strategy={strategy}
                withArrow={withArrow}
                arrowCustomColors={arrowCustomColors}
            >
                <div
                    ref={mergeRefs(dismissibleElementRef, elementRef)}
                    data-test-id={`${dataTestId}-content`}
                    className={merge([
                        'tw-flex tw-flex-col tw-pointer-events-auto',
                        theme === 'light'
                            ? OVERLAY_CONTAINER_LIGHT_THEME_STYLING
                            : OVERLAY_CONTAINER_DARK_THEME_STYLING,
                        roundedCorners && overlayBorderRadius[borderRadius],
                        overlayShadowMap[shadow],
                    ])}
                    role={role}
                    id={id}
                    aria-hidden={!open}
                    aria-labelledby={id}
                    style={{
                        width,
                        minWidth: isMobile && isDialog ? '90vw' : minWidth,
                        minHeight,
                        maxWidth: isMobile && isDialog ? '90vw' : maxWidth,
                        maxHeight: maxContentHeight,
                    }}
                >
                    {children}
                </div>
            </Popper>

            {darkUnderlay && (isMobile || modality !== Modality.NonModal) && open && (
                <Portal>
                    <div
                        data-test-id={`${dataTestId}-underlay`}
                        className={merge([
                            'tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0',
                            (darkUnderlay || isMobile) &&
                                'tw-transition-opacity tw-bg-box-neutral-mighty tw-opacity-50',
                        ])}
                        style={{ zIndex: Z_INDEX_MODAL_BACKDROP }}
                    />
                </Portal>
            )}
        </>
    );
};
