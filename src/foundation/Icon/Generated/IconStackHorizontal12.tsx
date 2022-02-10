import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontal12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStackHorizontal12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.675 1.625c.317 0 .575.257.575.575v7.6a.575.575 0 0 1-.575.575h-1.35A.575.575 0 0 1 4.75 9.8V2.2c0-.318.257-.575.575-.575h1.35Zm-.175.75h-1v7.25h1v-7.25Zm-3.07-.75c.317 0 .575.257.575.575v7.6a.575.575 0 0 1-.575.575H2.08a.575.575 0 0 1-.575-.575V2.2c0-.318.257-.575.575-.575h1.35Zm-.175.75h-1v7.25h1v-7.25Zm6.665-.75c.318 0 .575.257.575.575v7.6a.575.575 0 0 1-.575.575H8.57a.575.575 0 0 1-.575-.575V2.2c0-.318.258-.575.575-.575h1.35Zm-.175.75h-1v7.25h1v-7.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontal12);
export default Memo;
