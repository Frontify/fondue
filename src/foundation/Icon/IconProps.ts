/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from "./IconsMap";
import { IconSize } from "./IconSize";

export type GeneratedIconProps = {
    size?: IconSize | string;
};

export type IconProps = GeneratedIconProps & {
    icon: IconEnum;
};
