import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatStrikethrough32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextFormatStrikethrough32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M20.102 24.513h-3.076v-5.255h-2.052v5.255h-3.077v2.051h8.205v-2.051Z" />
                <path
                    fillRule="evenodd"
                    d="M5.667 16a1 1 0 0 1 1-1h18.666a1 1 0 1 1 0 2H6.667a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                />
                <path d="M14.996 12.515h2.007V7.487h6.323v2.051h2.007V5.436H6.667v4.102h2.007v-2.05h6.322v5.027Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatStrikethrough32);
export default Memo;
