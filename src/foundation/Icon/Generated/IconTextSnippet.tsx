import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextSnippet(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconTextSnippet"
            {...props}
        >
            <path d="M7.758 9.75A.754.754 0 0 1 7 9c0-.414.34-.75.758-.75h8.484c.419 0 .758.336.758.75s-.34.75-.758.75H7.758zm.075 3c-.46 0-.833-.336-.833-.75s.373-.75.833-.75h8.334c.46 0 .833.336.833.75s-.373.75-.833.75H7.833zm-.075 3A.754.754 0 0 1 7 15c0-.414.34-.75.758-.75h5.151c.418 0 .758.336.758.75s-.34.75-.758.75H7.758zM7.5 6.25h-2c-.69 0-1.25.56-1.25 1.25v9c0 .69.56 1.25 1.25 1.25h2a.75.75 0 1 1 0 1.5h-2a2.75 2.75 0 0 1-2.75-2.75v-9A2.75 2.75 0 0 1 5.5 4.75h2a.75.75 0 0 1 0 1.5zm9 0a.75.75 0 1 1 0-1.5h2a2.75 2.75 0 0 1 2.75 2.75v9a2.75 2.75 0 0 1-2.75 2.75h-2a.75.75 0 1 1 0-1.5h2c.69 0 1.25-.56 1.25-1.25v-9c0-.69-.56-1.25-1.25-1.25h-2z" />
        </svg>
    );
}

const Memo = memo(IconTextSnippet);
export default Memo;
