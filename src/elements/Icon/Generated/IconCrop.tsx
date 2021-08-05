import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconCrop(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
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
            name="IconCrop"
            {...props}
        >
            <path d="M17.434 7.393c.186.38.291.806.291 1.257v8.85h2.15a.85.85 0 010 1.7h-2.15v2.15a.85.85 0 01-1.7 0V19.2h-8.65a2.85 2.85 0 01-2.85-2.85V7.5h-2.15a.85.85 0 110-1.7h2.15V3.65a.85.85 0 111.7 0V5.8h8.65c.504 0 .977.13 1.388.36l2.261-2.26a.85.85 0 011.202 1.202l-2.292 2.292zM6.225 16.198L14.922 7.5l-.047-.001h-8.65v8.698zm1.103 1.301l.047.001h8.65V8.802L7.328 17.5z" />
        </svg>
    );
}

const MemoIconCrop = React.memo(IconCrop);
export default MemoIconCrop;
