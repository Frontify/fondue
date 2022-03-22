/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalFooterProps } from "./types";
import { Button, ButtonSize } from "@components/Button";

export const ModalFooter: FC<ModalFooterProps> = ({ buttons }) => (
    <div data-test-id="modal-footer">
        {buttons && (
            <div className="tw-flex tw-flex-row-reverse tw-gap-x-3">
                {buttons.map((button, index) => (
                    <Button {...button} size={ButtonSize.Medium} key={index} />
                ))}
            </div>
        )}
    </div>
);
