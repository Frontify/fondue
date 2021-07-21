/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum IconSize {
    Size13 = "iconSize13",
    Size16 = "iconSize16",
    Size20 = "iconSize20",
    Size24 = "iconSize24",
    Size32 = "iconSize32",
}

export type IconProps = {
    size?: IconSize;
} & React.SVGProps<SVGSVGElement>;

interface Icon extends React.FC<IconProps> {
    size?: IconSize;
}

export default Icon;
