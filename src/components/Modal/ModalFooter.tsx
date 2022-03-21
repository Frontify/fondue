/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalFooterProps } from "./types";
import { Button, ButtonStyle } from "@components/Button";

export const ModalFooter: FC<ModalFooterProps> = ({ buttons }) => {
    return (
        <div data-test-id="modal-footer">
            {buttons && (
                <div className="tw-flex tw-flex-row-reverse tw-gap-x-3">
                    {buttons.length > 0 && (
                        <Button style={ButtonStyle.Primary} onClick={buttons[0].onClick}>
                            {buttons[0].label}
                        </Button>
                    )}
                    {buttons.length === 2 && (
                        <Button style={ButtonStyle.Secondary} onClick={buttons[1].onClick}>
                            {buttons[1].label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
