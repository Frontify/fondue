import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMegaMenu20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMegaMenu20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.625 4.375H4.375c-1.036 0-1.875.84-1.875 1.875v8.125c0 1.036.84 1.875 1.875 1.875h11.25c1.035 0 1.875-.84 1.875-1.875V6.25c0-1.036-.84-1.875-1.875-1.875ZM3.75 6.25c0-.345.28-.625.625-.625h11.25c.345 0 .625.28.625.625v8.125c0 .345-.28.625-.625.625H4.375a.625.625 0 0 1-.625-.625V6.25Zm1.875 2.188a.625.625 0 1 1 0-1.25H8.75a.625.625 0 1 1 0 1.25H5.625Zm5-.626c0 .346.28.625.625.625h2.91a.625.625 0 1 0 0-1.25h-2.91a.625.625 0 0 0-.625.625Zm-5 3.125a.625.625 0 1 1 0-1.25h1.25a.625.625 0 1 1 0 1.25h-1.25Zm5-.624c0 .345.28.624.625.624h1.25a.625.625 0 1 0 0-1.25h-1.25a.625.625 0 0 0-.625.626Zm-5 3.124a.625.625 0 1 1 0-1.25h1.25a.625.625 0 1 1 0 1.25h-1.25Zm5-.624c0 .345.28.624.625.624h1.25a.625.625 0 1 0 0-1.25h-1.25a.625.625 0 0 0-.625.626Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMegaMenu20);
export default Memo;
