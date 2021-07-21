/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum IconSize {
    Size13 = "iconSize13",
    Size16 = "iconSize16",
    Size20 = "iconSize20",
    Size24 = "iconSize24",
    Size32 = "iconSize32",
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: IconSize;
}

interface Icon extends React.FC<IconProps> {
    size?: IconSize;
}

export default Icon;
