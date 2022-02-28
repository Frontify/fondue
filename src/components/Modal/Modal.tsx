/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalBody } from "./ModalBody";
import { ModalVisual } from "./ModalVisual";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";

export const Modal: FC<ModalProps> = ({ visual, scale, foregroundColor }) => {
    return (
        <div data-test-id="modal" className="tw-max-w-[790px] tw-max-h-[600px] tw-h-96 tw-flex tw-shadow-xl">
            {visual && <ModalVisual pattern={visual} scale={scale} foregroundColor={foregroundColor} />}
            <div className="tw-flex-1">
                <ModalHeader />
                <ModalBody />
                <ModalFooter />
            </div>
        </div>
    );
};
