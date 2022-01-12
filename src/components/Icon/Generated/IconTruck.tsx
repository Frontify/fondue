import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconTruck(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
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
            <path d="M.875 7A.879.879 0 0 0 0 7.875v12.25c0 .48.395.875.875.875H3a3 3 0 0 0 6 0h3.125c.48 0 .875-.395.875-.875V7.875A.879.879 0 0 0 12.125 7Zm13.781 2a.658.658 0 0 0-.656.656v10.688c0 .27.172.496.406.593.078.032.16.063.25.063H16a3 3 0 0 0 6 0h1.344c.09 0 .172-.027.25-.063a.644.644 0 0 0 .343-.343.606.606 0 0 0 .063-.25v-5.157c0-.128-.055-.234-.125-.343L20.187 9.28a.627.627 0 0 0-.53-.281ZM17 11h2.531l2.657 4H17ZM6 19.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm13 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
    );
}

const Memo = memo(IconTruck);
export default Memo;
