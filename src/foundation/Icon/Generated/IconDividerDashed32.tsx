import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDividerDashed32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDividerDashed32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24 27c.184 0 .334-.15.334-.333v-5.334a1 1 0 1 1 2 0v5.334A2.333 2.333 0 0 1 24 29H8a2.333 2.333 0 0 1-2.333-2.333v-5.334a1 1 0 1 1 2 0v5.334c0 .184.15.333.333.333h16Zm0-22c.184 0 .334.15.334.333v5.334a1 1 0 1 0 2 0V5.333A2.333 2.333 0 0 0 24 3H8a2.333 2.333 0 0 0-2.333 2.333v5.334a1 1 0 1 0 2 0V5.333C7.667 5.15 7.817 5 8 5h16Zm2.667 11.063a1 1 0 0 1-1 1H23.25a1 1 0 1 1 0-2h2.417a1 1 0 0 1 1 1Zm-7.25 0a1 1 0 0 1-1 1h-4.834a1 1 0 1 1 0-2h4.834a1 1 0 0 1 1 1Zm-9.667 0a1 1 0 0 1-1 1H6.333a1 1 0 1 1 0-2H8.75a1 1 0 0 1 1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDividerDashed32);
export default Memo;
