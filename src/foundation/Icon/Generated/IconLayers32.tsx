import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayers32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLayers32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M27.889 10.159 16.537 4.133a1.132 1.132 0 0 0-1.064 0L4.116 10.157a1.206 1.206 0 0 0 .014 2.123l11.378 5.832c.327.168.711.167 1.038 0l11.33-5.83a1.207 1.207 0 0 0 .013-2.122Zm-11.864 5.556L7.21 11.197l8.795-4.666 8.796 4.67-8.775 4.514Z"
                    clipRule="evenodd"
                />
                <path d="M3.306 16.822a1.206 1.206 0 0 1-.515-1.599 1.145 1.145 0 0 1 1.556-.529L16 20.713l11.653-6.019a1.145 1.145 0 0 1 1.557.53 1.206 1.206 0 0 1-.515 1.598l-12.162 6.281a1.126 1.126 0 0 1-1.066 0l-12.161-6.28Z" />
                <path d="M3.306 21.585a1.206 1.206 0 0 1-.515-1.598 1.145 1.145 0 0 1 1.556-.53L16 25.478l11.653-6.02a1.145 1.145 0 0 1 1.557.53 1.206 1.206 0 0 1-.515 1.598l-12.162 6.281a1.127 1.127 0 0 1-1.066 0l-12.161-6.28Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLayers32);
export default Memo;
