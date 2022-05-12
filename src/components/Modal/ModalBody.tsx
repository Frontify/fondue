/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalBodyProps } from "./types";
import { ScrollWrapper } from "@components/ScrollWrapper/ScrollWrapper";
import { MODAL_PADDING } from "../..";

export const ModalBody: FC<ModalBodyProps> = ({ direction, children, horizontalPadding = true }) => {
    return (
        <div
            data-test-id="modal-body"
            className={`tw-flex-auto tw-min-h-0 ${horizontalPadding ? MODAL_PADDING.horizontal : ""}`}
        >
            <ScrollWrapper direction={direction}>{children}</ScrollWrapper>
        </div>
    );
};
