import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconTextAlignLeft(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconTextAlignLeft"
            {...props}
        >
            <path d="M3 7a1 1 0 110-2h14a1 1 0 010 2H3zm-.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91zM3 15a1 1 0 110-2h14a1 1 0 010 2H3zm-.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91z" />
        </svg>
    );
}

const MemoIconTextAlignLeft = React.memo(IconTextAlignLeft);
export default MemoIconTextAlignLeft;
