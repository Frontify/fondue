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

function IconZoom(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconZoom"
            {...props}
        >
            <path d="M18.246 17.017c.06.036.118.08.172.13l3.26 3.078c.41.386.431 1.035.049 1.45a1.007 1.007 0 01-1.434.049l-3.26-3.077a1.024 1.024 0 01-.179-.223 9.032 9.032 0 01-5.723 2.038C6.088 20.462 2 16.329 2 11.23S6.088 2 11.13 2c5.044 0 9.132 4.133 9.132 9.23 0 2.191-.755 4.204-2.016 5.787zM11.13 18.41c3.922 0 7.102-3.214 7.102-7.18 0-3.964-3.18-7.179-7.102-7.179s-7.102 3.215-7.102 7.18 3.18 7.18 7.102 7.18zm1-8.18h1.705a1 1 0 110 2h-1.705v1.75a1 1 0 11-2 0v-1.75H8.426a1 1 0 010-2h1.705V8.48a1 1 0 012 0v1.75z" />
        </svg>
    );
}

const MemoIconZoom = React.memo(IconZoom);
export default MemoIconZoom;
