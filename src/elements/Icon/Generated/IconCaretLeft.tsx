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

function IconCaretLeft(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconCaretLeft"
            {...props}
        >
            <path d="M15.52 5.138L8.946 12.02l6.576 6.89a.84.84 0 01-.041 1.102.75.75 0 01-1.053.043L6.75 12.02l7.677-8.034a.751.751 0 011.094 0 .83.83 0 01.229.576.83.83 0 01-.23.576z" />
        </svg>
    );
}

const MemoIconCaretLeft = React.memo(IconCaretLeft);
export default MemoIconCaretLeft;
