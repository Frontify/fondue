import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectRatio1To120(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObjectRatio1To120"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5 4.583H3.333A.417.417 0 0 0 2.916 5v10c0 .23.187.417.417.417H7.5c.23 0 .417-.187.417-.417V5a.417.417 0 0 0-.417-.417Zm-4.167-1.25c-.92 0-1.667.746-1.667 1.667v10c0 .92.747 1.667 1.667 1.667H7.5c.92 0 1.666-.747 1.666-1.667V5c0-.92-.746-1.667-1.666-1.667H3.333Zm15 1.459c0 .345-.28.625-.625.625h-6.25a.625.625 0 1 1 0-1.25h6.25c.345 0 .625.28.625.625Zm0 5c0 .345-.28.625-.625.625h-6.25a.625.625 0 1 1 0-1.25h6.25c.345 0 .625.28.625.625Zm-1.667-2.5c0 .345-.28.625-.625.625h-4.583a.625.625 0 1 1 0-1.25h4.583c.346 0 .625.28.625.625Zm0 5c0 .345-.28.625-.625.625h-4.583a.625.625 0 1 1 0-1.25h4.583c.346 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectRatio1To120);
export default Memo;
