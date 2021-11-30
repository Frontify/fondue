import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDrops(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconDrops"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.625 8.876a4.376 4.376 0 1 0 8.75 0 4.376 4.376 0 0 0-8.75 0ZM12 3a5.876 5.876 0 1 0 0 11.751A5.876 5.876 0 0 0 12 3ZM18 17.146a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 .75.75ZM16 20.196a.75.75 0 0 1-.75.75h-6.5a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 .75.75Z"
            />
        </svg>
    );
}

const Memo = memo(IconDrops);
export default Memo;
