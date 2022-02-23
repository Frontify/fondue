/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalBodyProps } from "./types";

export const ModalBody: FC<ModalBodyProps> = () => {
    return (
        <div data-test-id="modal-body" className="tw-bg-green-50">
            ModalBody
        </div>
    );
};
