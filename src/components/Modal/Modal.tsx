/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalVisual } from "./ModalVisual";

export const Modal: FC<ModalProps> = ({ visual, header, footer, children }) => {
    return (
        <div
            data-test-id="modal-container"
            className="tw-max-w-[790px] tw-max-h-[600px] tw-flex tw-border tw-border-solid tw-border-grey-20 tw-rounded tw-shadow-2xl"
        >
            {visual?.pattern && (
                <div className="tw-w-[260px] tw-relative tw-flex-shrink-0">
                    <ModalVisual {...visual} />
                </div>
            )}
            <div className="tw-flex tw-flex-col tw-flex-1 tw-space-y-6 tw-p-14 tw-overflow-hidden">
                {header}
                {children}
                {footer}
            </div>
        </div>
    );
};
