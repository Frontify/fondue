import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypography16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTypography16"
            {...props}
        >
            <g fill="none">
                <path
                    fill="currentColor"
                    d="M8.501 3.744v5.885h.012v2.628h1.538v1.025H5.948v-1.025h1.539V9.629h.01V3.744h-3.16v1.025H3.333V2.718h9.333v2.051h-1.003V3.744H8.5Z"
                />
                <path
                    stroke="currentColor"
                    d="M8.501 3.744v5.885h.012v2.628h1.538v1.025H5.948v-1.025h1.539V9.629h.01V3.744h-3.16v1.025H3.333V2.718h9.333v2.051h-1.003V3.744H8.5Z"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypography16);
export default Memo;
