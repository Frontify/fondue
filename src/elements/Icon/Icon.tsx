/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum IconSize {
    Size12 = "h-3 w-3",
    Size16 = "h-4 w-4",
    Size20 = "h-5 w-5",
    Size24 = "h-6 w-6",
    Size32 = "h-8 w-8",
}

export type IconProps = {
    size?: IconSize;
} & React.SVGProps<SVGSVGElement>;

interface Icon extends React.FC<IconProps> {
    size?: IconSize;
}

export default Icon;
