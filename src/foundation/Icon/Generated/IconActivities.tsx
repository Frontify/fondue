import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconActivities(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconActivities"
            {...props}
        >
            <path d="M11.25 20.216V12.75H8.722a9.705 9.705 0 0 1-2.183 5.434A8.3 8.3 0 0 1 5.5 17.08a8.21 8.21 0 0 0 1.716-4.331H3.784a8.252 8.252 0 0 0 7.466 7.466zM3.784 11.25h3.432A8.21 8.21 0 0 0 5.5 6.919a8.3 8.3 0 0 1 1.039-1.103 9.705 9.705 0 0 1 2.183 5.434h2.528V3.784a8.252 8.252 0 0 0-7.466 7.466zm8.966-7.466v7.466h2.528a9.705 9.705 0 0 1 2.183-5.434A8.3 8.3 0 0 1 18.5 6.92a8.21 8.21 0 0 0-1.716 4.331h3.432a8.252 8.252 0 0 0-7.466-7.466zm7.466 8.966h-3.432a8.21 8.21 0 0 0 1.716 4.331 8.3 8.3 0 0 1-1.039 1.103 9.705 9.705 0 0 1-2.183-5.434H12.75v7.466a8.252 8.252 0 0 0 7.466-7.466zm-8.216 9c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
        </svg>
    );
}

const Memo = memo(IconActivities);
export default Memo;
