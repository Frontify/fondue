import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTriangle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTriangle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.696 25.716h16.608L16 9.108 7.696 25.716ZM28 28H4L16 4l12 24Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTriangle32);
export default Memo;
