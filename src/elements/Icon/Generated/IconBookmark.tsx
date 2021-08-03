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

function IconBookmark(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconBookmark"
            {...props}
        >
            <path d="M7.333 3.6a.79.79 0 00-.777.8v15.998l5.032-3.235a.76.76 0 01.824 0l5.032 3.235V4.4a.79.79 0 00-.777-.8H7.333zm.047 18.154c-1.036.666-2.38-.1-2.38-1.356V4.4C5 3.074 6.045 2 7.333 2h9.334C17.955 2 19 3.074 19 4.4v15.998c0 1.256-1.344 2.022-2.38 1.356L12 18.784l-4.62 2.97z" />
        </svg>
    );
}

const MemoIconBookmark = React.memo(IconBookmark);
export default MemoIconBookmark;
