import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDont12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDoAndDont12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M2.89 2.89a.357.357 0 0 0 0 .505l.354.354-.354.353a.357.357 0 0 0 .505.506l.354-.354.353.354a.357.357 0 0 0 .506-.505l-.354-.354.354-.354a.357.357 0 1 0-.506-.505l-.353.354-.354-.354a.357.357 0 0 0-.505 0Z" />
                <path
                    fillRule="evenodd"
                    d="M3.679 6.357a2.679 2.679 0 1 1 0-5.357 2.679 2.679 0 0 1 0 5.357Zm0-.714a1.964 1.964 0 1 0 0-3.929 1.964 1.964 0 0 0 0 3.929Z"
                    clipRule="evenodd"
                />
                <path d="M9.534 7.53a.357.357 0 0 0-.505.007l-1 1.031-.262-.296a.357.357 0 0 0-.534.473l.518.585a.357.357 0 0 0 .524.012l1.267-1.308a.357.357 0 0 0-.008-.505Z" />
                <path
                    fillRule="evenodd"
                    d="M5.643 8.321a2.679 2.679 0 1 0 5.357 0 2.679 2.679 0 0 0-5.357 0Zm2.678 1.965a1.964 1.964 0 1 0 0-3.929 1.964 1.964 0 0 0 0 3.929Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDont12);
export default Memo;
