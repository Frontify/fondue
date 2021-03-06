import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconVideoFullscreen(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconVideoFullscreen"
            {...props}
        >
            <path d="M8.444 8.444H4.667a.667.667 0 0 0 0 1.334H9.11a.667.667 0 0 0 .667-.667V4.667a.667.667 0 0 0-1.334 0v3.777ZM15.333 8.444h3.778a.667.667 0 1 1 0 1.334h-4.444A.667.667 0 0 1 14 9.11V4.667a.667.667 0 0 1 1.333 0v3.777ZM8.444 15.333H4.667a.667.667 0 0 1 0-1.333H9.11c.368 0 .667.298.667.667v4.444a.667.667 0 1 1-1.334 0v-3.778ZM15.333 15.333h3.778a.667.667 0 0 0 0-1.333h-4.444a.667.667 0 0 0-.667.667v4.444a.667.667 0 0 0 1.333 0v-3.778Z" />
        </svg>
    );
}

const Memo = memo(IconVideoFullscreen);
export default Memo;
