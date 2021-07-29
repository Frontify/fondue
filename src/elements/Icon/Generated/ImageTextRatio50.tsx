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

function IconImageTextRatio50(props: IconProps): React.ReactElement<IconProps> {
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
            <title>{"image-text-ratio-50"}</title>
            <path
                id="svg_1"
                d="m5.736389,3.004883l2.526855,0c1.518784,0 2.75,1.231217 2.75,2.75l0,12.490234c0,1.518783 -1.231216,2.75 -2.75,2.75l-2.526855,0c-1.518783,0 -2.75,-1.231217 -2.75,-2.75l0,-12.490234c0,-1.518783 1.231217,-2.75 2.75,-2.75zm0,1.5c-0.690356,0 -1.25,0.559644 -1.25,1.25l0,12.490234c0,0.690356 0.559644,1.25 1.25,1.25l2.526855,0c0.690356,0 1.25,-0.559644 1.25,-1.25l0,-12.490234c0,-0.690356 -0.559644,-1.25 -1.25,-1.25l-2.526855,0zm7.71582,0.969727c-0.414213,0 -0.75,-0.335787 -0.75,-0.75c0,-0.414214 0.335787,-0.75 0.75,-0.75l6.811402,0c0.414213,0 0.75,0.335786 0.75,0.75c0,0.414213 -0.335787,0.75 -0.75,0.75l-6.811402,0zm0,3.030029c-0.414213,0 -0.75,-0.335787 -0.75,-0.75c0,-0.414214 0.335787,-0.75 0.75,-0.75l6.811402,0c0.414213,0 0.75,0.335786 0.75,0.75c0,0.414213 -0.335787,0.75 -0.75,0.75l-6.811402,0zm0.006836,3.033447c-0.414213,0 -0.75,-0.335786 -0.75,-0.75c0,-0.414213 0.335787,-0.75 0.75,-0.75l4,0c0.414214,0 0.75,0.335787 0.75,0.75c0,0.414214 -0.335786,0.75 -0.75,0.75l-4,0z"
            />
        </svg>
    );
}

const MemoIconImageTextRatio50 = React.memo(IconImageTextRatio50);
export default MemoIconImageTextRatio50;
