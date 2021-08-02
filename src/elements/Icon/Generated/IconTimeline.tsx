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

function IconTimeline(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M5.476 11.333a2.501 2.501 0 012.357-1.666h7.5c1.089 0 2.015.695 2.358 1.666h3.476a.833.833 0 010 1.667H17.69a2.501 2.501 0 01-2.358 1.667h-7.5A2.501 2.501 0 015.476 13H2.833a.833.833 0 110-1.667h2.643zM14.642 18A2.501 2.501 0 0117 16.333h2.5a2.5 2.5 0 010 5H17a2.501 2.501 0 01-2.358-1.666H2.833a.833.833 0 010-1.667h11.81zm-4.45-13.333h10.975a.833.833 0 110 1.666H10.19A2.501 2.501 0 017.833 8H4.5a2.5 2.5 0 010-5h3.333c1.089 0 2.015.696 2.358 1.667zm-5.692 0a.833.833 0 100 1.666h3.333a.833.833 0 100-1.666H4.5zM17 18a.833.833 0 100 1.667h2.5a.833.833 0 000-1.667H17zm-9.167-6.667a.833.833 0 000 1.667h7.5a.833.833 0 100-1.667h-7.5z" />
        </svg>
    );
}

const MemoIconTimeline = React.memo(IconTimeline);
export default MemoIconTimeline;
