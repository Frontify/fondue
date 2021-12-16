import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStrikethrough(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconStrikethrough"
            {...props}
        >
            <path d="M11.577 14.929H9.269v-3.941H7.731v3.94H5.423v1.54h6.154v-1.54Z" fill="#2D3232" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.75 8.544a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5h-14a.75.75 0 0 1-.75-.75Z"
                fill="#2D3232"
            />
            <path d="M7.747 5.93h1.506V2.16h4.742v1.538H15.5V.621h-14v3.077h1.505V2.16h4.742v3.77Z" fill="#2D3232" />
        </svg>
    );
}

const Memo = memo(IconStrikethrough);
export default Memo;
