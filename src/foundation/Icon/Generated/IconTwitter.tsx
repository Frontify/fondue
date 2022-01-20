import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTwitter(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTwitter"
            {...props}
        >
            <path
                d="M16 3.038a6.554 6.554 0 0 1-1.885.517 3.288 3.288 0 0 0 1.443-1.816 6.576 6.576 0 0 1-2.085.797A3.285 3.285 0 0 0 7.88 5.529a9.319 9.319 0 0 1-6.765-3.43 3.287 3.287 0 0 0 1.015 4.383 3.269 3.269 0 0 1-1.486-.41c-.036 1.52 1.054 2.943 2.633 3.26a3.29 3.29 0 0 1-1.483.056 3.285 3.285 0 0 0 3.067 2.279A6.6 6.6 0 0 1 0 13.027a9.292 9.292 0 0 0 5.032 1.475c6.095 0 9.538-5.148 9.33-9.764A6.684 6.684 0 0 0 16 3.038Z"
                fill="#000"
            />
        </svg>
    );
}

const Memo = memo(IconTwitter);
export default Memo;
