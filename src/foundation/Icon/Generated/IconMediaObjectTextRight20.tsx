import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextRight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObjectTextRight20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.666 4.792c0 .345.28.625.625.625h5.417a.625.625 0 0 0 0-1.25h-5.416a.625.625 0 0 0-.626.625Zm0 5c0 .345.28.625.625.625h5.417a.625.625 0 0 0 0-1.25h-5.416a.625.625 0 0 0-.626.625Zm0-2.5c0 .345.28.625.625.625h2.917a.625.625 0 0 0 0-1.25h-2.917a.625.625 0 0 0-.625.625Zm0 5c0 .345.28.625.625.625h2.917a.625.625 0 0 0 0-1.25h-2.917a.625.625 0 0 0-.625.625ZM3.333 3.75h5c.23 0 .417.187.417.417v11.666c0 .23-.187.417-.417.417h-5a.417.417 0 0 1-.417-.417V4.167c0-.23.187-.417.417-.417Zm5-1.25c.92 0 1.667.746 1.667 1.667v11.666c0 .92-.746 1.667-1.667 1.667h-5c-.92 0-1.667-.746-1.667-1.667V4.167c0-.92.747-1.667 1.667-1.667h5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextRight20);
export default Memo;
