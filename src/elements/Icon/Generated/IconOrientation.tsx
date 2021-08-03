import * as React from "react";
import IconProps from "@elements/Icon/IconProps";
import IconSize from "@elements/Icon/IconSize";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconOrientation(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconOrientation"
            {...props}
        >
            <path d="M5.333 18.667A3.333 3.333 0 012 15.333v-10A3.333 3.333 0 015.333 2h5.834A3.333 3.333 0 0114.5 5.333V9.5h4.167A3.333 3.333 0 0122 12.833v5.834A3.333 3.333 0 0118.667 22h-10a3.333 3.333 0 01-3.334-3.333zm1.667 0c0 .92.746 1.666 1.667 1.666h10c.92 0 1.666-.746 1.666-1.666v-5.834c0-.92-.746-1.666-1.666-1.666H14.5v4.166a3.333 3.333 0 01-3.333 3.334H7zm-1.667-15c-.92 0-1.666.746-1.666 1.666v10c0 .92.746 1.667 1.666 1.667h5.834c.92 0 1.666-.746 1.666-1.667v-10c0-.92-.746-1.666-1.666-1.666H5.333z" />
        </svg>
    );
}

const MemoIconOrientation = React.memo(IconOrientation);
export default MemoIconOrientation;
