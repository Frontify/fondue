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

function IconEmojiUnhappyFilled(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconEmojiUnhappyFilled"
            {...props}
        >
            <path d="M12 22c-1.38 0-2.679-.26-3.896-.781A10.035 10.035 0 014.92 19.08a10.035 10.035 0 01-2.139-3.184A9.801 9.801 0 012 12c0-1.38.26-2.679.781-3.896A10.035 10.035 0 014.92 4.92 10.035 10.035 0 018.104 2.78 9.801 9.801 0 0112 2c1.38 0 2.679.26 3.896.781A10.035 10.035 0 0119.08 4.92a10.035 10.035 0 012.139 3.184A9.801 9.801 0 0122 12c0 1.38-.26 2.679-.781 3.896a10.035 10.035 0 01-2.139 3.184 10.035 10.035 0 01-3.184 2.139A9.801 9.801 0 0112 22zM8.818 10.182a1.364 1.364 0 100-2.727 1.364 1.364 0 000 2.727zm6.364 0a1.364 1.364 0 100-2.727 1.364 1.364 0 000 2.727zm-8.54 5.502a.91.91 0 001.626.813c.753-1.506 1.95-2.224 3.732-2.224 1.781 0 2.98.718 3.732 2.224a.91.91 0 001.627-.813c-1.066-2.13-2.898-3.23-5.359-3.23s-4.293 1.1-5.359 3.23z" />
        </svg>
    );
}

const MemoIconEmojiUnhappyFilled = React.memo(IconEmojiUnhappyFilled);
export default MemoIconEmojiUnhappyFilled;
