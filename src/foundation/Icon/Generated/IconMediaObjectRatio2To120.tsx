import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectRatio2To120(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMediaObjectRatio2To120"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 4.583H3.333A.417.417 0 0 0 2.916 5v10c0 .23.187.417.417.417H10c.23 0 .416-.187.416-.417V5A.417.417 0 0 0 10 4.583Zm-6.667-1.25c-.92 0-1.667.746-1.667 1.667v10c0 .92.747 1.667 1.667 1.667H10c.92 0 1.666-.747 1.666-1.667V5c0-.92-.746-1.667-1.666-1.667H3.333Zm15 1.459c0 .345-.28.625-.625.625h-3.75a.625.625 0 1 1 0-1.25h3.75c.345 0 .625.28.625.625Zm0 5c0 .345-.28.625-.625.625h-3.75a.625.625 0 1 1 0-1.25h3.75c.345 0 .625.28.625.625Zm-1.667-2.5c0 .345-.28.625-.625.625h-2.083a.625.625 0 1 1 0-1.25h2.083c.346 0 .625.28.625.625Zm0 5c0 .345-.28.625-.625.625h-2.083a.625.625 0 1 1 0-1.25h2.083c.346 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectRatio2To120);
export default Memo;
