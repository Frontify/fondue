import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatUnderline16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextFormatUnderline16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8.513 9.65h1.538v1.026H5.95V9.651h1.538l.01-5.934H4.935v1.025H3.908v-2.05h8.205v2.05h-1.025V3.717H8.523l-.01 5.934Z" />
                <path
                    fillRule="evenodd"
                    d="M2.833 12.782a.5.5 0 0 1 .5-.5h9.334a.5.5 0 1 1 0 1H3.333a.5.5 0 0 1-.5-.5Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextFormatUnderline16);
export default Memo;
