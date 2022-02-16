import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontal32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconStackHorizontal32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.8 4.334c.847 0 1.533.686 1.533 1.533v20.267c0 .847-.686 1.533-1.533 1.533h-3.6a1.533 1.533 0 0 1-1.534-1.533V5.867c0-.847.687-1.533 1.534-1.533h3.6Zm-.467 2h-2.666v19.333h2.666V6.334Zm-8.186-2c.846 0 1.533.686 1.533 1.533v20.267c0 .847-.687 1.533-1.533 1.533h-3.6a1.533 1.533 0 0 1-1.534-1.533V5.867c0-.847.687-1.533 1.534-1.533h3.6Zm-.467 2H6.013v19.333H8.68V6.334Zm17.774-2c.847 0 1.533.686 1.533 1.533v20.267c0 .847-.686 1.533-1.533 1.533h-3.6a1.533 1.533 0 0 1-1.534-1.533V5.867c0-.847.687-1.533 1.534-1.533h3.6Zm-.467 2h-2.666v19.333h2.666V6.334Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontal32);
export default Memo;
