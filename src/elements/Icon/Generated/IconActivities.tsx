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

function IconActivities(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconActivities"
            {...props}
        >
            <path d="M11.25 20.216V12.75H8.722a9.705 9.705 0 01-2.183 5.434A8.3 8.3 0 015.5 17.08a8.21 8.21 0 001.716-4.331H3.784a8.252 8.252 0 007.466 7.466zM3.784 11.25h3.432A8.21 8.21 0 005.5 6.919a8.3 8.3 0 011.039-1.103 9.705 9.705 0 012.183 5.434h2.528V3.784a8.252 8.252 0 00-7.466 7.466zm8.966-7.466v7.466h2.528a9.705 9.705 0 012.183-5.434A8.3 8.3 0 0118.5 6.92a8.21 8.21 0 00-1.716 4.331h3.432a8.252 8.252 0 00-7.466-7.466zm7.466 8.966h-3.432a8.21 8.21 0 001.716 4.331 8.3 8.3 0 01-1.039 1.103 9.705 9.705 0 01-2.183-5.434H12.75v7.466a8.252 8.252 0 007.466-7.466zm-8.216 9c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
        </svg>
    );
}

const MemoIconActivities = React.memo(IconActivities);
export default MemoIconActivities;
