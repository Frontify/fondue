import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlay24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M19.356 11.007a1 1 0 0 1 0 1.736L6.62 20.02a1 1 0 0 1-1.496-.868V4.598A1 1 0 0 1 6.62 3.73l12.735 7.277Z"
            />
        </svg>
    );
}

const Memo = memo(IconPlay24Filled);
export default Memo;
