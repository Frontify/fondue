import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPeople16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPeople16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.377 11.448h3.014a4.597 4.597 0 0 0-2.394-4.508 3.217 3.217 0 1 0-5.239-3.304c.317.012.624.063.919.146a2.298 2.298 0 1 1 2.883 2.954c.083.292.139.597.162.912.118-.034.233-.074.344-.12a3.682 3.682 0 0 1 2.4 3H10.71c.252.283.476.59.667.92Z" />
                <path
                    fillRule="evenodd"
                    d="M2 14.207c0 .155.008.308.023.46h9.15a4.597 4.597 0 0 0-2.394-4.508 3.217 3.217 0 0 0-2.156-5.607 3.217 3.217 0 0 0-2.174 5.59A4.597 4.597 0 0 0 2 14.206Zm4.623-3.218c-.443 0-.865-.09-1.248-.252a3.682 3.682 0 0 0-2.427 3.01h7.3a3.682 3.682 0 0 0-2.4-3 3.204 3.204 0 0 1-1.225.242ZM8.92 7.77a2.298 2.298 0 1 1-2.297-2.299 2.298 2.298 0 0 1 2.297 2.3Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPeople16);
export default Memo;
