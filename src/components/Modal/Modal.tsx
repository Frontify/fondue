/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, memo, useRef } from "react";
import { merge } from "@utilities/merge";
import { ModalProps, ModalWidth } from "./types";
import { ModalVisual } from "./ModalVisual";
import { OverlayContainer, useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { useDialog } from "@react-aria/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ModalTitle } from "./context/ModalTitle";
import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";

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
    [ModalWidth.Default]: "tw-max-w-[800px]",
    [ModalWidth.Large]: "tw-max-w-[1200px]",
};

export const MODAL_PADDING = {
    top: "tw-pt-14",
    horizontal: "tw-px-14",
    bottom: "tw-pb-14",
};

const DEFAULT_ZINDEX = 50;

const ModalComponent: FC<ModalProps> = memo((props) => {
    const { visual, children, width = ModalWidth.Default, zIndex = DEFAULT_ZINDEX } = props;
    const ref = useRef<HTMLDivElement>(null);
    const {
        overlayProps,
        underlayProps: { onPointerDown },
    } = useOverlay(props, ref);

    usePreventScroll();
    const { modalProps } = useModal();

    const { dialogProps, titleProps } = useDialog(props, ref);

    return (
        <motion.div
            variants={UNDERLAY_VARIANTS}
            initial="initial"
            animate="show"
            exit="exit"
            style={{
                background: "rgba(0, 0, 0, .5)",
                zIndex,
            }}
            onPointerDown={onPointerDown}
            data-is-underlay={true}
            className={`tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-flex tw-justify-center tw-items-center tw-p-4`}
        >
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <FocusScope contain restoreFocus autoFocus>
                <motion.div
                    variants={MODAL_VARIANTS}
                    className={merge([widthMap[width], "tw-w-full tw-max-h-full tw-h-contents tw-flex tw-flex-col"])}
                >
                    <div
                        {...overlayProps}
                        {...dialogProps}
                        {...modalProps}
                        ref={ref}
                        data-test-id="modal-container"
                        className="tw-flex-initial tw-min-h-0 tw-w-full tw-flex tw-bg-white tw-border tw-border-solid tw-border-line-strong tw-rounded tw-shadow-2xl"
                    >
                        {visual?.pattern && (
                            <div className="tw-w-[260px] tw-relative tw-flex-shrink-0 tw-overflow-hidden">
                                <ModalVisual {...visual} />
                            </div>
                        )}
                        <div className="tw-flex tw-flex-col tw-flex-1 tw-space-y-6 tw-overflow-hidden">
                            <ModalTitle.Provider value={titleProps}>{children}</ModalTitle.Provider>
                        </div>
                    </div>
                </motion.div>
            </FocusScope>
        </motion.div>
    );
});

ModalComponent.displayName = "Modal";

export const Modal = ({ isOpen, ...modalProps }: ModalProps) => (
    <OverlayContainer>
        <AnimatePresence>{isOpen && <ModalComponent {...modalProps} isOpen />}</AnimatePresence>
    </OverlayContainer>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
