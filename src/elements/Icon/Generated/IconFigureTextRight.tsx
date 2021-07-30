import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconFigureTextRight(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M5.756 7.514c-.69 0-1.25.56-1.25 1.25v6.494c0 .69.56 1.25 1.25 1.25h4.51c.69 0 1.25-.56 1.25-1.25V8.764c0-.69-.56-1.25-1.25-1.25h-4.51zm0-1.5h4.51a2.75 2.75 0 012.75 2.75v6.494a2.75 2.75 0 01-2.75 2.75h-4.51a2.75 2.75 0 01-2.75-2.75V8.764a2.75 2.75 0 012.75-2.75zm9.509 1.5a.75.75 0 110-1.5h5a.75.75 0 110 1.5h-5zm0 3a.75.75 0 110-1.5h4a.75.75 0 110 1.5h-4z" />
        </svg>
    );
}

const MemoIconFigureTextRight = React.memo(IconFigureTextRight);
export default MemoIconFigureTextRight;
