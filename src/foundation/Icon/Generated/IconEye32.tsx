import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconEye32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconEye32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M21.333 16a5.333 5.333 0 1 1-10.451-1.505c.161-.551.809-.735 1.306-.448.463.267.62.849.528 1.375a3.333 3.333 0 1 0 2.31-2.61c-.369.112-.774.117-1.108-.076-.672-.388-.745-1.326-.033-1.634A5.333 5.333 0 0 1 21.333 16Z" />
                <path
                    fillRule="evenodd"
                    d="M30.301 15.03a2.253 2.253 0 0 1 0 1.94C27.757 22.31 22.31 26 16 26c-6.31 0-11.757-3.69-14.302-9.03a2.253 2.253 0 0 1 0-1.94C4.243 9.69 9.69 6 16 6s11.757 3.69 14.3 9.03ZM4.027 17.1a2.192 2.192 0 0 1 0-2.2A13.829 13.829 0 0 1 16 8c5.11 0 9.577 2.772 11.973 6.9a2.19 2.19 0 0 1 0 2.2A13.829 13.829 0 0 1 16 24c-5.11 0-9.578-2.772-11.973-6.9Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconEye32);
export default Memo;
