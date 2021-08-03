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

function IconFocalPoint(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconFocalPoint"
            {...props}
        >
            <path d="M19.468 19.442v-4.25a.75.75 0 011.5 0v5a.75.75 0 01-.75.75h-5a.75.75 0 010-1.5h4.25zm-14.913 0h4.25a.75.75 0 110 1.5h-5a.75.75 0 01-.75-.75v-5a.75.75 0 111.5 0v4.25zM19.457 4.498h-4.25a.75.75 0 010-1.5h5a.75.75 0 01.75.75v5a.75.75 0 11-1.5 0v-4.25zm-14.914 0v4.25a.75.75 0 11-1.5 0v-5a.75.75 0 01.75-.75h5a.75.75 0 110 1.5h-4.25zM12 13a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    );
}

const MemoIconFocalPoint = React.memo(IconFocalPoint);
export default MemoIconFocalPoint;
