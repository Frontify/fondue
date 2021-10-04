import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconFlags(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconFlags"
            {...props}
        >
            <path d="M6.75 3.75H19.5a.75.75 0 01.592 1.21L16.95 9l3.142 4.04a.75.75 0 01-.592 1.21H6.75v6.6a.75.75 0 01-1.5 0V3.15a.75.75 0 011.5 0v.6zm0 1.5v7.5h11.217l-2.559-3.29a.75.75 0 010-.92l2.559-3.29H6.75z" />
        </svg>
    );
}

const MemoIconFlags = React.memo(IconFlags);
export default MemoIconFlags;
