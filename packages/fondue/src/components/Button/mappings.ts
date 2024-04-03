/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonSize, ButtonType } from '@components/Button/ButtonTypes';
import { IconSize } from '@foundation/Icon/IconSize';

export const buttonIconSizeMap: Record<ButtonSize, IconSize> = {
    [ButtonSize.Small]: IconSize.Size16,
    [ButtonSize.Medium]: IconSize.Size20,
    [ButtonSize.Large]: IconSize.Size24,
};

export const buttonTypeMap: Record<ButtonType, 'button' | 'submit' | 'reset'> = {
    [ButtonType.Button]: 'button',
    [ButtonType.Submit]: 'submit',
    [ButtonType.Reset]: 'reset',
};
