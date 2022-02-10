import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDontBox24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDoAndDontBox24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M19.294 15.592a.66.66 0 0 0-.932.015l-1.845 1.904-.485-.547a.66.66 0 1 0-.987.874l.956 1.08a.66.66 0 0 0 .967.021l2.34-2.414a.66.66 0 0 0-.014-.932ZM5.49 5.49a.66.66 0 0 0 0 .932l.653.653-.653.653a.66.66 0 1 0 .932.932l.653-.653.653.653a.66.66 0 1 0 .932-.932l-.653-.653.653-.653a.66.66 0 0 0-.932-.932l-.653.653-.653-.653a.66.66 0 0 0-.932 0Z" />
                <path
                    fillRule="evenodd"
                    d="M11.129 4.308a4.945 4.945 0 1 0-7.46 6.342v7.12c0 .53.188.983.564 1.359.375.375.828.563 1.36.563h7.278a4.945 4.945 0 1 0 7.46-6.342V6.23c0-.53-.188-.983-.564-1.359a1.853 1.853 0 0 0-1.36-.563H11.13Zm-6.075 7.208a4.945 4.945 0 0 0 6.676-5.823h6.678c.163 0 .264.041.38.157a.475.475 0 0 1 .158.38v6.255a4.945 4.945 0 0 0-6.676 5.823H5.592a.475.475 0 0 1-.38-.158.475.475 0 0 1-.158-.38v-6.254Zm12.001 9.165a3.626 3.626 0 1 0 0-7.252 3.626 3.626 0 0 0 0 7.252Zm-10.11-10.11a3.626 3.626 0 1 0 0-7.252 3.626 3.626 0 0 0 0 7.252Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDontBox24);
export default Memo;
