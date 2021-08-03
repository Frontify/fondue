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

function IconOpenLock(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconOpenLock"
            {...props}
        >
            <path d="M11.2 15.944a1.666 1.666 0 111.667 0V17a.833.833 0 01-1.667 0v-1.056zm4.167-7.277v-2.5a2.5 2.5 0 00-2.5-2.5H11.2a2.5 2.5 0 00-2.5 2.5.833.833 0 11-1.667 0A4.167 4.167 0 0111.2 2h1.667a4.167 4.167 0 014.166 4.167v2.5h.834a2.5 2.5 0 012.5 2.5V19.5a2.5 2.5 0 01-2.5 2.5H6.2a2.5 2.5 0 01-2.5-2.5v-8.333a2.5 2.5 0 012.5-2.5h9.167zM6.2 10.333a.833.833 0 00-.833.834V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833v-8.333a.833.833 0 00-.833-.834H6.2z" />
        </svg>
    );
}

const MemoIconOpenLock = React.memo(IconOpenLock);
export default MemoIconOpenLock;
