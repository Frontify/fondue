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

function IconPills(props: IconProps): React.ReactElement<IconProps> {
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
            {...props}
        >
            <path d="M3 10.5V12h3v-1.5H3zM3 9h3a1.5 1.5 0 0 1 1.5 1.5V12A1.5 1.5 0 0 1 6 13.5H3A1.5 1.5 0 0 1 1.5 12v-1.5A1.5 1.5 0 0 1 3 9zm7.5 1.5V12h3v-1.5h-3zm0-1.5h3a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 12v-1.5A1.5 1.5 0 0 1 10.5 9zm7.5 1.5V12h3v-1.5h-3zM18 9h3a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-1.5A1.5 1.5 0 0 1 18 9z" />
        </svg>
    );
}

const MemoIconPills = React.memo(IconPills);
export default MemoIconPills;
