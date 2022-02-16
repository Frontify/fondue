import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatUnderline24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextFormatUnderline24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.77 14.476h2.307v1.539H8.923v-1.539h2.308l.015-8.9H7.4v1.538H5.862V4.037h12.307v3.077h-1.538V5.575h-3.846l-.016 8.901Z" />
                <path
                    fillRule="evenodd"
                    d="M4.25 19.173a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatUnderline24);
export default Memo;
