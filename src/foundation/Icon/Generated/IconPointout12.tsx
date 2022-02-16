import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPointout12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPointout12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.25 7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm0-1a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                <path d="M9.5 1.5h-7A1.5 1.5 0 0 0 1 3v6a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 11 9V3a1.5 1.5 0 0 0-1.5-1.5ZM2 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-7A.5.5 0 0 1 2 9V3Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPointout12);
export default Memo;
