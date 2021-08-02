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

function IconIndesign(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M18 3.25A2.75 2.75 0 0120.75 6v12A2.75 2.75 0 0118 20.75H6A2.75 2.75 0 013.25 18V6A2.75 2.75 0 016 3.25zm0 1.5H6c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25zM16.242 8v7.832h-1.298v-.76h-.033c-.347.67-1.052.928-1.69.928-1.42 0-2.484-1.141-2.484-2.83 0-1.701 1.108-2.843 2.518-2.843.772 0 1.331.37 1.577.828V8h1.41zM9.235 8v7.832H7.758V8h1.477zm4.288 3.57c-.85 0-1.365.682-1.365 1.6 0 .917.526 1.6 1.365 1.6.85 0 1.354-.672 1.354-1.6 0-.94-.503-1.6-1.354-1.6z" />
        </svg>
    );
}

const MemoIconIndesign = React.memo(IconIndesign);
export default MemoIconIndesign;
