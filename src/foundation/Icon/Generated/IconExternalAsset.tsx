import React from "react";
import { IconProps } from "src/foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "src/foundation/Icon/IconSize";

function IconExternalAsset(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconExternalAsset"
            {...props}
        >
            <path d="M5.077 4.5c-.85 0-1.539.672-1.539 1.5v12c0 .828.69 1.5 1.539 1.5h13.846c.85 0 1.539-.672 1.539-1.5V6c0-.828-.69-1.5-1.539-1.5H5.077zM4.303 3h15.394C20.965 3 22 4.036 22 5.275V18.74c0 1.244-1.034 2.26-2.303 2.26H4.303C3.005 21 2 19.976 2 18.74V5.275C2 4.275 2.718 3 4.303 3zm9.649 7.498c.278.385.356 1.069.356 1.502 0 2.071-1.722 3.75-3.846 3.75H8.923c-2.124 0-3.846-1.679-3.846-3.75 0-2.071 1.722-3.75 3.846-3.75h1.539c.162 0 .323.01.48.029A4.57 4.57 0 009.541 9.75h-.618c-1.274 0-2.308 1.007-2.308 2.25s1.034 2.25 2.308 2.25h1.539c1.274 0 2.307-1.007 2.307-2.25 0-.45-.147-.82-.306-.988.151-.343.648-.514 1.489-.514zm-3.904 3.004c-.278-.385-.356-1.069-.356-1.502 0-2.071 1.722-3.75 3.846-3.75h1.539c2.124 0 3.846 1.679 3.846 3.75 0 2.071-1.722 3.75-3.846 3.75h-1.539c-.162 0-.323-.01-.48-.029a4.57 4.57 0 001.401-1.471h.618c1.274 0 2.308-1.007 2.308-2.25s-1.034-2.25-2.308-2.25h-1.539c-1.274 0-2.307 1.007-2.307 2.25 0 .45.147.82.306.988-.151.343-.648.514-1.489.514z" />
        </svg>
    );
}

const MemoIconExternalAsset = React.memo(IconExternalAsset);
export default MemoIconExternalAsset;
