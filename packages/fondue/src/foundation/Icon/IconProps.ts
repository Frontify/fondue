/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type IconEnum } from './IconEnum';
import { type IconSize } from './IconSize';

export type GeneratedIconProps = {
    size?: IconSize;
    filled?: boolean;
};

export type IconProps = GeneratedIconProps & {
    icon: IconEnum;
};
