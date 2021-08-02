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

function IconAlignBottom(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M3.865 22.04A.867.867 0 013 21.17c0-.48.387-.87.865-.87h16.27c.478 0 .865.39.865.87s-.387.87-.865.87H3.865zm7.32-6.04V2.87c0-.522.346-.87.865-.87s.865.348.865.87V16l4.584-4.609a.833.833 0 011.211 0 .844.844 0 010 1.218l-6.055 6.087a.833.833 0 01-1.21 0l-6.056-6.087a.844.844 0 010-1.218.833.833 0 011.211 0L11.185 16z" />
        </svg>
    );
}

const MemoIconAlignBottom = React.memo(IconAlignBottom);
export default MemoIconAlignBottom;
