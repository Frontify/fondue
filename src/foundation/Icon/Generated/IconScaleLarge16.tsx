import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconScaleLarge16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconScaleLarge16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.872 2.2c-.85 0-1.539.689-1.539 1.538v9.231c0 .85.689 1.539 1.539 1.539h10.256c.85 0 1.539-.69 1.539-1.539V3.74c0-.85-.69-1.539-1.539-1.539H2.872Zm7.692 1.026H8.513v10.256h2.051V3.226Zm1.026 10.256h1.538c.283 0 .513-.23.513-.513V3.74a.513.513 0 0 0-.513-.513H11.59v10.256ZM5.949 3.226h1.538v10.256H5.95V3.226Zm-1.026 0H3.897v10.256h1.026V3.226Zm-2.051 0v10.256a.513.513 0 0 1-.513-.513V3.74c0-.284.23-.513.513-.513Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleLarge16);
export default Memo;
