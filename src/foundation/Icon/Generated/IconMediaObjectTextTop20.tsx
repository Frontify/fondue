import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextTop20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObjectTextTop20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 3.545c0 .345.28.625.625.625h8.75a.625.625 0 1 0 0-1.25h-8.75A.625.625 0 0 0 5 3.545Zm.833 2.503c0-.345.28-.625.625-.625h7.084a.625.625 0 0 1 0 1.25H6.458a.625.625 0 0 1-.625-.625ZM3.75 15v-5c0-.23.187-.417.417-.417h11.666c.23 0 .417.187.417.417v5c0 .23-.186.417-.417.417H4.167A.417.417 0 0 1 3.75 15ZM2.5 10c0-.92.746-1.667 1.667-1.667h11.666c.92 0 1.667.747 1.667 1.667v5c0 .92-.746 1.667-1.667 1.667H4.167c-.92 0-1.667-.747-1.667-1.667v-5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextTop20);
export default Memo;
