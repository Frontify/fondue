import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPills24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPills24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 10H3a1.5 1.5 0 0 0-1.5 1.5V13A1.5 1.5 0 0 0 3 14.5h3A1.5 1.5 0 0 0 7.5 13v-1.5A1.5 1.5 0 0 0 6 10Zm-3 3v-1.5h3V13H3Zm7.5-1.5V13h3v-1.5h-3Zm3-1.5h-3A1.5 1.5 0 0 0 9 11.5V13a1.5 1.5 0 0 0 1.5 1.5h3A1.5 1.5 0 0 0 15 13v-1.5a1.5 1.5 0 0 0-1.5-1.5Zm4.5 1.5V13h3v-1.5h-3Zm3-1.5h-3a1.5 1.5 0 0 0-1.5 1.5V13a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-1.5A1.5 1.5 0 0 0 21 10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPills24);
export default Memo;
