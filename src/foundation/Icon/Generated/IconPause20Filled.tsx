import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPause20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPause20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M5 3.333a.833.833 0 0 0-.833.834v11.666c0 .46.373.834.833.834h3.333c.46 0 .833-.373.833-.834V4.167a.833.833 0 0 0-.833-.834H5Zm6.666 0a.833.833 0 0 0-.833.834v11.666c0 .46.373.834.833.834H15c.46 0 .833-.373.833-.834V4.167A.833.833 0 0 0 15 3.333h-3.334Z"
            />
        </svg>
    );
}

const Memo = memo(IconPause20Filled);
export default Memo;
