/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';

export type DialogButton = {
    label: string;
    action: () => void;
};

export type DialogFooterProps = {
    buttons: [DialogButton] | [DialogButton, DialogButton];
};

export const DialogFooter = ({ buttons }: DialogFooterProps): ReactElement => {
    return (
        <div
            data-test-id="dialog-footer"
            className="tw-p-4 tw-border-t tw-border-t-line tw-flex tw-items-center tw-justify-end tw-gap-x-3"
        >
            {buttons && buttons.length > 0 && (
                <Button
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Default}
                    size={ButtonSize.Medium}
                    onClick={buttons[0].action}
                >
                    {buttons[0].label}
                </Button>
            )}
            {buttons && buttons.length === 2 && (
                <Button
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Strong}
                    size={ButtonSize.Medium}
                    onClick={buttons[1].action}
                >
                    {buttons[1].label}
                </Button>
            )}
        </div>
    );
};
