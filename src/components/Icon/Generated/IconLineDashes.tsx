import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconLineDashes(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
                d="M18 20.75a.25.25 0 0 0 .25-.25v-4a.75.75 0 0 1 1.5 0v4A1.75 1.75 0 0 1 18 22.25H6a1.75 1.75 0 0 1-1.75-1.75v-4a.75.75 0 0 1 1.5 0v4c0 .138.112.25.25.25h12ZM18 4.25a.25.25 0 0 1 .25.25v4a.75.75 0 0 0 1.5 0v-4A1.75 1.75 0 0 0 18 2.75H6A1.75 1.75 0 0 0 4.25 4.5v4a.75.75 0 0 0 1.5 0v-4A.25.25 0 0 1 6 4.25h12ZM20 12.547a.75.75 0 0 1-.75.75h-1.813a.75.75 0 0 1 0-1.5h1.813a.75.75 0 0 1 .75.75Zm-5.438 0a.75.75 0 0 1-.75.75h-3.624a.75.75 0 0 1 0-1.5h3.624a.75.75 0 0 1 .75.75Zm-7.25 0a.75.75 0 0 1-.75.75H4.75a.75.75 0 0 1 0-1.5h1.813a.75.75 0 0 1 .75.75Z"
            />
        </svg>
    );
}

const Memo = memo(IconLineDashes);
export default Memo;
