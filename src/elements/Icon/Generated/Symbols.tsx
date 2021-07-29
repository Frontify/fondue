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

function IconSymbols(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M6.027 3h12.145a3 3 0 0 1 3 3v12.145a3 3 0 0 1-3 3H6.027a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 1.5a1.5 1.5 0 0 0-1.5 1.5v12.145a1.5 1.5 0 0 0 1.5 1.5h12.145a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H6.027zm2.003 7.97L10 14.44l5.97-5.97a.75.75 0 0 1 1.06 1.06L10 16.56l-3.03-3.03a.75.75 0 0 1 1.06-1.06z" />
        </svg>
    );
}

const MemoIconSymbols = React.memo(IconSymbols);
export default MemoIconSymbols;
