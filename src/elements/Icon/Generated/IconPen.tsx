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

function IconPen(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M6.95 19.875l8.425-8.431-2.825-2.819-8.425 8.431v1.283h1.539v1.536H6.95zm5.793-13.5l4.882 4.882L7.882 21H3v-4.882l9.743-9.743zm8.257.81c0 .402-.14.744-.42 1.025l-1.578 1.54-4.752-4.788 1.579-1.52A1.31 1.31 0 0116.847 3c.413 0 .759.148 1.038.443l2.696 2.695c.28.295.419.644.419 1.046z" />
        </svg>
    );
}

const MemoIconPen = React.memo(IconPen);
export default MemoIconPen;
