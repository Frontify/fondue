import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObject32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMediaObject32"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M15.445 5.333H6.926A4.263 4.263 0 0 0 2.666 9.6v12.8a4.263 4.263 0 0 0 4.26 4.267h8.52c2.352 0 4.26-1.91 4.26-4.267V9.6a4.263 4.263 0 0 0-4.26-4.267ZM4.796 9.6c0-1.178.954-2.133 2.13-2.133h8.52c1.176 0 2.13.955 2.13 2.133v12.8a2.132 2.132 0 0 1-2.13 2.133h-8.52a2.132 2.132 0 0 1-2.13-2.133V9.6Z"
                    clipRule="evenodd"
                />
                <path d="M22.367 10.667a1.066 1.066 0 0 1 0-2.134h5.901a1.066 1.066 0 0 1 0 2.134h-5.9Zm-1.064 3.2c0 .589.476 1.066 1.064 1.066h3.771a1.066 1.066 0 0 0 0-2.133h-3.77c-.589 0-1.065.477-1.065 1.067Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMediaObject32);
export default Memo;
