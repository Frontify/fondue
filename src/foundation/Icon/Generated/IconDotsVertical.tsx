import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDotsVertical(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconDotsVertical"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.5 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 5.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm1.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDotsVertical);
export default Memo;
