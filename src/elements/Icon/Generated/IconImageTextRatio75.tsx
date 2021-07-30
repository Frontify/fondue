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

function IconImageTextRatio75(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M5.572 3.005a2.514 2.514 0 012.514 2.514V18.48a2.514 2.514 0 11-5.028 0V5.52a2.514 2.514 0 012.514-2.514zm0 1.5c-.56 0-1.014.454-1.014 1.014V18.48a1.014 1.014 0 102.028 0V5.52c0-.56-.454-1.014-1.014-1.014zm4.624.927a.75.75 0 010-1.5h9.996a.75.75 0 010 1.5h-9.996zm0 3.03a.75.75 0 010-1.5h9.996a.75.75 0 010 1.5h-9.996zm.01 3.034a.75.75 0 010-1.5h5.87a.75.75 0 010 1.5h-5.87z" />
        </svg>
    );
}

const MemoIconImageTextRatio75 = React.memo(IconImageTextRatio75);
export default MemoIconImageTextRatio75;
