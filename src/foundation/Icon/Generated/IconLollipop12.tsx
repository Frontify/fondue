import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLollipop12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLollipop12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M4.625 4v3.5a.375.375 0 1 0 .75 0V4a.375.375 0 1 0-.75 0Zm2 3.5V4a.375.375 0 1 1 .75 0v3.5a.375.375 0 1 1-.75 0Z" />
                <path
                    fillRule="evenodd"
                    d="M6 1a3.5 3.5 0 0 1 3.5 3.5v3.276a1.5 1.5 0 0 1-1.5 1.5h-.75v.474a1.25 1.25 0 1 1-2.5 0v-.474H4a1.5 1.5 0 0 1-1.5-1.5V4.5A3.5 3.5 0 0 1 6 1Zm-.5 8.276v.474a.5.5 0 0 0 1 0v-.474h-1ZM6 1.75A2.75 2.75 0 0 0 3.25 4.5v3.276c0 .414.336.75.75.75h4a.75.75 0 0 0 .75-.75V4.5A2.75 2.75 0 0 0 6 1.75Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLollipop12);
export default Memo;
