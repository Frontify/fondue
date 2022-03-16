/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC, useRef } from "react";
import { ModalProps } from "./types";
import { ModalVisual } from "./ModalVisual";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { useDialog } from "@react-aria/dialog";

export const Modal: FC<ModalProps> = (props) => {
    const { visual, header, footer, children } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { overlayProps, underlayProps } = useOverlay(props, ref);

    usePreventScroll();
    const { modalProps } = useModal();

    const { dialogProps, titleProps } = useDialog(props, ref);

    return (
        <div
            className="tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-z-50 tw-flex tw-justify-center tw-items-center"
            style={{ background: "rgba(0, 0, 0, .5)" }}
            {...underlayProps}
        >
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <FocusScope contain restoreFocus autoFocus>
                <div
                    {...overlayProps}
                    {...dialogProps}
                    {...modalProps}
                    ref={ref}
                    data-test-id="modal-container"
                    className="tw-max-w-[790px] tw-max-h-[600px] tw-flex tw-bg-white tw-border tw-border-solid tw-border-grey-20 tw-rounded tw-shadow-2xl"
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
            </FocusScope>
        </div>
    );
};
