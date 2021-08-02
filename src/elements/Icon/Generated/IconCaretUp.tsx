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

function IconCaretUp(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M18.862 15.52L11.98 8.946 5.09 15.52a.84.84 0 01-1.102-.041.75.75 0 01-.043-1.053L11.98 6.75l8.034 7.677a.751.751 0 010 1.094.83.83 0 01-.576.229.83.83 0 01-.576-.23z" />
        </svg>
    );
}

const MemoIconCaretUp = React.memo(IconCaretUp);
export default MemoIconCaretUp;
