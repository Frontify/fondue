import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypography32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTypography32"
            {...props}
        >
            <g fill="none">
                <path
                    fill="currentColor"
                    d="M17.003 7.487v11.77h.023v5.256h3.076v2.051h-8.205v-2.051h3.077v-5.255h.022V7.488H8.674v2.05H6.667V5.436h18.666v4.102h-2.007v-2.05h-6.323Z"
                />
                <path
                    stroke="currentColor"
                    d="M17.003 7.487v11.77h.023v5.256h3.076v2.051h-8.205v-2.051h3.077v-5.255h.022V7.488H8.674v2.05H6.667V5.436h18.666v4.102h-2.007v-2.05h-6.323Z"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypography32);
export default Memo;
