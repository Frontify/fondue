import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeading12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHeading12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M5 7.166h-.898V5.423H2.398v1.743H1.5V3h.898v1.666h1.704V3H5v4.166ZM1.417 8.832a.417.417 0 0 1 0-.833h9.166a.417.417 0 1 1 0 .833H1.417ZM6.98 7.166h.87V3h-.87L6 3.699v.827l.937-.662h.043v3.302Z"
            />
        </svg>
    );
}

const Memo = memo(IconHeading12);
export default Memo;
