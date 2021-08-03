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

function IconArrowUp(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconArrowUp"
            {...props}
        >
            <path d="M10.98 6.002L5.55 11.43A1.026 1.026 0 114.1 9.98l7.18-7.18c.4-.4 1.05-.4 1.45 0l7.18 7.18a1.026 1.026 0 01-1.45 1.45l-5.43-5.428v15.472a1.026 1.026 0 11-2.05 0V6.002z" />
        </svg>
    );
}

const MemoIconArrowUp = React.memo(IconArrowUp);
export default MemoIconArrowUp;
