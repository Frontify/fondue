import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPen12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPen12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.784 9.733a.375.375 0 0 0 0 .75h2.549a.375.375 0 0 0 0-.75H6.784Z" />
                <path
                    fillRule="evenodd"
                    d="M7.793 1.633a.875.875 0 0 1 1.237 0l1.31 1.309a.875.875 0 0 1 0 1.237l-6.3 6.299H1.495V7.93l6.298-6.298Zm.707.53a.125.125 0 0 0-.177 0L2.245 8.242v1.486H3.73l6.08-6.079a.125.125 0 0 0 0-.177L8.5 2.163Z"
                    clipRule="evenodd"
                />
                <path d="M2.002 9h1v1h-1V9Z" />
                <path
                    fillRule="evenodd"
                    d="M8.596 5.204 6.788 3.397l.53-.53 1.808 1.807-.53.53Zm-2.951 4.904c0-.207.168-.375.375-.375h3.313a.375.375 0 0 1 0 .75H6.02a.375.375 0 0 1-.375-.375Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPen12);
export default Memo;
