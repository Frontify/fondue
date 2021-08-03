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

function IconColorScale(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconColorScale"
            {...props}
        >
            <path d="M16.615 9.338H12v5.385h4.615V9.338zm1.539 0v5.385h2.308V9.338h-2.308zm-7.692 0H3.538v5.385h6.924V9.338zM3.538 7.8h16.924c.85 0 1.538.689 1.538 1.538v5.385c0 .85-.689 1.539-1.538 1.539H3.538c-.85 0-1.538-.69-1.538-1.539V9.338c0-.85.689-1.538 1.538-1.538z" />
        </svg>
    );
}

const MemoIconColorScale = React.memo(IconColorScale);
export default MemoIconColorScale;
