/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, useRef } from "react";
import { ModalProps } from "./types";
import { ModalVisual } from "./ModalVisual";
import { OverlayContainer, useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { useDialog } from "@react-aria/dialog";

import { AnimatePresence, motion } from "framer-motion";

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

export const Modal: FC<ModalProps> = (props) => {
    const { visual, header, footer, children, isOpen } = props;

    const ref = useRef<HTMLDivElement>(null);
    const {
        overlayProps,
        underlayProps: { onPointerDown },
    } = useOverlay(props, ref);

    usePreventScroll();
    const { modalProps } = useModal();

    const { dialogProps, titleProps } = useDialog(props, ref);

    return (
        <OverlayContainer>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={UNDERLAY_VARIANTS}
                        initial="initial"
                        animate="show"
                        exit="exit"
                        style={{ background: "rgba(0, 0, 0, .5)" }}
                        onPointerDown={onPointerDown}
                        className="tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-z-50 tw-flex tw-justify-center tw-items-center"
                    >
                        <FocusScope contain restoreFocus>
                            <motion.div variants={MODAL_VARIANTS}>
                                <div
                                    {...overlayProps}
                                    {...dialogProps}
                                    {...modalProps}
                                    ref={ref}
                                    data-test-id="modal-container"
                                    className="tw-max-w-[790px] tw-max-h-[600px] tw-flex tw-bg-white tw-border tw-border-solid tw-border-line-strong tw-rounded tw-shadow-2xl"
                                >
                                    {visual?.pattern && (
                                        <div className="tw-w-[260px] tw-relative tw-flex-shrink-0 tw-overflow-hidden">
                                            <ModalVisual {...visual} />
                                        </div>
                                    )}
                                    <div className="tw-flex tw-flex-col tw-flex-1 tw-space-y-6 tw-p-14 tw-overflow-hidden">
                                        {header && cloneElement(header, { ariaTitleProps: titleProps })}
                                        {children}
                                        {footer}
                                    </div>
                                </div>
                            </motion.div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </OverlayContainer>
    );
};
