import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatStrikethrough24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextFormatStrikethrough24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M15.077 18.385h-2.308v-3.942h-1.538v3.942H8.923v1.538h6.154v-1.538Z" />
                <path
                    fillRule="evenodd"
                    d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                />
                <path d="M11.247 9.386h1.506v-3.77h4.742v1.538H19V4.077H5v3.077h1.505V5.615h4.742v3.771Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatStrikethrough24);
export default Memo;
