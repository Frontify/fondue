import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

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
            <path d="M19.468 19.442v-4.25a.75.75 0 011.5 0v5a.75.75 0 01-.75.75h-5a.75.75 0 010-1.5h4.25zm-14.913 0h4.25a.75.75 0 110 1.5h-5a.75.75 0 01-.75-.75v-5a.75.75 0 111.5 0v4.25zM19.457 4.498h-4.25a.75.75 0 010-1.5h5a.75.75 0 01.75.75v5a.75.75 0 11-1.5 0v-4.25zm-14.914 0v4.25a.75.75 0 11-1.5 0v-5a.75.75 0 01.75-.75h5a.75.75 0 110 1.5h-4.25zM12 13a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    );
}

const MemoIconFocalPoint = React.memo(IconFocalPoint);
export default MemoIconFocalPoint;
