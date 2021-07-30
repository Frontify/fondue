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

function IconTextAlignRight(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M7 7a1 1 0 110-2h14a1 1 0 010 2H7zm-4.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91zM7 15a1 1 0 110-2h14a1 1 0 010 2H7zm-4.09 4c-.503 0-.91-.448-.91-1s.407-1 .91-1h18.18c.503 0 .91.448.91 1s-.407 1-.91 1H2.91z" />
        </svg>
    );
}

const MemoIconTextAlignRight = React.memo(IconTextAlignRight);
export default MemoIconTextAlignRight;
