/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalBodyProps } from "./types";
import { ScrollWrapper } from "@components/ScrollWrapper/ScrollWrapper";

export const ModalBody: FC<ModalBodyProps> = ({ children }) => {
    return (
        <div data-test-id="modal-body" className="tw-bg-grey-30">
            <ScrollWrapper>{children}</ScrollWrapper>
        </div>
    );
};
