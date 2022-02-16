import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlay32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlay32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24.697 17.121c.2-.115.364-.285.476-.49a1.308 1.308 0 0 0-.476-1.753L8.526 5.498a1.218 1.218 0 0 0-.612-.165c-.689 0-1.247.576-1.247 1.287v18.76c0 .22.055.438.16.63.338.62 1.098.84 1.699.491l16.17-9.38ZM8.413 7.5 23.068 16 8.413 24.5v-17Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPlay32);
export default Memo;
