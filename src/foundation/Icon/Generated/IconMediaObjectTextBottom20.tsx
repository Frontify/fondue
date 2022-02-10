import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextBottom20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObjectTextBottom20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15 13.962a.625.625 0 0 0-.625-.625h-8.75a.625.625 0 1 0 0 1.25h8.75c.345 0 .625-.28.625-.625Zm-.833 2.536c0 .345-.28.625-.625.625H6.458a.625.625 0 1 1 0-1.25h7.084c.345 0 .625.28.625.625ZM16.25 5v5c0 .23-.186.417-.417.417H4.167A.417.417 0 0 1 3.75 10V5c0-.23.187-.417.417-.417h11.666c.23 0 .417.187.417.417Zm1.25 5c0 .92-.746 1.667-1.667 1.667H4.167c-.92 0-1.667-.747-1.667-1.667V5c0-.92.746-1.667 1.667-1.667h11.666c.92 0 1.667.746 1.667 1.667v5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextBottom20);
export default Memo;
