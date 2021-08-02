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

function IconRefresh(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M19.379 6.833l-.015-4.095a.887.887 0 01.895-.888c.48.021.865.414.868.895l.025 6.369a.82.82 0 010 .027.885.885 0 01-.861.86l-6.396-.024A.908.908 0 0113 9.109L13 9.075a.885.885 0 01.888-.861l4.259.015C16.829 5.332 14.346 3.85 11.5 3.85a7.65 7.65 0 100 15.3c4.057 0 7.376-3.158 7.634-6.15-.004-.47.383-1 .853-1s.85.53.85 1a.859.859 0 01-.006.1c-.31 3.884-4.369 7.75-9.331 7.75a9.35 9.35 0 010-18.7c3.31 0 6.217 1.66 7.879 4.683z" />
        </svg>
    );
}

const MemoIconRefresh = React.memo(IconRefresh);
export default MemoIconRefresh;
