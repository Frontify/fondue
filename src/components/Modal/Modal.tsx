/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalBody } from "./ModalBody";
import { ModalVisual } from "./ModalVisual";

export const Modal: FC<ModalProps> = ({ visual, header, children }) => {
    return (
        <div
            data-test-id="modal-container"
            className="tw-max-w-[790px] tw-max-h-[600px] tw-flex tw-border tw-border-solid tw-border-grey-20 tw-rounded tw-shadow-xl"
        >
            {visual && (
                <div className="tw-w-[260px] tw-relative">
                    <ModalVisual {...visual} />
                </div>
            )}
            <div className="tw-flex-1 tw-p-14">
                {header}
                {children && <ModalBody>{children}</ModalBody>}
            </div>
        </div>
    );
};
