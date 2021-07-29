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

function IconColorScaleTall(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path
                d="M4.34432234,9.6 C3.89925771,9.6 3.53846154,9.9581722 3.53846154,10.4 L3.53846154,13.6 C3.53846154,14.0418278 3.89925771,14.4 4.34432234,14.4 L19.6556777,14.4 C20.1007423,14.4 20.4615385,14.0418278 20.4615385,13.6 L20.4615385,10.4 C20.4615385,9.9581722 20.1007423,9.6 19.6556777,9.6 L4.34432234,9.6 Z M4.4,8 L19.6,8 C20.9254834,8 22,9.0745166 22,10.4 L22,13.6 C22,14.9254834 20.9254834,16 19.6,16 L4.4,16 C3.0745166,16 2,14.9254834 2,13.6 L2,10.4 C2,9.0745166 3.0745166,8 4.4,8 Z"
                id="Icon_ColorscaleTall"
            />
        </svg>
    );
}

const MemoIconColorScaleTall = React.memo(IconColorScaleTall);
export default MemoIconColorScaleTall;
