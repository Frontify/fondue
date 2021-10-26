import React from "react";
import { IconProps } from "src/foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "src/foundation/Icon/IconSize";

function IconImageTextRatio75(props: IconProps): React.ReactElement<IconProps> {
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
                d="M5.4 5.5H3.6a.1.1 0 00-.1.1v12.8a.1.1 0 00.1.1h1.8a.1.1 0 00.1-.1V5.6a.1.1 0 00-.1-.1zM3.6 4A1.6 1.6 0 002 5.6v12.8A1.6 1.6 0 003.6 20h1.8A1.6 1.6 0 007 18.4V5.6A1.6 1.6 0 005.4 4H3.6zM22 5.75a.75.75 0 01-.75.75H9.75a.75.75 0 010-1.5h11.5a.75.75 0 01.75.75zM22 11.75a.75.75 0 01-.75.75H9.75a.75.75 0 010-1.5h11.5a.75.75 0 01.75.75zM19 8.75a.75.75 0 01-.75.75h-8.5a.75.75 0 010-1.5h8.5a.75.75 0 01.75.75zM19 14.75a.75.75 0 01-.75.75h-8.5a.75.75 0 010-1.5h8.5a.75.75 0 01.75.75z"
            />
        </svg>
    );
}

const MemoIconImageTextRatio75 = React.memo(IconImageTextRatio75);
export default MemoIconImageTextRatio75;
