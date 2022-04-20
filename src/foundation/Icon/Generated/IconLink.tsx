import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLink(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconLink"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 12a4.75 4.75 0 0 1 4.75-4.75h2a.75.75 0 0 1 0 1.5h-2a3.25 3.25 0 0 0 0 6.5h2a.75.75 0 0 1 0 1.5h-2A4.75 4.75 0 0 1 2 12Zm20 0a4.75 4.75 0 0 1-4.75 4.75h-2a.75.75 0 0 1 0-1.5h2a3.25 3.25 0 0 0 0-6.5h-2a.75.75 0 0 1 0-1.5h2A4.75 4.75 0 0 1 22 12Zm-13.75-.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLink);
export default Memo;
