import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFocalPoint20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFocalPoint20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3.786 3.748h3.542a.625.625 0 0 0 0-1.25H3.16a.625.625 0 0 0-.625.625V7.29a.625.625 0 1 0 1.25 0V3.748Zm8.886 0h3.542V7.29a.625.625 0 1 0 1.25 0V3.123a.625.625 0 0 0-.625-.625h-4.166a.625.625 0 0 0 0 1.25ZM3.796 16.202h3.541a.625.625 0 1 1 0 1.25H3.171a.625.625 0 0 1-.625-.625V12.66a.625.625 0 1 1 1.25 0v3.542Zm12.428 0h-3.542a.625.625 0 1 0 0 1.25h4.167c.345 0 .625-.28.625-.625V12.66a.625.625 0 1 0-1.25 0v3.542ZM10.834 10a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.667 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconFocalPoint20);
export default Memo;
