/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalVisualProps } from "./types";

export const ModalVisual: FC<ModalVisualProps> = () => {
    return (
        <div data-test-id="modal-visual" className="tw-bg-red-50">
            ModalVisual
        </div>
    );
};
