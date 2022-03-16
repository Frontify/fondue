/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalFooterProps } from "./types";
import { Button, ButtonStyle } from "@components/Button";

export const ModalFooter: FC<ModalFooterProps> = ({ buttons }) => {
    return (
        <div data-test-id="modal-footer">
            {buttons && (
                <div className="tw-flex tw-flex-row-reverse tw-gap-x-1 tw-mt-4">
                    {buttons.length > 0 && (
                        <Button style={ButtonStyle.Primary} onClick={buttons[0].action}>
                            {buttons[0].label}
                        </Button>
                    )}
                    {buttons.length === 2 && (
                        <Button style={ButtonStyle.Secondary} onClick={buttons[1].action}>
                            {buttons[1].label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
