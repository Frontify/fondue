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

function IconCaretRight(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M8.48 5.138a.83.83 0 01-.23-.576.83.83 0 01.23-.576.751.751 0 011.093 0l7.677 8.034-7.677 8.035a.75.75 0 01-1.053-.043.84.84 0 01-.04-1.101l6.575-6.89L8.48 5.137z" />
        </svg>
    );
}

const MemoIconCaretRight = React.memo(IconCaretRight);
export default MemoIconCaretRight;
