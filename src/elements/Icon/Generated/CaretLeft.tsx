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

function IconCaretLeft(props: IconProps): React.ReactElement<IconProps> {
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
                d="M15.520616,5.13840826 L8.94459268,12.0204239 L15.520616,18.9105551 C15.7841042,19.2325492 15.7663888,19.7125324 15.4799526,20.012297 C15.1935163,20.3120615 14.7348744,20.3306012 14.427197,20.0548525 L6.75,12.0204239 L14.427197,3.98599527 C14.7296611,3.67133491 15.2181519,3.67133491 15.520616,3.98599527 C15.6674231,4.13837884 15.75,4.34580982 15.75,4.56220176 C15.75,4.77859371 15.6674231,4.98602469 15.520616,5.13840826 Z"
                id="Icon_CaretUp"
            />
        </svg>
    );
}

const MemoIconCaretLeft = React.memo(IconCaretLeft);
export default MemoIconCaretLeft;
