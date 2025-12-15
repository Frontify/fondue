/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from '@foundation/Icon/IconSize';

import { ButtonSize, ButtonType } from './ButtonTypes';

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export const buttonIconSizeMap: Record<ButtonSize, IconSize> = {
    [ButtonSize.Small]: IconSize.Size16,
    [ButtonSize.Medium]: IconSize.Size20,
    [ButtonSize.Large]: IconSize.Size24,
};

/**
 * @deprecated Please use updated button component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#button the migration guide}.
 */
export const buttonTypeMap: Record<ButtonType, 'button' | 'submit' | 'reset'> = {
    [ButtonType.Button]: 'button',
    [ButtonType.Submit]: 'submit',
    [ButtonType.Reset]: 'reset',
};
