import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyBox32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTypographyBox32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M14.974 13.051v7.313H13.19v2.052h5.62v-2.052h-1.785v-7.313h2.611v1.338h2.052v-3.39H10.312v3.39h2.052v-1.338h2.61Z" />
                <path
                    fillRule="evenodd"
                    d="M26.256 4.4H5.743a3.077 3.077 0 0 0-3.077 3.077V25.94a3.077 3.077 0 0 0 3.077 3.076h20.513c1.7 0 3.077-1.377 3.077-3.076V7.477c0-1.7-1.377-3.077-3.077-3.077ZM4.718 7.477c0-.566.459-1.026 1.025-1.026h20.513c.567 0 1.026.46 1.026 1.026V25.94c0 .566-.46 1.025-1.026 1.025H5.743a1.025 1.025 0 0 1-1.025-1.025V7.477Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyBox32);
export default Memo;
