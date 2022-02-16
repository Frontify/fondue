import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTriangle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTriangle12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.886 9.643h6.228L6 3.415 2.886 9.643Zm7.614.857h-9l4.5-9 4.5 9Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTriangle12);
export default Memo;
