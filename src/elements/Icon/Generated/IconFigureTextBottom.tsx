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

function IconFigureTextBottom(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M6.796 4.503c-.69 0-1.25.56-1.25 1.25v6.494c0 .69.56 1.25 1.25 1.25h10.463c.69 0 1.25-.56 1.25-1.25V5.753c0-.69-.56-1.25-1.25-1.25H6.796zm0-1.5h10.463a2.75 2.75 0 012.75 2.75v6.494a2.75 2.75 0 01-2.75 2.75H6.796a2.75 2.75 0 01-2.75-2.75V5.753a2.75 2.75 0 012.75-2.75zm1.96 15.206a.75.75 0 010-1.5h6.5a.75.75 0 110 1.5h-6.5zm.946 2.757a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5h-4.5z" />
        </svg>
    );
}

const MemoIconFigureTextBottom = React.memo(IconFigureTextBottom);
export default MemoIconFigureTextBottom;
