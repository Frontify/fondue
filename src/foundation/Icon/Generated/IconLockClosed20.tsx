import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockClosed20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLockClosed20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.194 5.833a4.167 4.167 0 1 0-8.333 0v1.39h-.695c-1.15 0-2.083.932-2.083 2.083v6.944c0 1.15.933 2.083 2.083 2.083h9.723c1.15 0 2.083-.932 2.083-2.083V9.306a2.084 2.084 0 0 0-2.083-2.084h-.695V5.833ZM5.166 8.611a.694.694 0 0 0-.694.695v6.944c0 .384.31.695.694.695h9.723a.695.695 0 0 0 .694-.695V9.306a.694.694 0 0 0-.694-.695H5.166Zm7.64-1.389V5.833a2.778 2.778 0 1 0-5.556 0v1.39h5.555Zm-4.167 4.861c0 .514.279.963.694 1.204v.88a.694.694 0 1 0 1.389 0v-.88a1.388 1.388 0 1 0-2.083-1.204Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockClosed20);
export default Memo;
