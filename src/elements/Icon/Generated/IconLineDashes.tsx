import * as React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconLineDashes(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconLineDashes"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 20.75a.25.25 0 00.25-.25v-4a.75.75 0 011.5 0v4A1.75 1.75 0 0118 22.25H6a1.75 1.75 0 01-1.75-1.75v-4a.75.75 0 011.5 0v4c0 .138.112.25.25.25h12zM18 4.25a.25.25 0 01.25.25v4a.75.75 0 001.5 0v-4A1.75 1.75 0 0018 2.75H6A1.75 1.75 0 004.25 4.5v4a.75.75 0 001.5 0v-4A.25.25 0 016 4.25h12zM20 12.547a.75.75 0 01-.75.75h-1.813a.75.75 0 010-1.5h1.813a.75.75 0 01.75.75zm-5.438 0a.75.75 0 01-.75.75h-3.624a.75.75 0 010-1.5h3.624a.75.75 0 01.75.75zm-7.25 0a.75.75 0 01-.75.75H4.75a.75.75 0 010-1.5h1.813a.75.75 0 01.75.75z"
            />
        </svg>
    );
}

const MemoIconLineDashes = React.memo(IconLineDashes);
export default MemoIconLineDashes;
