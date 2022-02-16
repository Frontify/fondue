import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypography24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTypography24"
            {...props}
        >
            <g fill="none">
                <path
                    fill="currentColor"
                    d="M12.753 5.615v8.828h.016v3.942h2.308v1.538H8.923v-1.538h2.308v-3.942h.016V5.615H6.505v1.539H5V4.077h14v3.077h-1.505V5.615h-4.742Z"
                />
                <path
                    stroke="currentColor"
                    d="M12.753 5.615v8.828h.016v3.942h2.308v1.538H8.923v-1.538h2.308v-3.942h.016V5.615H6.505v1.539H5V4.077h14v3.077h-1.505V5.615h-4.742Z"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypography24);
export default Memo;
