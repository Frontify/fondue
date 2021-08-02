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

function IconArrowRight(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M18.498 13.03H3.026a1.026 1.026 0 110-2.05h15.472L13.07 5.55a1.026 1.026 0 111.45-1.45l7.18 7.18c.4.4.4 1.05 0 1.45l-7.18 7.18a1.026 1.026 0 01-1.45-1.45l5.428-5.43z" />
        </svg>
    );
}

const MemoIconArrowRight = React.memo(IconArrowRight);
export default MemoIconArrowRight;
