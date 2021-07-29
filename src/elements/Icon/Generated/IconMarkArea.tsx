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

function IconMarkArea(props: IconProps): React.ReactElement<IconProps> {
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
                d="M5,5 C4.44771525,5 4,5.44771525 4,6 L4,18 C4,18.5522847 4.44771525,19 5,19 L19,19 C19.5522847,19 20,18.5522847 20,18 L20,6 C20,5.44771525 19.5522847,5 19,5 L5,5 Z M5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,18 C22,19.6568542 20.6568542,21 19,21 L5,21 C3.34314575,21 2,19.6568542 2,18 L2,6 C2,4.34314575 3.34314575,3 5,3 Z M9,9 C8.44771525,9 8,9.44771525 8,10 L8,11 C8,11.5522847 8.44771525,12 9,12 L15,12 C15.5522847,12 16,11.5522847 16,11 L16,10 C16,9.44771525 15.5522847,9 15,9 L9,9 Z M9,7 L15,7 C16.6568542,7 18,8.34314575 18,10 L18,11 C18,12.6568542 16.6568542,14 15,14 L9,14 C7.34314575,14 6,12.6568542 6,11 L6,10 C6,8.34314575 7.34314575,7 9,7 Z"
                id="Icon_MarkArea"
            />
        </svg>
    );
}

const MemoIconMarkArea = React.memo(IconMarkArea);
export default MemoIconMarkArea;
