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

function IconTextLibrary(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M18.97 17.856a4.541 4.541 0 01-4.508 4.029H5.538C3.032 21.885 1 19.842 1 17.33v-6.278a4.546 4.546 0 014.03-4.525A4.541 4.541 0 019.538 2.5h8.924C20.968 2.5 23 4.543 23 7.053v6.278a4.546 4.546 0 01-4.03 4.525zm.03-1.522a2.727 2.727 0 002.462-2.72V6.77a2.727 2.727 0 00-2.72-2.732H9.258A2.724 2.724 0 006.552 6.5h7.91C16.968 6.5 19 8.543 19 11.053v5.281zm-4.257 4.012a2.725 2.725 0 002.719-2.731V10.77a2.727 2.727 0 00-2.72-2.732H5.258a2.725 2.725 0 00-2.719 2.732v6.845a2.727 2.727 0 002.72 2.731h9.485zM5.758 12A.754.754 0 015 11.25c0-.414.34-.75.758-.75h8.484c.419 0 .758.336.758.75s-.34.75-.758.75H5.758zm.075 3c-.46 0-.833-.336-.833-.75s.373-.75.833-.75h8.334c.46 0 .833.336.833.75s-.373.75-.833.75H5.833zm-.075 3A.754.754 0 015 17.25c0-.414.34-.75.758-.75h5.151c.418 0 .758.336.758.75s-.34.75-.758.75H5.758z" />
        </svg>
    );
}

const MemoIconTextLibrary = React.memo(IconTextLibrary);
export default MemoIconTextLibrary;
