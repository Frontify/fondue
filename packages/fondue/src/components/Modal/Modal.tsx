/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { OverlayContainer, useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useMemo, useRef, type ReactElement } from 'react';

import { merge } from '@utilities/merge';

import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalVisual } from './ModalVisual';
import { MODAL_PADDING, ModalLayoutContext } from './context/ModalLayout';
import { ModalTitleContext } from './context/ModalTitle';
import { ModalWidth, type ModalProps } from './types';

const UNDERLAY_VARIANTS = {
    initial: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.15,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15,
        },
    },
};

const MODAL_VARIANTS = {
    initial: { y: -200 },
    show: { y: 0, transition: { duration: 0.3 } },
    exit: { y: 0 },
};

const widthMap: Record<ModalWidth, string> = {
    [ModalWidth.Default]: 'tw-max-w-[800px]',
    [ModalWidth.Small]: 'tw-max-w-[600px]',
    [ModalWidth.Large]: 'tw-max-w-[1200px]',
};

/**
 * @deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
const ModalComponent = memo((props: ModalProps): ReactElement => {
    const { visual, children, width = ModalWidth.Default, zIndex, compact = false } = props;
    const ref = useRef<HTMLDivElement>(null);
    const {
        overlayProps,
        underlayProps: { onPointerDown },
    } = useOverlay(props, ref);

    usePreventScroll();
    const { modalProps } = useModal();

    const { dialogProps, titleProps } = useDialog(props, ref);

    const padding = compact ? MODAL_PADDING.compact : MODAL_PADDING.default;

    return (
        <motion.div
            variants={UNDERLAY_VARIANTS}
            initial="initial"
            animate="show"
            exit="exit"
            style={{
                background: 'rgba(0, 0, 0, .5)',
                zIndex,
            }}
            onPointerDown={onPointerDown}
            data-is-underlay
            className={
                'tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-flex tw-justify-center tw-items-center tw-p-4'
            }
        >
            <FocusScope contain restoreFocus autoFocus>
                <motion.div
                    variants={MODAL_VARIANTS}
                    className={merge([widthMap[width], 'tw-w-full tw-max-h-full tw-h-contents tw-flex tw-flex-col'])}
                >
                    <div
                        {...overlayProps}
                        {...dialogProps}
                        {...modalProps}
                        ref={ref}
                        data-test-id="modal-container"
                        className="tw-flex-initial tw-min-h-0 tw-w-full tw-flex tw-bg-white tw-overflow-hidden tw-border tw-border-solid tw-border-line-strong tw-rounded tw-shadow-2xl"
                    >
                        {visual?.pattern ? (
                            <div className="tw-w-[260px] tw-relative tw-flex-shrink-0 tw-overflow-hidden">
                                <ModalVisual {...visual} />
                            </div>
                        ) : null}
                        <div className="tw-flex tw-flex-col tw-flex-1 tw-space-y-6 tw-overflow-hidden">
                            <ModalLayoutContext.Provider
                                value={useMemo(() => ({ compact, padding }), [compact, padding])}
                            >
                                <ModalTitleContext.Provider value={titleProps}>{children}</ModalTitleContext.Provider>
                            </ModalLayoutContext.Provider>
                        </div>
                    </div>
                </motion.div>
            </FocusScope>
        </motion.div>
    );
});

ModalComponent.displayName = 'Modal';

/**
 * @deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
export const Modal = ({ isOpen, ...modalProps }: ModalProps) => (
    <OverlayContainer>
        <AnimatePresence>{isOpen && <ModalComponent {...modalProps} isOpen />}</AnimatePresence>
    </OverlayContainer>
);

Modal.displayName = 'FondueModal';

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
