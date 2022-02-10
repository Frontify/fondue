import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypography20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTypography20"
            {...props}
        >
            <g fill="none">
                <path
                    fill="currentColor"
                    d="M10.627 4.68v7.356h.014v3.285h1.923v1.282H7.436V15.32h1.923v-3.285h.014V4.68H5.42v1.282H4.166V3.397h11.667v2.565H14.58V4.68h-3.952Z"
                />
                <path
                    stroke="currentColor"
                    d="M10.627 4.68v7.356h.014v3.285h1.923v1.282H7.436V15.32h1.923v-3.285h.014V4.68H5.42v1.282H4.166V3.397h11.667v2.565H14.58V4.68h-3.952Z"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypography20);
export default Memo;
