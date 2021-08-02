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

function IconImageGrid4(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M4.472 11.231a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444zm5.185 1.481a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444zm5.186 1.481a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444zm5.185 1.481a.74.74 0 100 1.482.74.74 0 000-1.482zm0-1.481a2.222 2.222 0 110 4.444 2.222 2.222 0 010-4.444z" />
        </svg>
    );
}

const MemoIconImageGrid4 = React.memo(IconImageGrid4);
export default MemoIconImageGrid4;
