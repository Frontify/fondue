/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalBody } from "./ModalBody";
import { ModalVisual } from "./ModalVisual";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";

export const Modal: FC<ModalProps> = ({ visual }) => {
    return (
        <div
            data-test-id="modal-container"
            className="tw-max-w-[790px] tw-max-h-[600px] tw-h-[1000px] tw-flex tw-shadow-xl"
        >
            {visual && (
                <div className="tw-w-[260px] tw-relative">
                    <ModalVisual {...visual} />
                </div>
            )}
            <div className="tw-flex-1">
                <ModalHeader />
                <ModalBody />
                <ModalFooter />
            </div>
        </div>
    );
};
