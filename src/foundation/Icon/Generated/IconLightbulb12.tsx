import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightbulb12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLightbulb12"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M2.825 4.25a3.175 3.175 0 1 1 5.1 2.525V7.5c0 .787-.638 1.425-1.425 1.425h-1A1.425 1.425 0 0 1 4.075 7.5v-.725a3.17 3.17 0 0 1-1.25-2.525Zm2.1 3.25c0 .318.258.575.575.575h1a.575.575 0 0 0 .575-.575V6.325l.193-.126a2.325 2.325 0 1 0-2.536 0l.193.126V7.5Z"
                    clipRule="evenodd"
                />
                <path d="M7.425 10c0 .235-.19.425-.425.425H5a.425.425 0 0 1 0-.85h2c.235 0 .425.19.425.425Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLightbulb12);
export default Memo;
