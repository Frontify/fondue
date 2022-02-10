import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontalAltTwo32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStackHorizontalAltTwo32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 9.333h5.555a3.333 3.333 0 0 1 3.334 3.334v6.666a3.333 3.333 0 0 1-3.334 3.334H6a3.333 3.333 0 0 1-3.333-3.334v-6.666A3.333 3.333 0 0 1 6 9.333Zm0 2.223a1.11 1.11 0 0 0-1.111 1.11v6.667a1.11 1.11 0 0 0 1.11 1.111h5.556a1.11 1.11 0 0 0 1.111-1.11v-6.667a1.11 1.11 0 0 0-1.11-1.111H6Zm14.444-2.223H26a3.333 3.333 0 0 1 3.333 3.334v6.666A3.333 3.333 0 0 1 26 22.667h-5.556a3.333 3.333 0 0 1-3.333-3.334v-6.666a3.333 3.333 0 0 1 3.333-3.334Zm0 2.223a1.11 1.11 0 0 0-1.11 1.11v6.667a1.11 1.11 0 0 0 1.11 1.111H26a1.11 1.11 0 0 0 1.111-1.11v-6.667c0-.614-.498-1.111-1.111-1.111h-5.556Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontalAltTwo32);
export default Memo;
