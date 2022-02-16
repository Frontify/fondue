import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLayers24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLayers24"
            {...props}
        >
            <g fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M20.917 7.62 12.403 3.1a.85.85 0 0 0-.799 0L3.087 7.618a.904.904 0 0 0 .01 1.593l8.534 4.373a.85.85 0 0 0 .778 0l8.498-4.373a.905.905 0 0 0 .01-1.592Zm-8.898 4.167-6.612-3.39 6.596-3.499L18.6 8.4l-6.581 3.387Z"
                    clipRule="evenodd"
                />
                <path d="M2.48 12.617a.905.905 0 0 1-.387-1.2.859.859 0 0 1 1.167-.396L12 15.535l8.74-4.514a.859.859 0 0 1 1.167.397.904.904 0 0 1-.386 1.199l-9.121 4.71a.854.854 0 0 1-.8 0l-9.12-4.71Z" />
                <path d="M2.48 16.19a.905.905 0 0 1-.387-1.2.859.859 0 0 1 1.167-.397L12 19.107l8.74-4.514a.859.859 0 0 1 1.167.397.905.905 0 0 1-.386 1.2L12.4 20.9a.851.851 0 0 1-.8 0l-9.12-4.71Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconLayers24);
export default Memo;
