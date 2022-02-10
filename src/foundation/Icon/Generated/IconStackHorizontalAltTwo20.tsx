import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontalAltTwo20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStackHorizontalAltTwo20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.75 5.833h3.472c1.15 0 2.083.933 2.083 2.084v4.166c0 1.15-.932 2.084-2.083 2.084H3.75a2.083 2.083 0 0 1-2.083-2.084V7.917c0-1.151.932-2.084 2.083-2.084Zm0 1.39a.694.694 0 0 0-.695.694v4.166c0 .384.311.695.695.695h3.472a.695.695 0 0 0 .695-.695V7.917a.694.694 0 0 0-.695-.695H3.75Zm9.028-1.39h3.472c1.15 0 2.083.933 2.083 2.084v4.166c0 1.15-.933 2.084-2.083 2.084h-3.472a2.083 2.083 0 0 1-2.084-2.084V7.917c0-1.151.933-2.084 2.084-2.084Zm0 1.39a.694.694 0 0 0-.695.694v4.166c0 .384.311.695.695.695h3.472a.695.695 0 0 0 .694-.695V7.917a.694.694 0 0 0-.694-.695h-3.472Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontalAltTwo20);
export default Memo;
