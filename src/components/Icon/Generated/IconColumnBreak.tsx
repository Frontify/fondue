import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconColumnBreak(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconColumnBreak"
            {...props}
        >
            <path d="M16 8.25a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5h-5Zm0 3a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5h-4Zm-13-3a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5H3Zm13 6a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5h-5Zm-13 0a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5H3Zm0-3a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5H3Zm0 6a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5H3Zm13 0a.75.75 0 1 1 0-1.5h4a.75.75 0 1 1 0 1.5h-4Zm-3.75-10V17.5a.75.75 0 0 1-.75.75h-2a.75.75 0 1 1 0-1.5h1.25V6.5a.75.75 0 0 1 .75-.75h2a.75.75 0 1 1 0 1.5h-1.25Z" />
        </svg>
    );
}

const Memo = memo(IconColumnBreak);
export default Memo;
