import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCross24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCross24"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m11.647 13.06 5.303 5.304a.75.75 0 0 0 1.06-1.06L12.708 12l5.304-5.303a.75.75 0 0 0-1.06-1.061l-5.304 5.303-4.95-4.95a.75.75 0 0 0-1.06 1.061l4.95 4.95-4.95 4.95a.75.75 0 0 0 1.06 1.06l4.95-4.95Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h24v24H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

const Memo = memo(IconCross24);
export default Memo;
