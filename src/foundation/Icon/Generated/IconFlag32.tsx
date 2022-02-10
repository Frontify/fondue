import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFlag32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFlag32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 4.2a1 1 0 1 1 2 0V5h17a1 1 0 0 1 .79 1.614L22.6 12l4.19 5.386A1 1 0 0 1 26 19H9v8.8a1 1 0 1 1-2 0V4.2ZM9 17h14.955l-3.411-4.386a1 1 0 0 1 0-1.228L23.955 7H9v10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFlag32);
export default Memo;
