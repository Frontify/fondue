/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalVisual as Visual } from "./ModalVisual";
import { ModalVisual as Header } from "./ModalHeader";

export const Modal: FC<ModalProps> = ({ visual }) => {
    return (
        <div data-test-id="modal" className="tw-shadow-xl">
            <Visual pattern={visual} />
            <Header />
        </div>
    );
};
