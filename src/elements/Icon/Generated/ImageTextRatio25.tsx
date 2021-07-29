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

function IconImageTextRatio25(props: IconProps): React.ReactElement<IconProps> {
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
            <title>{"image-text-ratio-25"}</title>
            <path
                id="svg_1"
                d="m5.69202,3.004885l6.02344,0c1.51878,0 2.75,1.23122 2.75,2.75l0,12.49023c0,1.51879 -1.23122,2.75 -2.75,2.75l-6.02344,0c-1.51878,0 -2.75,-1.23121 -2.75,-2.75l0,-12.49023c0,-1.51878 1.23122,-2.75 2.75,-2.75zm0,1.5c-0.69036,0 -1.25,0.55964 -1.25,1.25l0,12.49023c0,0.69036 0.55964,1.25 1.25,1.25l6.02344,0c0.69035,0 1.25,-0.55964 1.25,-1.25l0,-12.49023c0,-0.69036 -0.55965,-1.25 -1.25,-1.25l-6.02344,0zm11.00952,0.96973c-0.41421,0 -0.75,-0.33579 -0.75,-0.75c0,-0.41422 0.33579,-0.75 0.75,-0.75l3.60644,0c0.41422,0 0.75,0.33578 0.75,0.75c0,0.41421 -0.33578,0.75 -0.75,0.75l-3.60644,0zm0,3.03003c-0.41421,0 -0.75,-0.33579 -0.75,-0.75c0,-0.41422 0.33579,-0.75 0.75,-0.75l3.60644,0c0.41422,0 0.75,0.33578 0.75,0.75c0,0.41421 -0.33578,0.75 -0.75,0.75l-3.60644,0zm0.00362,3.03344c-0.41421,0 -0.75,-0.33578 -0.75,-0.75c0,-0.41421 0.33579,-0.75 0.75,-0.75l2.11789,0c0.41421,0 0.75,0.33579 0.75,0.75c0,0.41422 -0.33579,0.75 -0.75,0.75l-2.11789,0z"
            />
        </svg>
    );
}

const MemoIconImageTextRatio25 = React.memo(IconImageTextRatio25);
export default MemoIconImageTextRatio25;
