import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextFormatUnderline32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextFormatUnderline32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M17.026 19.302h3.076v2.05h-8.205v-2.05h3.077l.021-11.868H9.867v2.051H7.816V5.383h16.41v4.102h-2.051V7.434h-5.129l-.02 11.868Z" />
                <path
                    fillRule="evenodd"
                    d="M5.667 25.564a1 1 0 0 1 1-1h18.666a1 1 0 1 1 0 2H6.667a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatUnderline32);
export default Memo;
