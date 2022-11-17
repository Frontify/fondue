/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonProps, ButtonSize, ButtonStyle } from '@components/Button';
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
                'tw-flex tw-gap-x-3 tw-justify-end tw-py-5 tw-px-8 tw-bg-white dark:tw-bg-black-95 tw-rounded-b tw-border tw-border-t-0 tw-border-line',
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
                      {
                          style: ButtonStyle.Default,
                          emphasis: ButtonEmphasis.Default,
                          children: 'Cancel',
                          onClick: onCancel,
                      },
                      {
                          style: ButtonStyle.Default,
                          emphasis: ButtonEmphasis.Strong,
                          children: 'Confirm',
                          onClick: onConfirm,
                          icon: <IconCheckMark />,
                      },
                  ]
                : [
                      {
                          style: ButtonStyle.Default,
                          emphasis: ButtonEmphasis.Default,
                          children: 'Close',
                          onClick: onCancel,
                      },
                  ]
        }
    />
);
