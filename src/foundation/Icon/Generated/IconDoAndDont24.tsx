import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDont24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDoAndDont24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.78 5.78a.714.714 0 0 0 0 1.01l.708.708-.707.707a.714.714 0 1 0 1.01 1.01l.707-.707.707.707a.714.714 0 1 0 1.01-1.01l-.707-.707.707-.707a.714.714 0 1 0-1.01-1.01l-.707.707-.707-.707a.714.714 0 0 0-1.01 0Z" />
                <path
                    fillRule="evenodd"
                    d="M7.357 12.714A5.357 5.357 0 1 1 7.357 2a5.357 5.357 0 0 1 0 10.714Zm0-1.428a3.929 3.929 0 1 0 0-7.857 3.929 3.929 0 0 0 0 7.857Z"
                    clipRule="evenodd"
                />
                <path d="M19.069 15.059a.714.714 0 0 0-1.01.015l-2 2.063-.524-.593a.714.714 0 0 0-1.07.947l1.036 1.17a.714.714 0 0 0 1.048.023l2.535-2.616a.714.714 0 0 0-.015-1.01Z" />
                <path
                    fillRule="evenodd"
                    d="M11.286 16.643a5.357 5.357 0 1 0 10.714 0 5.357 5.357 0 0 0-10.714 0Zm5.357 3.928a3.929 3.929 0 1 0 0-7.857 3.929 3.929 0 0 0 0 7.857Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDont24);
export default Memo;
