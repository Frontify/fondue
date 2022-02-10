import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextColumns20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextColumns20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3.333 6.875a.625.625 0 1 1 0-1.25H7.5a.625.625 0 1 1 0 1.25H3.333Zm8.542-.625c0 .345.28.625.625.625h4.167a.625.625 0 1 0 0-1.25H12.5a.625.625 0 0 0-.625.625Zm0 2.5c0 .345.28.625.625.625h3.334a.625.625 0 1 0 0-1.25H12.5a.625.625 0 0 0-.625.625Zm0 2.5c0 .345.28.625.625.625h4.167a.625.625 0 1 0 0-1.25H12.5a.625.625 0 0 0-.625.625Zm-8.542.625a.625.625 0 1 1 0-1.25H7.5a.625.625 0 1 1 0 1.25H3.333ZM2.708 8.75c0 .345.28.625.625.625h3.334a.625.625 0 1 0 0-1.25H3.334a.625.625 0 0 0-.626.625Zm.625 5.625a.625.625 0 1 1 0-1.25h3.334a.625.625 0 1 1 0 1.25H3.334Zm8.542-.625c0 .345.28.625.625.625h3.334a.625.625 0 1 0 0-1.25H12.5a.625.625 0 0 0-.625.625Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextColumns20);
export default Memo;
