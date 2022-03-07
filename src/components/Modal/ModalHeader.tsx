/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, FC } from "react";
import { merge } from "@utilities/merge";
import { ModalHeaderProps, ModalHeaderVariant, modalHeaderVariants } from "./types";
import { IconSize } from "@foundation/Icon";

export const ModalHeader: FC<ModalHeaderProps> = ({
    title,
    leadText,
    decorator,
    variant = ModalHeaderVariant.Default,
}) => {
    return (
        <div data-test-id="modal-header" className="tw-mb-6">
            <div className="tw-flex tw-items-center">
                {decorator && (
                    <span
                        data-test-id="modal-header-decorator-container"
                        className={merge(["tw-mr-2", modalHeaderVariants[variant]])}
                    >
                        {cloneElement(decorator, { size: IconSize.Size24 })}
                    </span>
                )}
                <h3 className="tw-text-xl tw-font-heading tw-font-medium">{title}</h3>
            </div>
            {<p className="tw-text-grey-60 tw-mt-4">{leadText}</p>}
        </div>
    );
};
