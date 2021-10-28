import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMarkArea(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconMarkArea"
            {...props}
        >
            <path d="M5 5a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1H5zm0-2h14a3 3 0 013 3v12a3 3 0 01-3 3H5a3 3 0 01-3-3V6a3 3 0 013-3zm4 6a1 1 0 00-1 1v1a1 1 0 001 1h6a1 1 0 001-1v-1a1 1 0 00-1-1H9zm0-2h6a3 3 0 013 3v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1a3 3 0 013-3z" />
        </svg>
    );
}

const MemoIconMarkArea = React.memo(IconMarkArea);
export default MemoIconMarkArea;
