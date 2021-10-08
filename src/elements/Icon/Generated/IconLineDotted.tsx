import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconLineDotted(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconLineDotted"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 20.75a.25.25 0 00.25-.25v-4a.75.75 0 011.5 0v4A1.75 1.75 0 0118 22.25H6a1.75 1.75 0 01-1.75-1.75v-4a.75.75 0 011.5 0v4c0 .138.112.25.25.25h12zM18 4.25a.25.25 0 01.25.25v4a.75.75 0 001.5 0v-4A1.75 1.75 0 0018 2.75H6A1.75 1.75 0 004.25 4.5v4a.75.75 0 001.5 0v-4A.25.25 0 016 4.25h12z"
            />
            <path d="M5 12.5a1 1 0 112 0 1 1 0 01-2 0zM11 12.5a1 1 0 112 0 1 1 0 01-2 0zM14 12.5a1 1 0 112 0 1 1 0 01-2 0zM17 12.5a1 1 0 112 0 1 1 0 01-2 0zM8 12.5a1 1 0 112 0 1 1 0 01-2 0z" />
        </svg>
    );
}

const MemoIconLineDotted = React.memo(IconLineDotted);
export default MemoIconLineDotted;
