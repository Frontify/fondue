/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from "./IconEnum";
import { IconSize } from "./IconSize";

export type GeneratedIconProps = {
    size?: IconSize;
};

export type IconProps = GeneratedIconProps & {
    icon: IconEnum;
};
