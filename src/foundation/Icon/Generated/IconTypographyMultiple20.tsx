import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyMultiple20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTypographyMultiple20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.359 14.423H7.436V5.45h3.205v1.28h1.282V4.167H1.667V6.73h1.282V5.449h3.205v8.974H4.23v1.282h5.128v-1.282Zm5.769 1.282v-6.41h3.205V8.013h-7.692v1.282h3.205v6.41h1.282Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTypographyMultiple20);
export default Memo;
