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

function IconColorScaleSmall(props: IconProps): React.ReactElement<IconProps> {
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
                d="M4.34432234,11.1666667 C3.89925771,11.1666667 3.53846154,11.5397627 3.53846154,12 C3.53846154,12.4602373 3.89925771,12.8333333 4.34432234,12.8333333 L19.6556777,12.8333333 C20.1007423,12.8333333 20.4615385,12.4602373 20.4615385,12 C20.4615385,11.5397627 20.1007423,11.1666667 19.6556777,11.1666667 L4.34432234,11.1666667 Z M4.4,9.5 L19.6,9.5 C20.9254834,9.5 22,10.6192881 22,12 C22,13.3807119 20.9254834,14.5 19.6,14.5 L4.4,14.5 C3.0745166,14.5 2,13.3807119 2,12 C2,10.6192881 3.0745166,9.5 4.4,9.5 Z"
                id="Icon_ColorscaleSmall"
            />
        </svg>
    );
}

const MemoIconColorScaleSmall = React.memo(IconColorScaleSmall);
export default MemoIconColorScaleSmall;
