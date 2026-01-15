/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueIconProps } from '@frontify/fondue-icons';

import { ButtonSize, ButtonType } from './ButtonTypes';

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export const buttonIconSizeMap: Record<ButtonSize, FondueIconProps['size']> = {
    [ButtonSize.Small]: 16,
    [ButtonSize.Medium]: 20,
    [ButtonSize.Large]: 24,
};

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export const buttonTypeMap: Record<ButtonType, 'button' | 'submit' | 'reset'> = {
    [ButtonType.Button]: 'button',
    [ButtonType.Submit]: 'submit',
    [ButtonType.Reset]: 'reset',
};
