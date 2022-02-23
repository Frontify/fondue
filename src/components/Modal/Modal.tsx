/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalBody as Body } from "./ModalBody";
import { ModalVisual as Visual } from "./ModalVisual";
import { ModalVisual as Header } from "./ModalHeader";
import { ModalFooter as Footer } from "./ModalFooter";

export const Modal: FC<ModalProps> = ({ visual }) => {
    return (
        <div data-test-id="modal" className="tw-shadow-xl">
            <Visual pattern={visual} />
            <Header />
            <Body />
            <Footer />
        </div>
    );
};
