import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTypographyMultiple32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTypographyMultiple32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.974 23.077h-3.077V8.718h5.129v2.051h2.05V6.667H2.667v4.102h2.052V8.718h5.128v14.359H6.769v2.051h8.205v-2.051Zm9.231 2.051V14.872h5.128V12.82H17.026v2.05h5.128v10.257h2.051Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTypographyMultiple32);
export default Memo;
