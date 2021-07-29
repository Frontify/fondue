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

function IconTypostyles(props: IconProps): React.ReactElement<IconProps> {
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
                d="M8.92307692,17.3076923 L11.2307692,17.3076923 L11.2307692,18.8461538 L5.07692308,18.8461538 L5.07692308,17.3076923 L7.38461538,17.3076923 L7.38461538,6.53846154 L3.53846154,6.53846154 L3.53846154,8.07692308 L2,8.07692308 L2,5 L14.3076923,5 L14.3076923,8.07692308 L12.7692308,8.07692308 L12.7692308,6.53846154 L8.92307692,6.53846154 L8.92307692,17.3076923 Z M18.1538462,17.3076923 L18.1538462,18.8461538 L16.6153846,18.8461538 L16.6153846,17.3076923 L16.6153846,11.1538462 L14.3076923,11.1538462 L12.7692308,11.1538462 L12.7692308,9.61538462 L22,9.61538462 L22,11.1538462 L20.4615385,11.1538462 L18.1538462,11.1538462 L18.1538462,17.3076923 Z"
                id="Icon_TypoStyles"
            />
        </svg>
    );
}

const MemoIconTypostyles = React.memo(IconTypostyles);
export default MemoIconTypostyles;
