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

function IconArrowDown(props: IconProps): React.ReactElement<IconProps> {
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
            {...props}
        >
            <path d="M13.03 18.498l5.43-5.428a1.026 1.026 0 111.45 1.45l-7.18 7.18c-.4.4-1.05.4-1.45 0L4.1 14.52a1.026 1.026 0 111.45-1.45l5.43 5.428V3.026a1.026 1.026 0 112.05 0v15.472z" />
        </svg>
    );
}

const MemoIconArrowDown = React.memo(IconArrowDown);
export default MemoIconArrowDown;
