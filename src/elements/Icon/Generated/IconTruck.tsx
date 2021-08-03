import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconTruck(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            className={customClassName}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            name="IconTruck"
            {...props}
        >
            <path d="M.875 7A.879.879 0 000 7.875v12.25c0 .48.395.875.875.875H3a3 3 0 006 0h3.125c.48 0 .875-.395.875-.875V7.875A.879.879 0 0012.125 7zm13.781 2a.658.658 0 00-.656.656v10.688c0 .27.172.496.406.593.078.032.16.063.25.063H16a3 3 0 006 0h1.344c.09 0 .172-.027.25-.063a.644.644 0 00.343-.343.606.606 0 00.063-.25v-5.157c0-.128-.055-.234-.125-.343L20.187 9.28a.627.627 0 00-.53-.281zM17 11h2.531l2.657 4H17zM6 19.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm13 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
    );
}

const MemoIconTruck = React.memo(IconTruck);
export default MemoIconTruck;
