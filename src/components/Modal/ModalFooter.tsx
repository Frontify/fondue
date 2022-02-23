/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalFooterProps } from "./types";

export const ModalFooter: FC<ModalFooterProps> = () => {
    return (
        <div data-test-id="modal-footer" className="tw-bg-violet-50">
            ModalFooter
        </div>
    );
};
