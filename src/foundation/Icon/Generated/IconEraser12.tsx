import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEraser12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconEraser12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M1.853 6.758a1 1 0 0 0 0 1.415L3.86 10.18a1 1 0 0 0 1.415 0l5.197-5.198-3.42-3.421-5.199 5.197Zm1.419-.357 2.36 2.36-.888.888a.25.25 0 0 1-.353 0L2.384 7.642a.25.25 0 0 1 0-.353l.888-.888Zm.53-.53.915.914 3.25-3.249-.916-.915-3.249 3.25Zm1.446 1.445.915.915 3.249-3.25-.915-.914-3.25 3.249Z"
                    clipRule="evenodd"
                />
                <path d="M6.785 9.725a.375.375 0 1 0 0 .75h2.548a.375.375 0 1 0 0-.75H6.785Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconEraser12);
export default Memo;
