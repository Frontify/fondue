/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum IconSize {
    Size8 = "Size8",
    Size12 = "Size12",
    Size16 = "Size16",
    Size20 = "Size20",
    Size24 = "Size24",
    Size32 = "Size32",
}

export type IconProps = {
    size?: IconSize;
} & React.SVGProps<SVGSVGElement>;

interface Icon extends React.FC<IconProps> {
    size?: IconSize;
}

export default Icon;
