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

function IconImageTextRatio25(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M5.692 3.005h6.023a2.75 2.75 0 012.75 2.75v12.49a2.75 2.75 0 01-2.75 2.75H5.692a2.75 2.75 0 01-2.75-2.75V5.755a2.75 2.75 0 012.75-2.75zm0 1.5c-.69 0-1.25.56-1.25 1.25v12.49c0 .69.56 1.25 1.25 1.25h6.023c.69 0 1.25-.56 1.25-1.25V5.755c0-.69-.56-1.25-1.25-1.25H5.692zm11.01.97a.75.75 0 010-1.5h3.606a.75.75 0 110 1.5h-3.606zm0 3.03a.75.75 0 010-1.5h3.606a.75.75 0 110 1.5h-3.606zm.003 3.033a.75.75 0 110-1.5h2.118a.75.75 0 010 1.5h-2.118z" />
        </svg>
    );
}

const MemoIconImageTextRatio25 = React.memo(IconImageTextRatio25);
export default MemoIconImageTextRatio25;
