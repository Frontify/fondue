/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalHeaderProps } from "./types";

export const ModalHeader: FC<ModalHeaderProps> = () => {
    return (
        <div data-test-id="modal-header" className="tw-bg-grey-50">
            ModalHeader
        </div>
    );
};
