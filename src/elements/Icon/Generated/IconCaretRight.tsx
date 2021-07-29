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

function IconCaretRight(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={customClassName}
            {...props}
        >
            <path
                d="M8.47938404,5.13840826 C8.33257692,4.98602469 8.25,4.77859371 8.25,4.56220176 C8.25,4.34580982 8.33257692,4.13837884 8.47938404,3.98599527 C8.78184812,3.67133491 9.27033893,3.67133491 9.57280301,3.98599527 L17.25,12.0204239 L9.57280301,20.0548525 C9.26512555,20.3306012 8.80648368,20.3120615 8.52004742,20.012297 C8.23361117,19.7125324 8.21589582,19.2325492 8.47938404,18.9105551 L15.0554073,12.0204239 L8.47938404,5.13840826 Z"
                id="Icon_CaretUp"
            />
        </svg>
    );
}

const MemoIconCaretRight = React.memo(IconCaretRight);
export default MemoIconCaretRight;
