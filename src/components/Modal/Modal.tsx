/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalBody as Body } from "./ModalBody";
import { ModalVisual as Visual } from "./ModalVisual";
import { ModalVisual as Header } from "./ModalHeader";
import { ModalFooter as Footer } from "./ModalFooter";

export const Modal: FC<ModalProps> = ({ visual }) => {
    return (
        <div data-test-id="modal" className="tw-max-w-[790px] tw-max-h-[600px] tw-h-96 tw-flex tw-shadow-xl">
            <Visual pattern={visual} />
            <div className="tw-flex-1">
                <Header />
                <Body />
                <Footer />
            </div>
        </div>
    );
};
