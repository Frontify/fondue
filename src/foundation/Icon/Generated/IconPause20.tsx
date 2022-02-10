import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPause20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPause20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.452 3.333c.395 0 .714.332.714.741v11.852c0 .409-.32.74-.714.74H4.881a.728.728 0 0 1-.715-.74V4.074c0-.41.32-.74.715-.74h3.571ZM8.166 4.37h-3v11.26h3V4.37Zm6.953-1.037c.394 0 .714.332.714.741v11.852c0 .409-.32.74-.714.74h-3.572a.728.728 0 0 1-.714-.74V4.074c0-.41.32-.74.714-.74h3.572Zm-.286 1.037h-3v11.26h3V4.37Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPause20);
export default Memo;
