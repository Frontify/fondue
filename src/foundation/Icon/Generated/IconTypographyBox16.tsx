import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTypographyBox16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTypographyBox16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.487 6.525v3.657h-.892v1.026h2.81v-1.026h-.893V6.525h1.306v.67h1.026V5.5H5.156v1.694H6.18v-.669h1.306Z" />
                <path
                    fillRule="evenodd"
                    d="M13.128 2.2H2.87c-.85 0-1.538.689-1.538 1.538v9.231c0 .85.689 1.539 1.538 1.539h10.257c.85 0 1.538-.69 1.538-1.539V3.74c0-.85-.688-1.539-1.538-1.539ZM2.358 3.738c0-.283.23-.512.513-.512h10.257c.283 0 .513.23.513.512v9.231c0 .283-.23.513-.513.513H2.87a.513.513 0 0 1-.512-.513V3.74Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyBox16);
export default Memo;
