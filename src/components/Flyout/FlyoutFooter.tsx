/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonProps, ButtonSize, ButtonStyle } from '@components/Button/Button';
import { IconCheckMark } from '@foundation/Icon';
import { merge } from '@utilities/merge';
import React, { FC, PropsWithChildren } from 'react';

export type FlyoutFooterProps = PropsWithChildren<{
    buttons: [ButtonProps, ButtonProps] | [ButtonProps];
    border?: boolean;
}>;

export const FlyoutFooter: FC<FlyoutFooterProps> = ({ buttons, border = true }) => {
    return (
        <div
            className={merge([
                'tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-bg-white dark:tw-bg-black-95',
                border && 'tw-border-t tw-border-t-black-10',
            ])}
        >
            {buttons.map((button, index) => (
                <Button key={`flyout-footer-button-${index}`} {...button} size={ButtonSize.Medium} />
            ))}
        </div>
    );
};

export const LegacyFlyoutFooter = ({ onConfirm, onCancel }: { onConfirm?: () => void; onCancel?: () => void }) => (
    <FlyoutFooter
        buttons={
            onConfirm
                ? [
                      { children: 'Cancel', onClick: onCancel, style: ButtonStyle.Secondary },
                      { children: 'Confirm', onClick: onConfirm, style: ButtonStyle.Primary, icon: <IconCheckMark /> },
                  ]
                : [{ children: 'Close', onClick: onCancel, style: ButtonStyle.Secondary }]
        }
    />
);
