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

function IconCaretDown(props: IconProps): React.ReactElement<IconProps> {
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
                d="M18.8615917,8.47938404 C19.0139753,8.33257692 19.2214063,8.25 19.4377982,8.25 C19.6541902,8.25 19.8616212,8.33257692 20.0140047,8.47938404 C20.3286651,8.78184812 20.3286651,9.27033893 20.0140047,9.57280301 L11.9795761,17.25 L3.94514752,9.57280301 C3.6693988,9.26512555 3.68793846,8.80648368 3.98770304,8.52004742 C4.28746761,8.23361117 4.76745078,8.21589582 5.08944493,8.47938404 L11.9795761,15.0554073 L18.8615917,8.47938404 Z"
                id="icon_CaretDown"
            />
        </svg>
    );
}

const MemoIconCaretDown = React.memo(IconCaretDown);
export default MemoIconCaretDown;
