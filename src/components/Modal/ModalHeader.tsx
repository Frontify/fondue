/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { merge } from "@utilities/merge";
import { ModalHeaderProps, ModalHeaderVariant, modalHeaderVariants } from "./types";

export const ModalHeader: FC<ModalHeaderProps> = ({
    title,
    leadText,
    decorator,
    variant = ModalHeaderVariant.Default,
}) => {
    return (
        <div data-test-id="modal-header" className="">
            <div className="tw-flex tw-items-center">
                {decorator && <span className={merge(["tw-mr-2", modalHeaderVariants[variant]])}>{decorator}</span>}
                <h3 className="tw-text-xl tw-font-heading tw-font-medium">{title}</h3>
            </div>
            {<p className="tw-text-grey-60 tw-mt-4">{leadText}</p>}
        </div>
    );
};
