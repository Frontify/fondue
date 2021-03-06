import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconBuilder(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconBuilder"
            {...props}
        >
            <path d="M8.65 11.807 6.472 9.592l1.088-1.108 3.265 3.323L7.56 15.11l-1.088-1.107 2.176-2.197ZM2 5.355c0-.656.225-1.212.674-1.67C3.123 3.23 3.67 3 4.314 3h15.372c.633 0 1.177.229 1.632.686.455.457.682 1.013.682 1.67v13.289c0 .656-.227 1.212-.682 1.67a2.222 2.222 0 0 1-1.632.685H4.314a2.213 2.213 0 0 1-1.64-.686A2.293 2.293 0 0 1 2 18.644V5.356Zm1.537.774V17.87c0 .434.15.803.45 1.108.299.304.661.457 1.087.457h13.852c.426 0 .788-.153 1.088-.457.3-.305.449-.674.449-1.108V6.13c0-.434-.15-.803-.45-1.108a1.469 1.469 0 0 0-1.087-.457H5.074c-.426 0-.788.153-1.088.457-.3.305-.449.674-.449 1.108ZM12 14.742v-1.564h5.371v1.564H12Z" />
        </svg>
    );
}

const Memo = memo(IconBuilder);
export default Memo;
