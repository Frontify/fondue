import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockClosed32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLockClosed32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22.711 9.333a6.667 6.667 0 0 0-13.333 0v2.223H8.267a3.333 3.333 0 0 0-3.333 3.333V26a3.333 3.333 0 0 0 3.333 3.333h15.556A3.333 3.333 0 0 0 27.156 26V14.889a3.333 3.333 0 0 0-3.333-3.333H22.71V9.332ZM8.267 13.778a1.11 1.11 0 0 0-1.111 1.11V26a1.11 1.11 0 0 0 1.11 1.111h15.557A1.11 1.11 0 0 0 24.933 26V14.889a1.11 1.11 0 0 0-1.11-1.111H8.267Zm12.222-2.223V9.334a4.444 4.444 0 1 0-8.889 0v2.223h8.89Zm-6.667 7.778a2.22 2.22 0 0 0 1.112 1.925v1.409a1.111 1.111 0 1 0 2.222 0v-1.409a2.221 2.221 0 0 0-1.111-4.147 2.222 2.222 0 0 0-2.223 2.222Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockClosed32);
export default Memo;
