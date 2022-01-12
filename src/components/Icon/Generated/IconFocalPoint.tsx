import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconFocalPoint(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFocalPoint"
            {...props}
        >
            <path d="M19.468 19.442v-4.25a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1 0-1.5h4.25Zm-14.913 0h4.25a.75.75 0 1 1 0 1.5h-5a.75.75 0 0 1-.75-.75v-5a.75.75 0 1 1 1.5 0v4.25ZM19.457 4.498h-4.25a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 .75.75v5a.75.75 0 1 1-1.5 0v-4.25Zm-14.914 0v4.25a.75.75 0 1 1-1.5 0v-5a.75.75 0 0 1 .75-.75h5a.75.75 0 1 1 0 1.5h-4.25ZM12 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
        </svg>
    );
}

const Memo = memo(IconFocalPoint);
export default Memo;
