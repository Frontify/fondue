import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTriangle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTriangle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.848 12.858h8.304L8 4.554l-4.152 8.304ZM14 14H2L8 2l6 12Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTriangle16);
export default Memo;
