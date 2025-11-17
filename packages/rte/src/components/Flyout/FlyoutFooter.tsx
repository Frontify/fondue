/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import { type ReactElement } from 'react';

import { Button, type ButtonProps } from '@components/Button/Button';
import { ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button/ButtonTypes';
import { merge } from '@utilities/merge';

/**
 * @deprecated Use `Flyout` from `@frontify/fondue/components` instead.
 */
export type FlyoutFooterProps = {
    buttons: [ButtonProps, ButtonProps] | [ButtonProps];
    border?: boolean;
};

/**
 * @deprecated Use `Flyout` from `@frontify/fondue/components` instead.
 */
export const FlyoutFooter = ({ buttons, border = true }: FlyoutFooterProps): ReactElement => {
    return (
        <div
            className={merge([
                'tw-flex tw-gap-x-3 tw-rounded-b tw-justify-end tw-py-5 tw-px-8 tw-bg-base',
                border && 'tw-border-t tw-border-line',
                // The footer min-height should be 76px, since we Tailwind doesn't have a tw-h-19 class
                // we force TW to create it
                // The 19 comes from, 10 from the tw-py-5 + 9 from button height tw-h-9
                'tw-min-h-[4.75rem]',
            ])}
        >
            {buttons.map((button, index) => (
                <Button key={`flyout-footer-button-${index}`} {...button} size={ButtonSize.Medium} />
            ))}
        </div>
    );
};
FlyoutFooter.displayName = 'FondueFlyoutFooter';

/**
 * @deprecated Use `Flyout` from `@frontify/fondue/components` instead.
 */
export const LegacyFlyoutFooter = ({
    onConfirm,
    onCancel,
}: {
    onConfirm?: () => void;
    onCancel?: () => void;
}): ReactElement => (
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
LegacyFlyoutFooter.displayName = 'FondueLegacyFlyoutFooter';
