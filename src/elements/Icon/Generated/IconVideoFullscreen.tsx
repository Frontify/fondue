import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconVideoFullscreen(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
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
            <path d="M8.444 8.444H4.667a.667.667 0 000 1.334H9.11a.667.667 0 00.667-.667V4.667a.667.667 0 00-1.334 0v3.777zM15.333 8.444h3.778a.667.667 0 110 1.334h-4.444A.667.667 0 0114 9.11V4.667a.667.667 0 011.333 0v3.777zM8.444 15.333H4.667a.667.667 0 010-1.333H9.11c.368 0 .667.298.667.667v4.444a.667.667 0 11-1.334 0v-3.778zM15.333 15.333h3.778a.667.667 0 000-1.333h-4.444a.667.667 0 00-.667.667v4.444a.667.667 0 001.333 0v-3.778z" />
        </svg>
    );
}

const MemoIconVideoFullscreen = React.memo(IconVideoFullscreen);
export default MemoIconVideoFullscreen;
