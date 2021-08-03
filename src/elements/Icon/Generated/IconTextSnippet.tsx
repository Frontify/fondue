import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconTextSnippet(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M7.758 9.75A.754.754 0 017 9c0-.414.34-.75.758-.75h8.484c.419 0 .758.336.758.75s-.34.75-.758.75H7.758zm.075 3c-.46 0-.833-.336-.833-.75s.373-.75.833-.75h8.334c.46 0 .833.336.833.75s-.373.75-.833.75H7.833zm-.075 3A.754.754 0 017 15c0-.414.34-.75.758-.75h5.151c.418 0 .758.336.758.75s-.34.75-.758.75H7.758zM7.5 6.25h-2c-.69 0-1.25.56-1.25 1.25v9c0 .69.56 1.25 1.25 1.25h2a.75.75 0 110 1.5h-2a2.75 2.75 0 01-2.75-2.75v-9A2.75 2.75 0 015.5 4.75h2a.75.75 0 010 1.5zm9 0a.75.75 0 110-1.5h2a2.75 2.75 0 012.75 2.75v9a2.75 2.75 0 01-2.75 2.75h-2a.75.75 0 110-1.5h2c.69 0 1.25-.56 1.25-1.25v-9c0-.69-.56-1.25-1.25-1.25h-2z" />
        </svg>
    );
}

const MemoIconTextSnippet = React.memo(IconTextSnippet);
export default MemoIconTextSnippet;
