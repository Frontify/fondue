import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTypographyMultiple16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTypographyMultiple16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.487 11.538H5.948v-7.18h2.564v1.027h1.026V3.333H1.333v2.052h1.026V4.359h2.564v7.18H3.384v1.025h4.103v-1.026Zm4.615 1.026V7.436h2.564V6.41H8.512v1.026h2.565v5.128h1.025Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTypographyMultiple16);
export default Memo;
