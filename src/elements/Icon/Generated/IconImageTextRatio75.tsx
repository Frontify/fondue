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
            <title>{"image-text-ratio-75"}</title>
            <path
                id="svg_1"
                d="m5.572222,3.004883c1.388465,0 2.514038,1.125573 2.514038,2.514038l0,12.962158c0,1.388465 -1.125573,2.514038 -2.514038,2.514038c-1.388465,0 -2.514038,-1.125573 -2.514038,-2.514038l0,-12.962158c0,-1.388465 1.125573,-2.514038 2.514038,-2.514038zm0,1.5c-0.560038,0 -1.014038,0.454 -1.014038,1.014038l0,12.962158c0,0.560038 0.454,1.014038 1.014038,1.014038c0.560038,0 1.014038,-0.454 1.014038,-1.014038l0,-12.962158c0,-0.560038 -0.454,-1.014038 -1.014038,-1.014038zm4.623901,0.92749c-0.414213,0 -0.75,-0.335786 -0.75,-0.75c0,-0.414213 0.335787,-0.75 0.75,-0.75l9.995694,0c0.414213,0 0.75,0.335787 0.75,0.75c0,0.414214 -0.335787,0.75 -0.75,0.75l-9.995694,0zm0,3.03003c-0.414213,0 -0.75,-0.335787 -0.75,-0.75c0,-0.414214 0.335787,-0.75 0.75,-0.75l9.995694,0c0.414213,0 0.75,0.335786 0.75,0.75c0,0.414213 -0.335787,0.75 -0.75,0.75l-9.995694,0zm0.010032,3.033447c-0.414213,0 -0.75,-0.335787 -0.75,-0.75c0,-0.414214 0.335787,-0.75 0.75,-0.75l5.869978,0c0.414213,0 0.75,0.335786 0.75,0.75c0,0.414213 -0.335787,0.75 -0.75,0.75l-5.869978,0z"
            />
        </svg>
    );
}

const MemoIconImageTextRatio75 = React.memo(IconImageTextRatio75);
export default MemoIconImageTextRatio75;
