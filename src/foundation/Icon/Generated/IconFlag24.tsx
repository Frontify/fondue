import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFlag24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFlag24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.25 3.15a.75.75 0 0 1 1.5 0v.6H19.5a.75.75 0 0 1 .592 1.21L16.95 9l3.142 4.04a.75.75 0 0 1-.592 1.21H6.75v6.6a.75.75 0 0 1-1.5 0V3.15Zm1.5 9.6h11.216l-2.558-3.29a.75.75 0 0 1 0-.92l2.559-3.29H6.75v7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFlag24);
export default Memo;
