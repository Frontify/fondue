import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageTextRatio75(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconImageTextRatio75"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.4 5.5H3.6a.1.1 0 0 0-.1.1v12.8a.1.1 0 0 0 .1.1h1.8a.1.1 0 0 0 .1-.1V5.6a.1.1 0 0 0-.1-.1ZM3.6 4A1.6 1.6 0 0 0 2 5.6v12.8A1.6 1.6 0 0 0 3.6 20h1.8A1.6 1.6 0 0 0 7 18.4V5.6A1.6 1.6 0 0 0 5.4 4H3.6ZM22 5.75a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1 0-1.5h11.5a.75.75 0 0 1 .75.75ZM22 11.75a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1 0-1.5h11.5a.75.75 0 0 1 .75.75ZM19 8.75a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 .75.75ZM19 14.75a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 .75.75Z"
            />
        </svg>
    );
}

const Memo = memo(IconImageTextRatio75);
export default Memo;
