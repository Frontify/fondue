/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalProps } from "./types";
import { ModalVisual } from "./ModalVisual";

export const Modal: FC<ModalProps> = ({ visual }) => {
    return (
        <div data-test-id="modal" className="tw-shadow-xl">
            <ModalVisual pattern={visual} />
        </div>
    );
};
