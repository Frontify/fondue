/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalFooterProps } from "./types";
import { Button, ButtonSize } from "@components/Button";
import { MODAL_PADDING } from "./Modal";

export const ModalFooter: FC<ModalFooterProps> = ({ buttons }) => (
    <div data-test-id="modal-footer" className={`${MODAL_PADDING.bottom} ${MODAL_PADDING.horizontal}`}>
        {buttons && (
            <div className="tw-flex tw-gap-x-3 tw-justify-end">
                {buttons.map((button, index) => (
                    <Button {...button} size={ButtonSize.Medium} key={index} />
                ))}
            </div>
        )}
    </div>
);
