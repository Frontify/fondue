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

function IconEmojiNeutral(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconEmojiNeutral"
            {...props}
        >
            <path d="M12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 014.92 19.08a10.035 10.035 0 01-2.139-3.184A9.801 9.801 0 012 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 014.92 4.92 10.035 10.035 0 018.104 2.78 9.801 9.801 0 0112 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0119.08 4.92a10.035 10.035 0 012.139 3.184A9.801 9.801 0 0122 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 01-2.139 3.184 10.035 10.035 0 01-3.184 2.139A9.801 9.801 0 0112 22zm0-1.426a8.343 8.343 0 003.34-.674 8.663 8.663 0 002.724-1.836A8.663 8.663 0 0019.9 15.34a8.343 8.343 0 00.674-3.34 8.343 8.343 0 00-.674-3.34 8.663 8.663 0 00-1.836-2.724A8.663 8.663 0 0015.34 4.1 8.343 8.343 0 0012 3.426a8.343 8.343 0 00-3.34.674 8.663 8.663 0 00-2.724 1.836A8.663 8.663 0 004.1 8.66 8.343 8.343 0 003.426 12c0 1.185.224 2.298.674 3.34a8.663 8.663 0 001.836 2.724A8.663 8.663 0 008.66 19.9a8.343 8.343 0 003.34.674zm-3.182-9.483a1.364 1.364 0 110-2.727 1.364 1.364 0 010 2.727zm6.364 0a1.364 1.364 0 110-2.727 1.364 1.364 0 010 2.727zm-7.727 5a.91.91 0 010-1.818h9.09a.91.91 0 110 1.818h-9.09z" />
        </svg>
    );
}

const MemoIconEmojiNeutral = React.memo(IconEmojiNeutral);
export default MemoIconEmojiNeutral;
