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

function IconCrop(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M17.434 7.393c.186.38.291.806.291 1.257v8.85h2.15a.85.85 0 0 1 0 1.7h-2.15v2.15a.85.85 0 0 1-1.7 0V19.2h-8.65a2.85 2.85 0 0 1-2.85-2.85V7.5h-2.15a.85.85 0 1 1 0-1.7h2.15V3.65a.85.85 0 1 1 1.7 0V5.8h8.65c.504 0 .977.13 1.388.36L18.524 3.9a.85.85 0 0 1 1.202 1.202l-2.292 2.292zM6.225 16.198L14.922 7.5l-.047-.001h-8.65v8.698zm1.103 1.301l.047.001h8.65V8.802L7.328 17.5z" />
        </svg>
    );
}

const MemoIconCrop = React.memo(IconCrop);
export default MemoIconCrop;
