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

function IconAlignTop(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconAlignTop"
            {...props}
        >
            <path d="M3.865 2h16.27c.478 0 .865.39.865.87s-.387.87-.865.87H3.865A.867.867 0 013 2.87c0-.48.387-.87.865-.87zm7.222 6l-4.609 4.609a.84.84 0 01-1.217 0 .84.84 0 010-1.218l6.087-6.087a.84.84 0 011.217 0l6.087 6.087a.84.84 0 010 1.218.84.84 0 01-1.217 0L12.826 8v13.13c0 .522-.348.87-.87.87-.521 0-.869-.348-.869-.87V8z" />
        </svg>
    );
}

const MemoIconAlignTop = React.memo(IconAlignTop);
export default MemoIconAlignTop;
