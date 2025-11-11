/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type IconEnum } from './IconEnum';
import { type IconSize } from './IconSize';

/**
 * @deprecated Use icons from `@frontify/fondue/icons` instead.
 */
export type GeneratedIconProps = {
    size?: IconSize;
    filled?: boolean;
};

/**
 * @deprecated Use icons from `@frontify/fondue/icons` instead.
 */
export type IconProps = GeneratedIconProps & {
    icon: IconEnum;
};
