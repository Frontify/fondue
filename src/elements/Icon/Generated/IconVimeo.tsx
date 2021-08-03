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

function IconVimeo(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconVimeo"
            {...props}
        >
            <path d="M21.99 8.01c-.089 1.95-1.448 4.622-4.078 8.012-2.72 3.54-5.02 5.311-6.902 5.311-1.166 0-2.153-1.078-2.958-3.234l-1.615-5.931c-.598-2.156-1.24-3.235-1.926-3.235-.15 0-.674.315-1.57.944L2 8.662c.987-.869 1.96-1.738 2.919-2.608 1.316-1.14 2.304-1.739 2.963-1.8 1.557-.15 2.515.917 2.874 3.199.389 2.462.658 3.993.809 4.592.448 2.043.942 3.063 1.481 3.063.42 0 1.048-.662 1.886-1.987.838-1.325 1.286-2.334 1.347-3.026.12-1.144-.33-1.717-1.347-1.717-.479 0-.972.11-1.48.329.983-3.226 2.86-4.793 5.633-4.703 2.055.06 3.024 1.395 2.905 4.006" />
        </svg>
    );
}

const MemoIconVimeo = React.memo(IconVimeo);
export default MemoIconVimeo;
