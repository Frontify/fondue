import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
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
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path
                d="M7.33333333,3.59979536 C6.90377853,3.59979536 6.55555556,3.95792175 6.55555556,4.39969304 L6.55555556,20.3976466 L11.5877786,17.1630599 C11.8399888,17.0009455 12.1600112,17.0009455 12.4122214,17.1630599 L17.4444444,20.3976466 L17.4444444,4.39969304 C17.4444444,3.95792175 17.0962215,3.59979536 16.6666667,3.59979536 L7.33333333,3.59979536 Z M7.37999835,21.7542704 C6.34392367,22.4202332 5,21.6541828 5,20.3976466 L5,4.39969304 C5,3.07437917 6.04466892,2 7.33333333,2 L16.6666667,2 C17.9553311,2 19,3.07437917 19,4.39969304 L19,20.3976466 C19,21.6541828 17.6560763,22.4202332 16.6200016,21.7542704 L12,18.7846492 L7.37999835,21.7542704 Z"
                id="Icon_Bookmark"
            />
        </svg>
    );
}

const MemoIconBookmark = React.memo(IconBookmark);
export default MemoIconBookmark;
