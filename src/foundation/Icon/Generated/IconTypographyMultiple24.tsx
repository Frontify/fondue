import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyMultiple24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTypographyMultiple24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.23 17.308H8.924V6.538h3.846v1.539h1.539V5H2v3.077h1.538V6.538h3.847v10.77H5.077v1.538h6.154v-1.538Zm6.924 1.538v-7.692H22V9.615h-9.23v1.539h3.845v7.692h1.539Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTypographyMultiple24);
export default Memo;
